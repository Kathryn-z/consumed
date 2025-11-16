import { ItunesPodcastEpisode } from "@/services/api/itunes";
import { podcastEpisodeCardStyles } from "@/styles/components/cards/podcastEpisodeCard";
import { formatEpisodeDuration } from "@/types/content";
import { Text, View } from "react-native";

interface PodcastEpisodeCardProps {
  episode: ItunesPodcastEpisode;
}

export function PodcastEpisodeCard({
  episode,
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
    <View style={podcastEpisodeCardStyles.container}>
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
    </View>
  );
}
