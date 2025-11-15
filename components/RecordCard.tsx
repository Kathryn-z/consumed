import { getContentItemById } from "@/db/contentOperations";
import { contentCardStyles } from "@/styles/components/contentCard";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

interface RecordCardProps {
  record: ConsumptionRecord;
  onPress?: (record: ConsumptionRecord) => void;
}

export function RecordCard({ record, onPress }: RecordCardProps) {
  const [imageError, setImageError] = useState(false);
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContentItem() {
      try {
        const contentItem = await getContentItemById(record.contentItemId);
        setItem(contentItem);
      } catch (error) {
        console.error("Error loading content item:", error);
      } finally {
        setLoading(false);
      }
    }
    loadContentItem();
  }, [record.contentItemId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get creator/author label based on category
  const getCreatorInfo = () => {
    const itemAny = item as any;

    if (!item) {
      return null;
    }

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
        return Array.isArray(directorsArray)
          ? directorsArray.map((d: any) => d.name || d).join(", ")
          : itemAny.directors;
      } catch {
        return itemAny.directors;
      }
    }

    if (item.category === "Podcast" && itemAny.hosts) {
      try {
        const hostsArray = JSON.parse(itemAny.hosts);
        return Array.isArray(hostsArray)
          ? hostsArray.join(", ")
          : itemAny.hosts;
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

  // Show loading state while fetching content item
  if (loading) {
    return (
      <View style={contentCardStyles.container}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  // Show error state if item not found
  if (!item) {
    return (
      <View style={contentCardStyles.container}>
        <Text style={contentCardStyles.title}>Content not found</Text>
      </View>
    );
  }

  const coverUrl = getImageUrl(item);
  const creatorInfo = getCreatorInfo();
  const showImage = coverUrl && !imageError;

  return (
    <TouchableOpacity
      style={contentCardStyles.container}
      onPress={() => onPress?.(record)}
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
        {item.year && <Text style={contentCardStyles.year}>{item.year}</Text>}
        {creatorInfo && (
          <Text style={contentCardStyles.creator} numberOfLines={1}>
            {creatorInfo}
          </Text>
        )}
        {/* Record Added Date */}
        <Text style={contentCardStyles.date}>
          {formatDate(record.dateConsumed)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
