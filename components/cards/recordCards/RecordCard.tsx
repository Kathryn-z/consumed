import { StatusRatingChip } from "@/components/chips/StatusRatingChip";
import { getContentItemById } from "@/db/contentOperations";
import { recordCardStyles } from "@/styles/components/cards/recordCard";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  // Get subtype if available
  const getSubtype = () => {
    const itemAny = item as any;
    return itemAny?.subtype || null;
  };

  // Get category display text
  const getCategoryDisplay = () => {
    if (!item) return "";
    const subtype = getSubtype();
    return subtype ? subtype : item.category;
  };

  // Show loading state while fetching content item
  if (loading) {
    return (
      <View style={recordCardStyles.container}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  // Show error state if item not found
  if (!item) {
    return (
      <View style={recordCardStyles.container}>
        <Text style={recordCardStyles.title}>Content not found</Text>
      </View>
    );
  }

  const coverUrl = getImageUrl(item);
  const showImage = coverUrl && !imageError;

  return (
    <TouchableOpacity
      style={recordCardStyles.container}
      onPress={() => onPress?.(record)}
      activeOpacity={0.7}
    >
      {/* Top Row: Image and Content Info */}
      <View style={recordCardStyles.topRow}>
        {/* Cover Image or Placeholder */}
        <View style={recordCardStyles.imageContainerSmall}>
          {showImage ? (
            <Image
              source={{ uri: coverUrl }}
              style={recordCardStyles.imageSizePct}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={recordCardStyles.imagePlaceholder}>
              <Text style={recordCardStyles.imagePlaceholderText}>
                {item.category.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Content Info */}
        <View style={recordCardStyles.content}>
          <Text style={recordCardStyles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={recordCardStyles.categoryRow}>
            {getCategoryDisplay()}
          </Text>

          {/* Status/Rating Chip */}
          <View>
            <StatusRatingChip status={item.status} rating={record.rating} />
          </View>
        </View>
      </View>

      {/* Notes - Below the image */}
      {record.notes ? (
        <Text style={recordCardStyles.notes} numberOfLines={2}>
          {record.notes}
        </Text>
      ) : (
        <Text></Text>
      )}
    </TouchableOpacity>
  );
}
