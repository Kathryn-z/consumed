import { useState, useEffect, useCallback } from "react";
import {
  fetchPodcastEpisodes,
  ItunesPodcastEpisode,
} from "@/services/api/itunes";

/**
 * Hook for fetching podcast episodes from iTunes API
 */
export function usePodcastEpisodes(podcastId?: string | number) {
  const [episodes, setEpisodes] = useState<ItunesPodcastEpisode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEpisodes = useCallback(
    async (limit: number = 50) => {
      if (!podcastId) {
        setEpisodes([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchPodcastEpisodes(podcastId, limit);

        // Filter out the podcast collection info and keep only episodes
        const episodeList = response.results.filter(
          (item): item is ItunesPodcastEpisode =>
            "trackName" in item && "episodeUrl" in item
        );

        setEpisodes(episodeList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load episodes"
        );
        console.error("Error loading podcast episodes:", err);
      } finally {
        setLoading(false);
      }
    },
    [podcastId]
  );

  useEffect(() => {
    if (podcastId) {
      loadEpisodes();
    }
  }, [podcastId, loadEpisodes]);

  return {
    episodes,
    loading,
    error,
    refresh: loadEpisodes,
  };
}
