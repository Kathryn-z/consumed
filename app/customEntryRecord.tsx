import { customEntryStyles } from "@/styles/screens/customEntry";
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
    creator?: string;
    year?: string;
  }>();

  const [status, setStatus] = useState<ContentStatus>(ContentStatus.TODO);
  const [rating, setRating] = useState(0);
  const [dateConsumed, setDateConsumed] = useState(new Date());
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      // Create new content item
      const newItem = await createContentItem({
        title: params.title,
        category: params.category as ContentCategory,
        status,
        creator: params.creator,
        year: params.year ? parseInt(params.year, 10) : undefined,
      });

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
          <Text style={customEntryStyles.star}>{starDisplay}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={customEntryStyles.container}>
      <ScrollView
        style={customEntryStyles.content}
        contentContainerStyle={customEntryStyles.scrollContent}
      >
        <View style={customEntryStyles.formContainer}>
          {/* Status Selection */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Status *</Text>
            <View style={customEntryStyles.filterContainer}>
              <TouchableOpacity
                style={[
                  customEntryStyles.chip,
                  status === ContentStatus.TODO && customEntryStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.TODO)}
              >
                <Text
                  style={[
                    customEntryStyles.chipText,
                    status === ContentStatus.TODO && customEntryStyles.chipTextActive,
                  ]}
                >
                  To do
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  customEntryStyles.chip,
                  status === ContentStatus.DONE && customEntryStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.DONE)}
              >
                <Text
                  style={[
                    customEntryStyles.chipText,
                    status === ContentStatus.DONE && customEntryStyles.chipTextActive,
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
              <View style={customEntryStyles.inputGroup}>
                <Text style={customEntryStyles.label}>Date Consumed</Text>
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
              <View style={customEntryStyles.inputGroup}>
                <Text style={customEntryStyles.label}>Rating</Text>
                <View style={customEntryStyles.ratingContainer}>
                  {renderStars()}
                </View>
              </View>
            </>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[customEntryStyles.button, saving && { opacity: 0.6 }]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving}
          >
            <Text style={customEntryStyles.buttonText}>
              {saving ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={[customEntryStyles.button, customEntryStyles.cancelButton]}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={[customEntryStyles.buttonText, customEntryStyles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
