import { getConsumptionRecordsByContentId } from "@/db/consumptionOperations";
import { deleteContentItem, getContentItemById } from "@/db/contentOperations";
import { contentDetailStyles } from "@/styles/screens/contentDetail";
import { ConsumptionRecord, ContentItem } from "@/types/content";
import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [consumptionRecords, setConsumptionRecords] = useState<
    ConsumptionRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Animate menu slide-up when shown
  useEffect(() => {
    if (showMenu) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [showMenu, slideAnim]);

  // Handle menu dismissal with slide down animation
  const handleDismissMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowMenu(false);
      slideAnim.setValue(300);
    });
  };

  // Set header right button (three-dot menu)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Feather name="more-horizontal" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, id]);

  const handleEdit = () => {
    handleDismissMenu();
    router.push(`/customEntry?id=${id}`);
  };

  const handleDelete = () => {
    handleDismissMenu();
    Alert.alert(
      "Delete Content",
      "Are you sure you want to delete this content? This will also delete all consumption records.",
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
              await deleteContentItem(parseInt(id, 10));
              router.back();
            } catch (error) {
              console.error("Error deleting content:", error);
              Alert.alert(
                "Error",
                "Failed to delete content. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  // Reload data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        if (!id) return;

        try {
          setLoading(true);
          const contentItem = await getContentItemById(parseInt(id, 10));
          setItem(contentItem);

          // Load consumption records
          const records = await getConsumptionRecordsByContentId(
            parseInt(id, 10)
          );
          setConsumptionRecords(records);
        } catch (error) {
          console.error("Error loading content item:", error);
        } finally {
          setLoading(false);
        }
      }

      loadData();
    }, [id])
  );

  if (loading) {
    return (
      <SafeAreaView style={contentDetailStyles.container}>
        <View style={contentDetailStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={contentDetailStyles.container}>
        <View style={contentDetailStyles.errorContainer}>
          <Text style={contentDetailStyles.errorText}>Content not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={contentDetailStyles.container}>
      <ScrollView
        style={contentDetailStyles.content}
        contentContainerStyle={contentDetailStyles.scrollContent}
      >
        {/* Cover Image or Placeholder */}
        <View style={contentDetailStyles.imageContainer}>
          {item.coverImage ? (
            <Image
              source={{ uri: item.coverImage }}
              style={contentDetailStyles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={contentDetailStyles.placeholder}>
              <Text style={contentDetailStyles.placeholderText}>
                {item.category.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Content Information */}
        <View style={contentDetailStyles.infoContainer}>
          {/* Title */}
          <Text style={contentDetailStyles.title}>{item.title}</Text>

          {/* Category */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Category:</Text>
            <Text style={contentDetailStyles.value}>{item.category}</Text>
          </View>

          {/* Creator */}
          {item.creator && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Creator:</Text>
              <Text style={contentDetailStyles.value}>{item.creator}</Text>
            </View>
          )}

          {/* Year */}
          {item.year && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Year:</Text>
              <Text style={contentDetailStyles.value}>{item.year}</Text>
            </View>
          )}

          {/* Status */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Status:</Text>
            <View
              style={[
                contentDetailStyles.statusBadge,
                item.status === "done"
                  ? contentDetailStyles.statusDone
                  : contentDetailStyles.statusTodo,
              ]}
            >
              <Text style={contentDetailStyles.statusText}>
                {item.status === "done" ? "Done" : "To do"}
              </Text>
            </View>
          </View>

          {/* Date Added */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Added:</Text>
            <Text style={contentDetailStyles.value}>
              {formatDate(item.dateAdded)}
            </Text>
          </View>

          {/* Latest Rating */}
          {item.rating !== undefined && item.rating !== null && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Latest Rating:</Text>
              <View style={contentDetailStyles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={contentDetailStyles.star}>
                    {star <= item.rating! ? "★" : "☆"}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Consumption History */}
          {consumptionRecords.length > 0 && (
            <View style={contentDetailStyles.historySection}>
              <Text style={contentDetailStyles.historySectionTitle}>
                Consumption History ({consumptionRecords.length})
              </Text>
              {consumptionRecords.map((record) => (
                <View key={record.id} style={contentDetailStyles.recordCard}>
                  <View style={contentDetailStyles.recordHeader}>
                    <Text style={contentDetailStyles.recordDate}>
                      {formatDate(record.dateConsumed)}
                    </Text>
                    {record.rating !== undefined && record.rating !== null && (
                      <View style={contentDetailStyles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Text
                            key={star}
                            style={contentDetailStyles.recordStar}
                          >
                            {star <= record.rating! ? "★" : "☆"}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                  {record.notes && (
                    <Text style={contentDetailStyles.recordNotes}>
                      {record.notes}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Menu Modal */}
      {showMenu && (
        <Modal
          visible={showMenu}
          transparent={true}
          animationType="none"
          onRequestClose={handleDismissMenu}
          statusBarTranslucent={false}
        >
          <TouchableOpacity
            style={contentDetailStyles.modalOverlay}
            activeOpacity={1}
            onPress={handleDismissMenu}
          >
            <Animated.View
              style={[
                contentDetailStyles.menuContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                {/* Edit Option */}
                <TouchableOpacity
                  style={contentDetailStyles.menuItem}
                  onPress={handleEdit}
                  activeOpacity={0.8}
                >
                  <Text style={contentDetailStyles.menuIcon}>✏️</Text>
                  <Text style={contentDetailStyles.menuText}>Edit</Text>
                </TouchableOpacity>

                {/* Delete Option */}
                <TouchableOpacity
                  style={contentDetailStyles.menuItem}
                  onPress={handleDelete}
                  activeOpacity={0.8}
                >
                  <Text style={contentDetailStyles.menuIcon}>🗑️</Text>
                  <Text
                    style={[
                      contentDetailStyles.menuText,
                      contentDetailStyles.deleteText,
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}
