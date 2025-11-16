import CoverImage from "@/components/shared/CoverImage";
import { imageStyles } from "@/styles/common";
import { recordDetailStyles } from "@/styles/screens/recordDetail";
import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ContentInfoCardProps {
  item: ContentItem;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
}

export function ContentInfoCard({
  item,
  onPress,
  showChevron = false,
  disabled = false,
}: ContentInfoCardProps) {
  const [imageError, setImageError] = useState(false);
  const coverUrl = getImageUrl(item);
  const showImage = (coverUrl && !imageError) as boolean;

  return (
    <TouchableOpacity
      style={recordDetailStyles.contentCard}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <CoverImage
        coverUrl={coverUrl}
        category={item.category}
        showImage={showImage}
        setImageError={setImageError}
        containerStyle={imageStyles.imageContainerSmall}
      />

      {/* Content Info */}
      <View style={recordDetailStyles.contentInfo}>
        <View style={recordDetailStyles.titleRow}>
          <Text style={recordDetailStyles.title} numberOfLines={2}>
            {item.title}
          </Text>
          {showChevron && (
            <Feather name="chevron-right" size={20} color="#666" />
          )}
        </View>
        <Text style={recordDetailStyles.meta}>
          {item.category}
          {item.year && ` · ${item.year}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
