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

  // Get image URL - try new images field, fall back to legacy fields
  const getImageUrl = () => {
    const itemAny = item as any;

    // Try new images field (JSON string)
    if (item.images) {
      try {
        const imagesObj = JSON.parse(item.images);
        return imagesObj.medium || imagesObj.large || imagesObj.small;
      } catch {
        // If not JSON, treat as plain URL
        return item.images;
      }
    }

    // Fall back to legacy fields
    return itemAny.cover || itemAny.coverImage;
  };

  // Get creator/author label based on category
  const getCreatorInfo = () => {
    const itemAny = item as any;

    if (item.category === "Book" && itemAny.author) {
      return itemAny.author;
    }

    if (item.category === "TV/Movie" && itemAny.directors) {
      try {
        const directorsArray = JSON.parse(itemAny.directors);
        return directorsArray.map((d: any) => d.name || d).join(", ");
      } catch {
        return itemAny.directors;
      }
    }

    if (item.category === "Drama" && itemAny.directors) {
      try {
        const directorsArray = JSON.parse(itemAny.directors);
        return Array.isArray(directorsArray) ? directorsArray.map((d: any) => d.name || d).join(", ") : itemAny.directors;
      } catch {
        return itemAny.directors;
      }
    }

    if (item.category === "Podcast" && itemAny.hosts) {
      try {
        const hostsArray = JSON.parse(itemAny.hosts);
        return Array.isArray(hostsArray) ? hostsArray.join(", ") : itemAny.hosts;
      } catch {
        return itemAny.hosts;
      }
    }

    // Fallback to legacy creator field
    if (itemAny.creator) {
      return itemAny.creator;
    }

    return null;
  };

  const coverUrl = getImageUrl();
  const creatorInfo = getCreatorInfo();
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
        {creatorInfo && (
          <Text style={contentCardStyles.creator} numberOfLines={1}>
            {creatorInfo}
          </Text>
        )}
        <Text style={contentCardStyles.date}>{formatDate(item.dateAdded)}</Text>
      </View>
    </TouchableOpacity>
  );
}
