import { ContentItem } from "@/types/content";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { contentCardStyles } from "@/styles/components/contentCard";
import { useState } from "react";

interface ContentCardProps {
  item: ContentItem;
  onPress?: (item: ContentItem) => void;
}

export function ContentCard({ item, onPress }: ContentCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Use cover field first, fall back to coverImage for backward compatibility
  const coverUrl = (item as any).cover || item.coverImage;
  const showImage = coverUrl && !imageError;

  return (
    <TouchableOpacity
      style={contentCardStyles.container}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      {/* Cover Image or Placeholder */}
      <View style={contentCardStyles.imageContainer}>
        {showImage ? (
          <Image
            source={{ uri: coverUrl }}
            style={contentCardStyles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={contentCardStyles.placeholder}>
            <Text style={contentCardStyles.placeholderText}>
              {item.category.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      {/* Content Info */}
      <View style={contentCardStyles.info}>
        <Text style={contentCardStyles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={contentCardStyles.category}>{item.category}</Text>
        {item.year && (
          <Text style={contentCardStyles.year}>{item.year}</Text>
        )}
        {item.creator && (
          <Text style={contentCardStyles.creator} numberOfLines={1}>
            {item.creator}
          </Text>
        )}
        <Text style={contentCardStyles.date}>{formatDate(item.dateAdded)}</Text>
      </View>
    </TouchableOpacity>
  );
}
