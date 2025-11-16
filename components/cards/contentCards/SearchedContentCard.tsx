import { ItunesPodcastResult } from "@/services/api/itunes";
import { searchedContentCardStyles } from "@/styles/components/cards/searchedContentCard";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface SearchedContentCardProps {
  result: ItunesPodcastResult;
  onPress: (result: ItunesPodcastResult) => void;
}

export function SearchedContentCard({
  result,
  onPress,
}: SearchedContentCardProps) {
  return (
    <TouchableOpacity
      style={searchedContentCardStyles.cardContainerWithShadow}
      onPress={() => onPress(result)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: result.artworkUrl100 || result.artworkUrl60,
        }}
        style={searchedContentCardStyles.resultImage}
        resizeMode="cover"
      />
      <View style={searchedContentCardStyles.infoContent}>
        <Text style={searchedContentCardStyles.cardTitle} numberOfLines={2}>
          {result.collectionName}
        </Text>
        <Text style={searchedContentCardStyles.resultArtist} numberOfLines={1}>
          by {result.artistName}
        </Text>
        {result.genres && result.genres.length > 0 && (
          <Text style={searchedContentCardStyles.resultGenre} numberOfLines={1}>
            {result.genres.join(", ")}
          </Text>
        )}
        {result.trackCount && (
          <Text style={searchedContentCardStyles.cardInfoSecondary}>
            {result.trackCount} episodes
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
