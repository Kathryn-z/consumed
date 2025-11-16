import { getDatabase } from "./database";
import { CreatePodcastEpisodeInput, PodcastEpisode } from "@/types/content";

/**
 * Create a new podcast episode record
 */
export async function createPodcastEpisode(
  input: CreatePodcastEpisodeInput
): Promise<PodcastEpisode> {
  const db = await getDatabase();
  const dateAdded = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO podcast_episodes (
      podcastId, episodeNumber, title, description, releaseDate,
      durationMillis, dateAdded
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.podcastId,
      input.episodeNumber ?? null,
      input.title,
      input.description ?? null,
      input.releaseDate ?? null,
      input.durationMillis ?? null,
      dateAdded,
    ]
  );

  return {
    id: result.lastInsertRowId,
    ...input,
    dateAdded,
  };
}

/**
 * Get podcast episode by ID
 */
export async function getPodcastEpisodeById(
  id: number
): Promise<PodcastEpisode | null> {
  const db = await getDatabase();
  const episode = await db.getFirstAsync<PodcastEpisode>(
    "SELECT * FROM podcast_episodes WHERE id = ?",
    [id]
  );
  return episode || null;
}

/**
 * Find existing podcast episode by podcastId and episodeNumber
 */
export async function findPodcastEpisode(
  podcastId: number,
  episodeNumber?: number
): Promise<PodcastEpisode | null> {
  const db = await getDatabase();

  if (episodeNumber !== undefined && episodeNumber !== null) {
    const episode = await db.getFirstAsync<PodcastEpisode>(
      "SELECT * FROM podcast_episodes WHERE podcastId = ? AND episodeNumber = ?",
      [podcastId, episodeNumber]
    );
    if (episode) return episode;
  }

  return null;
}

/**
 * Find or create a podcast episode
 * Tries to find existing episode by number, creates new one if not found
 */
export async function findOrCreatePodcastEpisode(
  input: CreatePodcastEpisodeInput
): Promise<PodcastEpisode> {
  // Try to find existing episode
  const existing = await findPodcastEpisode(
    input.podcastId,
    input.episodeNumber
  );

  if (existing) {
    return existing;
  }

  // Create new episode if not found
  return await createPodcastEpisode(input);
}

/**
 * Get all episodes for a podcast
 */
export async function getPodcastEpisodes(
  podcastId: number
): Promise<PodcastEpisode[]> {
  const db = await getDatabase();
  const episodes = await db.getAllAsync<PodcastEpisode>(
    "SELECT * FROM podcast_episodes WHERE podcastId = ? ORDER BY episodeNumber DESC, releaseDate DESC",
    [podcastId]
  );
  return episodes;
}
