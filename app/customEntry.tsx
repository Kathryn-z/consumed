import { customEntryStyles } from "@/styles/screens/customEntry";
import { CATEGORIES, ContentCategory } from "@/types/content";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getContentItemById, updateContentItem } from "@/db/contentOperations";

export default function CustomEntry() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ContentCategory | null>(null);
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!id;

  // Load existing item if editing
  useEffect(() => {
    async function loadItem() {
      if (!id) return;

      try {
        setLoading(true);
        const item = await getContentItemById(parseInt(id, 10));
        if (item) {
          setTitle(item.title);
          setCategory(item.category);
          setCreator(item.creator || "");
          setYear(item.year?.toString() || "");
        }
      } catch (error) {
        console.error("Error loading item:", error);
        Alert.alert("Error", "Failed to load item");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const handleNext = () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    // Navigate to record consumption page with data
    const params = new URLSearchParams({
      title: title.trim(),
      category,
      ...(creator.trim() && { creator: creator.trim() }),
      ...(year && { year }),
    });
    router.push(`/customEntryRecord?${params.toString()}`);
  };

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

      // Update existing item metadata only
      await updateContentItem(parseInt(id!, 10), {
        title: title.trim(),
        category,
        creator: creator.trim() || undefined,
        year: year ? parseInt(year, 10) : undefined,
      });

      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update entry. Please try again.");
      console.error("Error saving entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
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

          {/* Save Button (for editing) */}
          {isEditing && (
            <TouchableOpacity
              style={[customEntryStyles.button, saving && { opacity: 0.6 }]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={saving}
            >
              <Text style={customEntryStyles.buttonText}>
                {saving ? "Updating..." : "Update Entry"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Next Button (for new entry) */}
          {!isEditing && (
            <TouchableOpacity
              style={customEntryStyles.button}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={customEntryStyles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}

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
