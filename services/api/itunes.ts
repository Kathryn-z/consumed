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
 * Fetch episodes for a specific podcast using iTunes Lookup API
 * @param podcastId - The iTunes podcast collection ID
 * @param limit - Number of episodes to return (default: 20, max: 200)
 * @returns Promise with podcast and episode results
 */
export async function fetchPodcastEpisodes(
  podcastId: number | string,
  limit: number = 20
): Promise<ItunesEpisodeSearchResponse> {
  const url = `${ITUNES_API_BASE}/lookup?id=${podcastId}&entity=podcastEpisode&limit=${limit}`;

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
 * Search for a specific podcast episode
 * @param podcastId - The iTunes podcast collection ID
 * @param episodeNumber - The episode number to find
 * @param limit - Number of episodes to fetch to search through (default: 200)
 * @returns Promise with the matching episode or null
 */
export async function findPodcastEpisodeByNumber(
  podcastId: number | string,
  episodeNumber: number,
  limit: number = 200
): Promise<ItunesPodcastEpisode | null> {
  const response = await fetchPodcastEpisodes(podcastId, limit);

  // Filter out the podcast collection info (first result) and find matching episode
  const episodes = response.results.filter(
    (item): item is ItunesPodcastEpisode =>
      "trackName" in item && "episodeUrl" in item
  );

  const matchingEpisode = episodes.find(
    (episode) => episode.trackNumber === episodeNumber
  );

  return matchingEpisode || null;
}

/**
 * Search for podcast episodes by title
 * @param searchTerm - The search term for episode title
 * @param limit - Number of results to return (default: 20, max: 200)
 * @returns Promise with episode search results
 */
export async function searchPodcastEpisodes(
  searchTerm: string,
  limit: number = 20
): Promise<ItunesEpisodeSearchResponse> {
  const url = `${ITUNES_API_BASE}/search?term=${encodeURIComponent(
    searchTerm
  )}&media=podcast&entity=podcastEpisode&limit=${limit}`;

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
