import { XMLParser } from "fast-xml-parser";

const ITUNES_API_BASE = "https://itunes.apple.com";

export interface ItunesPodcastImage {
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
}

export interface ItunesPodcastResult {
  trackId: number; // maps to externalId
  collectionId: number;
  collectionName: string; // maps to title
  artistName: string; // maps to hosts (podcast creator/host)
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  trackCount?: number; // maps to episodesCount
  genres?: string[];
  country?: string;
  releaseDate?: string; // maps to year (extract year)
  collectionViewUrl?: string; // maps to link (iTunes page URL)
  feedUrl?: string; // RSS feed URL
}

export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesPodcastResult[];
}

export interface ItunesPodcastEpisode {
  trackId: number; // Episode ID
  collectionId: number; // Podcast ID
  trackName: string; // Episode title
  collectionName: string; // Podcast title
  artistName: string; // Podcast host/creator
  description?: string; // Episode description
  releaseDate: string; // Episode release date
  trackTimeMillis?: number; // Duration in milliseconds
  episodeUrl?: string; // Audio file URL
  artworkUrl60?: string;
  artworkUrl160?: string;
  artworkUrl600?: string;
  trackNumber?: number; // Episode number
  episodeGuid?: string; // Episode GUID
  episodeContentType?: string; // e.g., "audio"
  genres?: string[];
}

export interface ItunesEpisodeSearchResponse {
  resultCount: number;
  results: (ItunesPodcastResult | ItunesPodcastEpisode)[];
}

/**
 * Search for podcasts using iTunes Search API
 * @param query - The search term
 * @param limit - Number of results to return (default: 10, max: 200)
 * @returns Promise with search results
 */
export async function searchItunesPodcast(
  query: string,
  limit: number = 10
): Promise<ItunesSearchResponse> {
  const url = `${ITUNES_API_BASE}/search?term=${encodeURIComponent(
    query
  )}&media=podcast&entity=podcast&limit=${limit}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`iTunes API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Helper function to parse duration string (HH:MM:SS or MM:SS) to milliseconds
 */
function parseDurationToMillis(duration: string): number {
  const parts = duration.split(":").map(Number);
  if (parts.length === 3) {
    // HH:MM:SS
    return (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
  } else if (parts.length === 2) {
    // MM:SS
    return (parts[0] * 60 + parts[1]) * 1000;
  } else if (parts.length === 1) {
    // Just seconds
    return parts[0] * 1000;
  }
  return 0;
}

/**
 * Helper function to clean up HTML and decode entities from RSS description
 */
function cleanDescription(html: string): string {
  if (!html) return "";

  let text = html;

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Decode common HTML entities
  const entities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
  };

  Object.entries(entities).forEach(([entity, char]) => {
    text = text.replace(new RegExp(entity, "g"), char);
  });

  // Decode numeric HTML entities (e.g., &#8217; &#8220;)
  text = text.replace(/&#(\d+);/g, (_match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });

  // Collapse multiple spaces and trim
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Parse RSS feed XML and convert to ItunesPodcastEpisode array
 */
async function parseRSSFeed(
  feedUrl: string,
  podcastId: number | string,
  limit?: number
): Promise<ItunesPodcastEpisode[]> {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`RSS feed fetch error: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  const result = parser.parse(xmlText);
  const channel = result.rss?.channel;

  if (!channel) {
    throw new Error("Invalid RSS feed format");
  }

  const podcastTitle = channel.title || "";
  const podcastArtist = channel["itunes:author"] || "";
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];

  // Parse each episode item
  const episodes: ItunesPodcastEpisode[] = items
    .filter((item: any) => item) // Filter out null/undefined items
    .map((item: any) => {
      const enclosure = item.enclosure;
      const episodeUrl = enclosure?.["@_url"] || "";
      const duration = item["itunes:duration"] || "";
      const episodeNumber = item["itunes:episode"]
        ? parseInt(item["itunes:episode"])
        : undefined;

      const rawDescription = item.description || item["itunes:summary"] || "";
      const cleanedDescription = cleanDescription(rawDescription);

      return {
        trackId: 0, // RSS feeds don't have iTunes track IDs
        collectionId: Number(podcastId),
        trackName: item.title || "",
        collectionName: podcastTitle,
        artistName: podcastArtist,
        description: cleanedDescription,
        releaseDate: item.pubDate || "",
        trackTimeMillis: duration ? parseDurationToMillis(duration) : undefined,
        episodeUrl: episodeUrl,
        episodeGuid: item.guid?.["#text"] || item.guid || "",
        trackNumber: episodeNumber,
        episodeContentType: enclosure?.["@_type"] || "audio",
      } as ItunesPodcastEpisode;
    });

  // Apply limit if specified
  return limit ? episodes.slice(0, limit) : episodes;
}

/**
 * Find a specific podcast episode by episode number using RSS feed
 * @param podcastId - The iTunes podcast collection ID
 * @param episodeNumber - The episode number to find
 * @param feedUrl - RSS feed URL for direct feed parsing
 * @param limit - Number of episodes to fetch (default: 5)
 * @returns Promise with the matching episode or null if not found
 */
export async function findPodcastEpisodeByNumber(
  podcastId: number | string,
  episodeNumber: number,
  feedUrl: string,
  limit: number = 5
): Promise<ItunesPodcastEpisode | null> {
  try {
    const episodes = await parseRSSFeed(feedUrl, podcastId, limit);
    const matchingEpisode = episodes.find(
      (episode) => episode.trackNumber === episodeNumber
    );
    return matchingEpisode || null;
  } catch (error) {
    console.error("RSS feed parsing failed:", error);
    return null;
  }
}
