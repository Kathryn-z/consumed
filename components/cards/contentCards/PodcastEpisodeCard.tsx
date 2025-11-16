import { ItunesPodcastEpisode } from "@/services/api/itunes";
import { podcastEpisodeCardStyles } from "@/styles/components/cards/podcastEpisodeCard";
import { formatEpisodeDuration } from "@/types/content";
import { formatDateToString } from "@/utils/dateFormat";
import { Text, View } from "react-native";

interface PodcastEpisodeCardProps {
  episode: ItunesPodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: PodcastEpisodeCardProps) {
  return (
    <View style={podcastEpisodeCardStyles.container}>
      <View style={podcastEpisodeCardStyles.headerContent}>
        {episode.trackNumber && (
          <Text style={podcastEpisodeCardStyles.episodeNumber}>
            #{episode.trackNumber}
          </Text>
        )}
        <Text style={podcastEpisodeCardStyles.cardInfoSecondary}>
          {formatDateToString(episode.releaseDate)}
        </Text>
      </View>

      <Text style={podcastEpisodeCardStyles.cardTitle} numberOfLines={2}>
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
