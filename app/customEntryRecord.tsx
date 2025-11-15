import { contentInfoStyles } from "@/styles/screens/contentInfo";
import { ContentCategory, ContentStatus } from "@/types/content";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { createContentItem } from "@/db/contentOperations";
import { createConsumptionRecord } from "@/db/consumptionOperations";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomEntryRecord() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title: string;
    category: string;
    year?: string;
    images?: string;
    link?: string;
    externalId?: string;
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

  const [status, setStatus] = useState<ContentStatus>(ContentStatus.TODO);
  const [rating, setRating] = useState(0);
  const [dateConsumed, setDateConsumed] = useState(new Date());
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      // Build base content item
      const contentData: any = {
        title: params.title,
        category: params.category as ContentCategory,
        status,
        year: params.year ? parseInt(params.year, 10) : undefined,
        images: params.images,
        link: params.link,
        externalId: params.externalId,
      };

      // Add category-specific fields
      const category = params.category as ContentCategory;

      if (category === ContentCategory.BOOK) {
        contentData.author = params.author;
        contentData.wordCount = params.wordCount ? parseInt(params.wordCount, 10) : undefined;
        contentData.tags = params.tags;
      } else if (category === ContentCategory.TV_MOVIE) {
        contentData.subtype = params.subtype;
        contentData.directors = params.directors;
        contentData.casts = params.casts;
        contentData.genres = params.genres;
        contentData.episodesCount = params.episodesCount ? parseInt(params.episodesCount, 10) : undefined;
        contentData.countries = params.countries;
      } else if (category === ContentCategory.PODCAST) {
        contentData.hosts = params.hosts;
        contentData.episodesCount = params.episodesCount ? parseInt(params.episodesCount, 10) : undefined;
        contentData.genres = params.genres;
        contentData.feedUrl = params.feedUrl;
      } else if (category === ContentCategory.DRAMA) {
        contentData.subtype = params.subtype;
        contentData.directors = params.directors;
        contentData.casts = params.casts;
        contentData.performers = params.performers;
        contentData.venue = params.venue;
        contentData.duration = params.duration ? parseInt(params.duration, 10) : undefined;
      }

      // Create new content item
      const newItem = await createContentItem(contentData);

      // If status is done, create a consumption record
      if (status === ContentStatus.DONE) {
        await createConsumptionRecord({
          contentItemId: newItem.id,
          rating: rating > 0 ? rating : undefined,
          notes: undefined,
          dateConsumed: dateConsumed.toISOString(),
        });
      }

      // Navigate to index page
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to save entry. Please try again.");
      console.error("Error saving entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starDisplay = rating >= i ? '★' : '☆';

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Text style={contentInfoStyles.star}>{starDisplay}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={contentInfoStyles.container}>
      <ScrollView
        style={contentInfoStyles.content}
        contentContainerStyle={contentInfoStyles.scrollContent}
      >
        <View style={contentInfoStyles.formContainer}>
          {/* Status Selection */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>Status *</Text>
            <View style={contentInfoStyles.filterContainer}>
              <TouchableOpacity
                style={[
                  contentInfoStyles.chip,
                  status === ContentStatus.TODO && contentInfoStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.TODO)}
              >
                <Text
                  style={[
                    contentInfoStyles.chipText,
                    status === ContentStatus.TODO && contentInfoStyles.chipTextActive,
                  ]}
                >
                  To do
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  contentInfoStyles.chip,
                  status === ContentStatus.DONE && contentInfoStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.DONE)}
              >
                <Text
                  style={[
                    contentInfoStyles.chipText,
                    status === ContentStatus.DONE && contentInfoStyles.chipTextActive,
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Show date consumed and rating only if status is DONE */}
          {status === ContentStatus.DONE && (
            <>
              {/* Date Consumed */}
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Date Consumed</Text>
                <DateTimePicker
                  value={dateConsumed}
                  mode="date"
                  display="default"
                  onChange={(_event, selectedDate) => {
                    if (selectedDate) {
                      setDateConsumed(selectedDate);
                    }
                  }}
                  style={{ alignSelf: 'flex-start' }}
                />
              </View>

              {/* Rating */}
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Rating</Text>
                <View style={contentInfoStyles.ratingContainer}>
                  {renderStars()}
                </View>
              </View>
            </>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[contentInfoStyles.button, saving && { opacity: 0.6 }]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving}
          >
            <Text style={contentInfoStyles.buttonText}>
              {saving ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={[contentInfoStyles.button, contentInfoStyles.cancelButton]}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={[contentInfoStyles.buttonText, contentInfoStyles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
