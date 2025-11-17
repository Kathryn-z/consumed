import { ContentInfoCard } from "@/components/cards/contentCards/ContentInfoCard";
import { PodcastEpisodeCard } from "@/components/cards/contentCards/PodcastEpisodeCard";
import { DateConsumedChip } from "@/components/chips/DateConsumedChip";
import { StatusRatingChip } from "@/components/chips/StatusRatingChip";
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
import {
  findOrCreatePodcastEpisode,
  getPodcastEpisodeById,
} from "@/db/podcastEpisodeOperations";
import { ItunesPodcastEpisode } from "@/services/api/itunes";
import { recordDetailEditStyles } from "@/styles/screens/recordDetailEdit";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import {
  ContentCategory,
  ContentItem,
  ContentStatus,
  PodcastEpisode,
} from "@/types/content";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecordDetailEdit() {
  const params = useLocalSearchParams<{
    recordId: string;
    // Edit mode params
    id?: string;
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
    episodeData?: string; // JSON string of ItunesPodcastEpisode
  }>();

  const { recordId } = params;
  const router = useRouter();
  const navigation = useNavigation();

  // Determine if we're in edit mode or create mode
  const isEditMode = recordId !== "new";
  const isCreateMode = recordId === "new";

  const [item, setItem] = useState<ContentItem | null>(null);
  const [record, setRecord] = useState<ConsumptionRecord | null>(null);
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [newRecordData, setNewRecordData] = useState({
    dateConsumed: new Date(),
    rating: 0,
    notes: "",
  });

  const handleSave = useCallback(async () => {
    try {
      setSaving(true);

      if (recordId !== "new" && record) {
        // Edit mode: update existing consumption record
        await updateConsumptionRecord(record.id, {
          dateConsumed: newRecordData.dateConsumed.toISOString(),
          rating: newRecordData.rating > 0 ? newRecordData.rating : undefined,
          notes: newRecordData.notes.trim() || undefined,
        });
        router.back();
      } else if (recordId === "new" && params.title && params.category) {
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

        // Handle podcast episode if present
        let episodeId: number | undefined;
        if (params.episodeData && params.category === ContentCategory.PODCAST) {
          const episodeData: ItunesPodcastEpisode = JSON.parse(
            params.episodeData
          );
          const podcastEpisode = await findOrCreatePodcastEpisode({
            podcastId: contentItem.id,
            episodeNumber: episodeData.trackNumber,
            title: episodeData.trackName,
            description: episodeData.description,
            releaseDate: episodeData.releaseDate,
            durationMillis: episodeData.trackTimeMillis,
          });
          episodeId = podcastEpisode.id;
        }

        // Create consumption record
        await createConsumptionRecord({
          contentItemId: contentItem.id,
          episodeId,
          rating: newRecordData.rating > 0 ? newRecordData.rating : undefined,
          notes: newRecordData.notes.trim() || undefined,
          dateConsumed: newRecordData.dateConsumed.toISOString(),
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
  }, [recordId, record, newRecordData, params, router]);

  // Set header right button (Save)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={recordDetailEditStyles.saveButton}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.7}
        >
          <Text style={recordDetailEditStyles.saveButtonText}>
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, saving, handleSave]);

  // Load data
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setLoading(true);

          if (isEditMode) {
            // Edit mode: load existing content and record from database
            const consumptionRecord = await getConsumptionRecordById(
              parseInt(recordId, 10)
            );

            if (!consumptionRecord) {
              Alert.alert("Error", "Record not found.");
              router.back();
              return;
            }

            const contentItem = await getContentItemById(
              consumptionRecord.contentItemId
            );

            setItem(contentItem);
            setRecord(consumptionRecord);

            // Load episode data if this is a podcast with an episode
            if (consumptionRecord.episodeId) {
              const podcastEpisode = await getPodcastEpisodeById(
                consumptionRecord.episodeId
              );
              setEpisode(podcastEpisode);
            }

            if (consumptionRecord) {
              setNewRecordData({
                dateConsumed: new Date(consumptionRecord.dateConsumed),
                rating: consumptionRecord.rating || 0,
                notes: consumptionRecord.notes || "",
              });
            }
          } else if (isCreateMode && params.title) {
            // Create mode: initialize from params
            if (params.dateConsumed || params.rating) {
              setNewRecordData({
                dateConsumed: params.dateConsumed
                  ? new Date(params.dateConsumed)
                  : new Date(),
                rating: params.rating ? parseInt(params.rating, 10) : 0,
                notes: "",
              });
            }

            // Parse episode data if present (for podcasts)
            if (
              params.episodeData &&
              params.category === ContentCategory.PODCAST
            ) {
              const episodeData: ItunesPodcastEpisode = JSON.parse(
                params.episodeData
              );
              // Create a temporary PodcastEpisode object for display
              const tempEpisode: PodcastEpisode = {
                id: 0,
                podcastId: 0,
                episodeNumber: episodeData.trackNumber,
                title: episodeData.trackName,
                description: episodeData.description,
                releaseDate: episodeData.releaseDate,
                durationMillis: episodeData.trackTimeMillis,
                dateAdded: new Date().toISOString(),
              };
              setEpisode(tempEpisode);
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
    }, [recordId])
  );

  const handleStarPress = (starIndex: number) => {
    setNewRecordData((prev) => ({ ...prev, rating: starIndex }));
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starDisplay = newRecordData.rating >= i ? "★" : "☆";

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
      <View style={recordDetailEditStyles.container}>
        <ScrollView style={recordDetailEditStyles.scrollContent}>
          {/* Content Card */}
          <ContentInfoCard
            item={item}
            onPress={
              isEditMode && item.id
                ? () => router.push(`/contentDetail/${item.id}`)
                : undefined
            }
            disabled={!isEditMode}
          />

          {/* Podcast Episode Card (if applicable) */}
          {episode && item.category === ContentCategory.PODCAST && (
            <View style={{ marginBottom: 16 }}>
              <PodcastEpisodeCard
                episode={{
                  trackId: 0,
                  collectionId: episode.podcastId,
                  trackName: episode.title,
                  collectionName: item.title,
                  artistName: "",
                  description: episode.description,
                  releaseDate: episode.releaseDate || "",
                  trackTimeMillis: episode.durationMillis,
                  trackNumber: episode.episodeNumber,
                }}
              />
            </View>
          )}

          {/* Date Consumed */}
          <DateConsumedChip dateConsumed={newRecordData.dateConsumed} />

          {/* Status/Rating Chip */}
          <StatusRatingChip
            status={item.status}
            rating={newRecordData.rating}
          />

          {/* Rating Stars (Edit Mode) */}
          {item.status === "done" && (
            <View style={recordDetailEditStyles.starsContainer}>
              {renderStars()}
            </View>
          )}

          {/* Notes Input */}
          <View style={recordDetailEditStyles.notesInputContainer}>
            <TextInput
              style={recordDetailEditStyles.notesInput}
              value={newRecordData.notes}
              onChangeText={(text) =>
                setNewRecordData((prev) => ({ ...prev, notes: text }))
              }
              placeholder="Please add your content here. Keep it short and simple. And smile :)"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
}
