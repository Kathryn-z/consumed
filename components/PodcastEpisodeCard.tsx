import { podcastEpisodeCardStyles } from "@/styles/components/podcastEpisodeCard";
import { ItunesPodcastEpisode } from "@/services/api/itunes";
import { formatEpisodeDuration } from "@/types/podcastEpisode";
import { Text, TouchableOpacity, View } from "react-native";

interface PodcastEpisodeCardProps {
  episode: ItunesPodcastEpisode;
  onPress?: (episode: ItunesPodcastEpisode) => void;
}

export function PodcastEpisodeCard({
  episode,
  onPress,
}: PodcastEpisodeCardProps) {
  // Format release date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={podcastEpisodeCardStyles.container}
      onPress={() => onPress?.(episode)}
      activeOpacity={0.7}
    >
      <View style={podcastEpisodeCardStyles.header}>
        {episode.trackNumber && (
          <Text style={podcastEpisodeCardStyles.episodeNumber}>
            #{episode.trackNumber}
          </Text>
        )}
        <Text style={podcastEpisodeCardStyles.date}>
          {formatDate(episode.releaseDate)}
        </Text>
      </View>

      <Text style={podcastEpisodeCardStyles.title} numberOfLines={2}>
        {episode.trackName}
      </Text>

      {episode.description && (
        <Text style={podcastEpisodeCardStyles.description} numberOfLines={3}>
          {episode.description}
        </Text>
      )}

      <View style={podcastEpisodeCardStyles.footer}>
        {episode.trackTimeMillis && (
          <Text style={podcastEpisodeCardStyles.duration}>
            {formatEpisodeDuration(episode.trackTimeMillis)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
