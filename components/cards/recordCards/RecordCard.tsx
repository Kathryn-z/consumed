import { StatusRatingChip } from "@/components/chips/StatusRatingChip";
import CoverImage from "@/components/shared/CoverImage";
import { getContentItemById } from "@/db/contentOperations";
import { imageStyles } from "@/styles/common";
import { recordCardStyles } from "@/styles/components/cards/recordCard";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

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
  const showImage = (coverUrl && !imageError) as boolean;

  return (
    <TouchableOpacity
      style={recordCardStyles.container}
      onPress={() => onPress?.(record)}
      activeOpacity={0.7}
    >
      {/* Top Row: Image and Content Info */}
      <View style={recordCardStyles.topRow}>
        <CoverImage
          coverUrl={coverUrl}
          category={item.category}
          showImage={showImage}
          setImageError={setImageError}
          containerStyle={imageStyles.imageContainerSmall}
        />

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
