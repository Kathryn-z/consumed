import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { recordDetailStyles } from "@/styles/screens/recordDetail";

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
  const showImage = coverUrl && !imageError;

  return (
    <TouchableOpacity
      style={recordDetailStyles.contentCard}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {/* Cover Image */}
      {showImage ? (
        <Image
          source={{ uri: coverUrl }}
          style={recordDetailStyles.coverImage}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={recordDetailStyles.coverPlaceholder}>
          <Text style={recordDetailStyles.coverPlaceholderText}>
            {item.category.charAt(0)}
          </Text>
        </View>
      )}

      {/* Content Info */}
      <View style={recordDetailStyles.contentInfo}>
        <View style={recordDetailStyles.titleRow}>
          <Text style={recordDetailStyles.title} numberOfLines={2}>
            {item.title}
          </Text>
          {showChevron && <Feather name="chevron-right" size={20} color="#666" />}
        </View>
        <Text style={recordDetailStyles.meta}>
          {item.category}
          {item.year && ` · ${item.year}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
