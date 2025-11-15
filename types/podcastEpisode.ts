/**
 * Podcast Episode interface
 * Represents a single podcast episode that can be tracked separately
 */
export interface PodcastEpisode {
  id: number;
  podcastId: number; // Foreign key to Podcast ContentItem
  episodeNumber?: number; // Episode number in the series
  title: string; // Episode title
  description?: string;
  releaseDate?: string; // ISO string
  durationMillis?: number; // Duration in milliseconds
  episodeUrl?: string; // Audio file URL
  externalId?: string; // iTunes trackId or other external ID
  episodeGuid?: string; // Podcast episode GUID
  dateAdded: string; // When this episode was added to our database
}

/**
 * Episode creation input
 */
export type CreatePodcastEpisodeInput = Omit<PodcastEpisode, "id" | "dateAdded">;

/**
 * Helper function to format duration from milliseconds to readable string
 */
export function formatEpisodeDuration(millis?: number): string {
  if (!millis) return "Unknown";

  const seconds = Math.floor(millis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
}
