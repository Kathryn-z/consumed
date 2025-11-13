import { useContent } from "@/hooks/useContent";
import { customEntryStyles } from "@/styles/screens/customEntry";
import { CATEGORIES, ContentCategory, ContentStatus } from "@/types/content";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CustomEntry() {
  const router = useRouter();
  const { addItem } = useContent();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ContentCategory | null>(null);
  const [status, setStatus] = useState<ContentStatus>(ContentStatus.TODO);
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    try {
      setSaving(true);
      await addItem({
        title: title.trim(),
        category,
        status,
        creator: creator.trim() || undefined,
        year: year ? parseInt(year, 10) : undefined,
        rating: rating > 0 ? rating : undefined,
        notes: notes.trim() || undefined,
      });
      router.back();
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
          {/* Title Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Title *</Text>
            <TextInput
              style={customEntryStyles.input}
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Category Selection */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Category *</Text>
            <View style={customEntryStyles.filterContainer}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    customEntryStyles.chip,
                    category === cat && customEntryStyles.chipActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      customEntryStyles.chipText,
                      category === cat && customEntryStyles.chipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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

          {/* Creator/Author Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Creator/Author</Text>
            <TextInput
              style={customEntryStyles.input}
              placeholder="Enter creator or author name"
              value={creator}
              onChangeText={setCreator}
            />
          </View>

          {/* Year Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Year</Text>
            <TextInput
              style={customEntryStyles.input}
              placeholder="Enter year"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
            />
          </View>

          {/* Rating */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Rating</Text>
            <View style={customEntryStyles.ratingContainer}>
              {renderStars()}
            </View>
          </View>

          {/* Notes Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Notes</Text>
            <TextInput
              style={[customEntryStyles.input, customEntryStyles.textArea]}
              placeholder="Add any additional notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[customEntryStyles.button, saving && { opacity: 0.6 }]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving}
          >
            <Text style={customEntryStyles.buttonText}>
              {saving ? "Saving..." : "Save Entry"}
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
