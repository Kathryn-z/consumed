import PrimaryButton from "@/components/buttons/PrimaryButton";
import {
  createConsumptionRecord,
  getConsumptionRecordById,
  updateConsumptionRecord,
} from "@/db/consumptionOperations";
import {
  createContentItem,
  findExistingContentItem,
  getContentItemById,
} from "@/db/contentOperations";
import { recordDetailStyles } from "@/styles/screens/recordDetail";
import { recordDetailEditStyles } from "@/styles/screens/recordDetailEdit";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { ContentCategory, ContentItem, ContentStatus } from "@/types/content";
import { getImageUrl } from "@/utils/images";
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

export default function RecordDetailEdit() {
  const params = useLocalSearchParams<{
    // Edit mode params
    id?: string;
    recordId?: string;
    // Create mode params (from recordInfo)
    title?: string;
    category?: string;
    year?: string;
    images?: string;
    link?: string;
    externalId?: string;
    status?: string;
    rating?: string;
    dateConsumed?: string;
    // Book fields
    author?: string;
    wordCount?: string;
    tags?: string;
    // TV/Movie & Drama shared fields
    subtype?: string;
    directors?: string;
    casts?: string;
    genres?: string;
    episodesCount?: string;
    countries?: string;
    // Drama-specific fields
    performers?: string;
    venue?: string;
    duration?: string;
    // Podcast fields
    hosts?: string;
    feedUrl?: string;
  }>();

  const { id, recordId } = params;
  const router = useRouter();
  const navigation = useNavigation();

  // Determine if we're in edit mode or create mode
  const isEditMode = !!recordId;
  const isCreateMode = !!params.title;

  const [item, setItem] = useState<ContentItem | null>(null);
  const [record, setRecord] = useState<ConsumptionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Form fields
  const [dateConsumed, setDateConsumed] = useState(new Date());
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // Set header right button (Save)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PrimaryButton
          text="Save"
          onPress={handleSave}
          loading={saving}
          buttonStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          textStyle={{ fontSize: 16 }}
        />
      ),
    });
  }, [navigation, saving]);

  // Load data
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setLoading(true);

          if (isEditMode && id && recordId) {
            // Edit mode: load existing content and record from database
            const [contentItem, consumptionRecord] = await Promise.all([
              getContentItemById(parseInt(id, 10)),
              getConsumptionRecordById(parseInt(recordId, 10)),
            ]);

            setItem(contentItem);
            setRecord(consumptionRecord);

            if (consumptionRecord) {
              setDateConsumed(new Date(consumptionRecord.dateConsumed));
              setRating(consumptionRecord.rating || 0);
              setNotes(consumptionRecord.notes || "");
            }
          } else if (isCreateMode && params.title) {
            // Create mode: initialize from params
            if (params.dateConsumed) {
              setDateConsumed(new Date(params.dateConsumed));
            }
            if (params.rating) {
              setRating(parseInt(params.rating, 10));
            }

            // Create a temporary ContentItem object for display
            const tempItem: any = {
              id: 0,
              title: params.title,
              category: params.category as ContentCategory,
              status: (params.status as ContentStatus) || ContentStatus.TODO,
              year: params.year ? parseInt(params.year, 10) : undefined,
              images: params.images,
              dateAdded: new Date().toISOString(),
            };

            setItem(tempItem);
          }
        } catch (error) {
          console.error("Error loading data:", error);
          Alert.alert("Error", "Failed to load record details.");
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [id, recordId, isEditMode, isCreateMode])
  );

  const handleSave = async () => {
    try {
      setSaving(true);

      if (isEditMode && record) {
        // Edit mode: update existing consumption record
        await updateConsumptionRecord(record.id, {
          dateConsumed: dateConsumed.toISOString(),
          rating: rating > 0 ? rating : undefined,
          notes: notes.trim() || undefined,
        });

        router.back();
      } else if (isCreateMode && params.title && params.category) {
        // Create mode: check for existing content, create if needed, then create consumption record
        const category = params.category as ContentCategory;

        // Check if content item already exists
        let contentItem = await findExistingContentItem(
          params.title,
          category,
          params.subtype
        );

        // If content already exists, inform user
        if (contentItem) {
          Alert.alert(
            "Content Exists",
            "This content already exists in your library. A new consumption record will not be added.",
            [{ text: "OK" }]
          );
        } else {
          // Create new content item
          const contentData: any = {
            title: params.title,
            category,
            status: (params.status as ContentStatus) || ContentStatus.TODO,
            year: params.year ? parseInt(params.year, 10) : undefined,
            images: params.images,
            link: params.link,
            externalId: params.externalId,
          };

          // Add category-specific fields
          if (category === ContentCategory.BOOK) {
            contentData.author = params.author;
            contentData.wordCount = params.wordCount
              ? parseInt(params.wordCount, 10)
              : undefined;
            contentData.tags = params.tags;
          } else if (category === ContentCategory.TV_MOVIE) {
            contentData.subtype = params.subtype;
            contentData.directors = params.directors;
            contentData.casts = params.casts;
            contentData.genres = params.genres;
            contentData.episodesCount = params.episodesCount
              ? parseInt(params.episodesCount, 10)
              : undefined;
            contentData.countries = params.countries;
          } else if (category === ContentCategory.PODCAST) {
            contentData.hosts = params.hosts;
            contentData.episodesCount = params.episodesCount
              ? parseInt(params.episodesCount, 10)
              : undefined;
            contentData.genres = params.genres;
            contentData.feedUrl = params.feedUrl;
          } else if (category === ContentCategory.DRAMA) {
            contentData.subtype = params.subtype;
            contentData.directors = params.directors;
            contentData.casts = params.casts;
            contentData.performers = params.performers;
            contentData.venue = params.venue;
            contentData.duration = params.duration
              ? parseInt(params.duration, 10)
              : undefined;
          }

          contentItem = await createContentItem(contentData);
        }

        // Create consumption record
        await createConsumptionRecord({
          contentItemId: contentItem.id,
          rating: rating > 0 ? rating : undefined,
          notes: notes.trim() || undefined,
          dateConsumed: dateConsumed.toISOString(),
        });

        // Navigate to home
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Error saving record:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditContent = () => {
    router.push(`/contentInfo?id=${id}`);
  };

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starDisplay = rating >= i ? "★" : "☆";

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 28, color: "#FFB800" }}>{starDisplay}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const coverUrl = item ? getImageUrl(item) : undefined;
  const showImage = coverUrl && !imageError;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (item) {
    return (
      <ScrollView style={recordDetailEditStyles.container}>
        {/* Content Card */}
        <TouchableOpacity
          style={recordDetailEditStyles.contentCard}
          onPress={() => router.push(`/contentDetail/${id}`)}
          activeOpacity={0.7}
        >
          {/* Cover Image */}
          {showImage ? (
            <Image
              source={{ uri: coverUrl }}
              style={recordDetailEditStyles.coverImage}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={recordDetailEditStyles.coverPlaceholder}>
              <Text>{item.category.charAt(0)}</Text>
            </View>
          )}

          {/* Content Info */}
          <View style={recordDetailEditStyles.contentInfo}>
            <View style={recordDetailStyles.titleRow}>
              <Text style={recordDetailStyles.title} numberOfLines={2}>
                {item.title}
              </Text>
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
            <Text style={recordDetailStyles.statusButtonText}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
