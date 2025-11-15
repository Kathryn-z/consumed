import { BottomMenuModal } from "@/components/modals/BottomMenuModal";
import {
  deleteConsumptionRecord,
  getConsumptionRecordById,
} from "@/db/consumptionOperations";
import { getContentItemById } from "@/db/contentOperations";
import { recordDetailStyles } from "@/styles/screens/recordDetail";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentItem } from "@/types/content";
import { getImageUrl } from "@/utils/images";
import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecordDetail() {
  const { recordId } = useLocalSearchParams<{ recordId: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [record, setRecord] = useState<ConsumptionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Set header right button (three-dot menu)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Feather name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleEdit = () => {
    setShowMenu(false);
    if (record) {
      router.push(`/recordDetailEdit?id=${item?.id}&recordId=${record.id}`);
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              if (record) {
                await deleteConsumptionRecord(record.id);
                router.back();
              }
            } catch (error) {
              console.error("Error deleting record:", error);
              Alert.alert(
                "Error",
                "Failed to delete record. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  // Load consumption record and content item
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          if (recordId) {
            // First, fetch the consumption record by record ID
            const consumptionRecord = await getConsumptionRecordById(
              parseInt(recordId, 10)
            );
            setRecord(consumptionRecord);

            // Then fetch the content item using the record's contentItemId
            if (consumptionRecord) {
              const contentItem = await getContentItemById(
                consumptionRecord.contentItemId
              );
              setItem(contentItem);
            }
          }
        } catch (error) {
          console.error("Error loading record details:", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [recordId])
  );

  const coverUrl = item ? getImageUrl(item) : undefined;
  const showImage = coverUrl && !imageError;

  if (loading) {
    return (
      <View style={recordDetailStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!record || !item) {
    return (
      <View style={recordDetailStyles.loadingContainer}>
        <Text>Record not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={recordDetailStyles.container}>
      {/* Privacy and Stats Info */}
      <View style={recordDetailStyles.infoBar}>
        <Text style={recordDetailStyles.infoText}>
          Private · 91 · 0 impressions
        </Text>
      </View>

      {/* Content Card */}
      <TouchableOpacity
        style={recordDetailStyles.contentCard}
        onPress={() => router.push(`/contentDetail?id=${item.id}`)}
        activeOpacity={0.7}
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
            <Feather name="chevron-right" size={20} color="#666" />
          </View>
          <Text style={recordDetailStyles.meta}>
            {item.category}
            {item.year && ` · ${item.year}`}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Status Button */}
      <View style={recordDetailStyles.statusContainer}>
        <TouchableOpacity style={recordDetailStyles.statusButton}>
          <Text style={recordDetailStyles.statusButtonText}>{item.status}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Menu Modal */}
      <BottomMenuModal
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        options={[
          {
            icon: "✏️",
            label: "Edit",
            onPress: handleEdit,
          },
          {
            icon: "🗑️",
            label: "Delete",
            onPress: handleDelete,
            isDestructive: true,
          },
        ]}
      />
    </ScrollView>
  );
}
