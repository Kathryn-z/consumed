import { PodcastEpisodeCard } from "@/components/PodcastEpisodeCard";
import { usePodcastEpisodes } from "@/hooks/usePodcastEpisodes";
import { ItunesPodcastEpisode } from "@/services/api/itunes";
import { podcastEpisodeListStyles } from "@/styles/components/podcastEpisodeList";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

interface PodcastEpisodeListProps {
  podcastExternalId?: string; // iTunes podcast ID
  onEpisodePress?: (episode: ItunesPodcastEpisode) => void;
  limit?: number; // Number of episodes to load
}

export function PodcastEpisodeList({
  podcastExternalId,
  onEpisodePress,
  limit = 50,
}: PodcastEpisodeListProps) {
  const { episodes, loading, error, refresh } =
    usePodcastEpisodes(podcastExternalId);

  const [showAll, setShowAll] = useState(false);

  // Show only first 10 episodes by default
  const displayedEpisodes = showAll ? episodes : episodes.slice(0, 10);

  if (!podcastExternalId) {
    return null;
  }

  if (loading) {
    return (
      <View style={podcastEpisodeListStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={podcastEpisodeListStyles.errorContainer}>
        <Text style={podcastEpisodeListStyles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => refresh(limit)}
          style={podcastEpisodeListStyles.retryButton}
        >
          <Text style={podcastEpisodeListStyles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (episodes.length === 0) {
    return (
      <View style={podcastEpisodeListStyles.emptyContainer}>
        <Text style={podcastEpisodeListStyles.emptyText}>
          No episodes found
        </Text>
      </View>
    );
  }

  return (
    <View style={podcastEpisodeListStyles.container}>
      <Text style={podcastEpisodeListStyles.header}>
        Episodes ({episodes.length})
      </Text>

      <FlatList
        data={displayedEpisodes}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <PodcastEpisodeCard episode={item} onPress={onEpisodePress} />
        )}
        scrollEnabled={false}
      />

      {!showAll && episodes.length > 10 && (
        <TouchableOpacity
          onPress={() => setShowAll(true)}
          style={podcastEpisodeListStyles.showMoreButton}
        >
          <Text style={podcastEpisodeListStyles.showMoreText}>
            Show all {episodes.length} episodes
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
