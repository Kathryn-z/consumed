import { PodcastEpisodeCard } from "@/components/cards/contentCards/PodcastEpisodeCard";
import { ItunesPodcastEpisode, findPodcastEpisodeByNumber } from "@/services/api/itunes";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface PodcastEpisodeSelectorProps {
  podcastId: string;
  podcastTitle?: string;
  feedUrl: string;
  onEpisodeSelect: (episode: ItunesPodcastEpisode | null) => void;
}

export default function PodcastEpisodeSelector({
  podcastId,
  podcastTitle,
  feedUrl,
  onEpisodeSelect,
}: PodcastEpisodeSelectorProps) {
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [selectedEpisode, setSelectedEpisode] =
    useState<ItunesPodcastEpisode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (text: string) => {
    setEpisodeNumber(text);
    setError(null);

    // Clear episode if input is empty
    if (!text.trim()) {
      setSelectedEpisode(null);
      onEpisodeSelect(null);
      return;
    }

    const episodeNum = parseInt(text);
    if (isNaN(episodeNum) || episodeNum <= 0) {
      setError("Please enter a valid episode number");
      setSelectedEpisode(null);
      onEpisodeSelect(null);
      return;
    }

    setLoading(true);
    try {
      const episode = await findPodcastEpisodeByNumber(
        podcastId,
        episodeNum,
        feedUrl
      );
      if (episode) {
        setSelectedEpisode(episode);
        onEpisodeSelect(episode);
        setError(null);
      } else {
        setError(`Episode #${episodeNum} not found`);
        setSelectedEpisode(null);
        onEpisodeSelect(null);
      }
    } catch (err) {
      setError("Failed to fetch episode information");
      setSelectedEpisode(null);
      onEpisodeSelect(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Episode Number (Optional)</Text>
      <TextInput
        style={styles.input}
        value={episodeNumber}
        onChangeText={handleSearch}
        placeholder="Enter episode number (e.g., 1, 2, 3...)"
        keyboardType="number-pad"
        returnKeyType="done"
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Searching for episode...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {selectedEpisode && !loading && (
        <View style={styles.episodeContainer}>
          <Text style={styles.episodeLabel}>Selected Episode:</Text>
          <PodcastEpisodeCard episode={selectedEpisode} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginTop: 8,
  },
  episodeContainer: {
    marginTop: 16,
  },
  episodeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
});
