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
