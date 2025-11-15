import { getConsumptionRecordsByContentId } from "@/db/consumptionOperations";
import { deleteContentItem, getContentItemById } from "@/db/contentOperations";
import { contentDetailStyles } from "@/styles/screens/contentDetail";
import { getImageUrl } from "@/utils/images";
import {
  ContentItem,
  ContentCategory,
} from "@/types/content";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomMenuModal } from "@/components/modals/BottomMenuModal";

export default function ContentDetail() {
  const { contentId } = useLocalSearchParams<{ contentId: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [consumptionRecords, setConsumptionRecords] = useState<
    ConsumptionRecord[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Set header right button (three-dot menu)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Feather name="more-horizontal" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, contentId]);

  const handleEdit = () => {
    setShowMenu(false);
    router.push(`/contentInfo?id=${contentId}`);
  };

  const handleDelete = () => {
    setShowMenu(false);
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
              await deleteContentItem(parseInt(contentId, 10));
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

  const handleOpenLink = async () => {
    const link = (item as any).link;
    if (link) {
      try {
        const canOpen = await Linking.canOpenURL(link);
        if (canOpen) {
          await Linking.openURL(link);
        } else {
          Alert.alert("Error", "Unable to open this link");
        }
      } catch (error) {
        console.error("Error opening link:", error);
        Alert.alert("Error", "Failed to open link");
      }
    }
  };

  // Reload data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        if (!contentId) return;

        try {
          setLoading(true);
          setImageError(false); // Reset image error state when loading new item
          const contentItem = await getContentItemById(parseInt(contentId, 10));
          setItem(contentItem);

          // Load consumption records
          const records = await getConsumptionRecordsByContentId(
            parseInt(contentId, 10)
          );
          setConsumptionRecords(records);
        } catch (error) {
          console.error("Error loading content item:", error);
        } finally {
          setLoading(false);
        }
      }

      loadData();
    }, [contentId])
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

  const coverUrl = getImageUrl(item);
  const showImage = coverUrl && !imageError;

  return (
    <View style={contentDetailStyles.container}>
      <ScrollView
        style={contentDetailStyles.content}
        contentContainerStyle={contentDetailStyles.scrollContent}
      >
        {/* Cover Image or Placeholder */}
        <View style={contentDetailStyles.imageContainer}>
          {showImage ? (
            <Image
              source={{ uri: coverUrl }}
              style={contentDetailStyles.image}
              resizeMode="cover"
              onError={() => setImageError(true)}
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

          {/* Year */}
          {item.year && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Year:</Text>
              <Text style={contentDetailStyles.value}>{item.year}</Text>
            </View>
          )}

          {/* Category-specific fields */}

          {/* Book fields */}
          {item.category === ContentCategory.BOOK && (
            <>
              {(item as any).author && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Author:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).author}
                  </Text>
                </View>
              )}

              {(item as any).wordCount && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Word Count:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).wordCount.toLocaleString()}
                  </Text>
                </View>
              )}

              {(item as any).tags && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Tags:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const tagsArray = JSON.parse((item as any).tags);
                        return Array.isArray(tagsArray) ? tagsArray.join(", ") : (item as any).tags;
                      } catch {
                        return (item as any).tags;
                      }
                    })()}
                  </Text>
                </View>
              )}
            </>
          )}

          {/* TV/Movie fields */}
          {item.category === ContentCategory.TV_MOVIE && (
            <>
              {(item as any).subtype && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Type:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).subtype}
                  </Text>
                </View>
              )}

              {(item as any).directors && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Directors:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const directorsArray = JSON.parse((item as any).directors);
                        return directorsArray.map((d: any) => d.name || d).join(", ");
                      } catch {
                        return (item as any).directors;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).casts && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Cast:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const castsArray = JSON.parse((item as any).casts);
                        return castsArray.map((c: any) => c.name || c).join(", ");
                      } catch {
                        return (item as any).casts;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).genres && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Genres:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const genresArray = JSON.parse((item as any).genres);
                        return Array.isArray(genresArray) ? genresArray.join(", ") : (item as any).genres;
                      } catch {
                        return (item as any).genres;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).episodesCount && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Episodes:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).episodesCount}
                  </Text>
                </View>
              )}

              {(item as any).countries && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Countries:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const countriesArray = JSON.parse((item as any).countries);
                        return Array.isArray(countriesArray) ? countriesArray.join(", ") : (item as any).countries;
                      } catch {
                        return (item as any).countries;
                      }
                    })()}
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Podcast fields */}
          {item.category === ContentCategory.PODCAST && (
            <>
              {(item as any).hosts && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Hosts:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const hostsArray = JSON.parse((item as any).hosts);
                        return Array.isArray(hostsArray) ? hostsArray.join(", ") : (item as any).hosts;
                      } catch {
                        return (item as any).hosts;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).episodesCount && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Episodes:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).episodesCount}
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Drama fields */}
          {item.category === ContentCategory.DRAMA && (
            <>
              {(item as any).subtype && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Type:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).subtype}
                  </Text>
                </View>
              )}

              {(item as any).directors && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Directors:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const directorsArray = JSON.parse((item as any).directors);
                        return Array.isArray(directorsArray) ? directorsArray.map((d: any) => d.name || d).join(", ") : (item as any).directors;
                      } catch {
                        return (item as any).directors;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).casts && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Cast:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(() => {
                      try {
                        const castsArray = JSON.parse((item as any).casts);
                        return Array.isArray(castsArray) ? castsArray.map((c: any) => c.name || c).join(", ") : (item as any).casts;
                      } catch {
                        return (item as any).casts;
                      }
                    })()}
                  </Text>
                </View>
              )}

              {(item as any).performers && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Performers:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).performers}
                  </Text>
                </View>
              )}

              {(item as any).venue && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Venue:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).venue}
                  </Text>
                </View>
              )}

              {(item as any).duration && (
                <View style={contentDetailStyles.row}>
                  <Text style={contentDetailStyles.label}>Duration:</Text>
                  <Text style={contentDetailStyles.value}>
                    {(item as any).duration} minutes
                  </Text>
                </View>
              )}
            </>
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

          {/* External Link Button */}
          {(item as any).link && (
            <TouchableOpacity
              style={contentDetailStyles.linkButton}
              onPress={handleOpenLink}
              activeOpacity={0.8}
            >
              <Feather name="external-link" size={18} color="#007AFF" />
              <Text style={contentDetailStyles.linkButtonText}>
                Go to External Link
              </Text>
            </TouchableOpacity>
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
    </View>
  );
}
