import { ContentInfoCard } from "@/components/ContentInfoCard";
import { BottomMenuModal } from "@/components/modals/BottomMenuModal";
import {
  deleteConsumptionRecord,
  getConsumptionRecordById,
} from "@/db/consumptionOperations";
import { getContentItemById } from "@/db/contentOperations";
import { recordDetailStyles } from "@/styles/screens/recordDetail";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentItem } from "@/types/content";
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
      router.push(`/recordDetailEdit/${record.id}?id=${item?.id}`);
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
      {/* Content Card */}
      <ContentInfoCard
        item={item}
        onPress={() => router.push(`/contentDetail/${item.id}`)}
        showChevron
      />

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
