import { getContentItemById, updateContentItem } from "@/db/contentOperations";
import { customEntryStyles } from "@/styles/screens/customEntry";
import { CATEGORIES, ContentCategory, getCreatorLabel } from "@/types/content";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CustomEntry() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  // Shared fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ContentCategory | null>(null);
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState("");
  const [link, setLink] = useState("");

  // Category-specific fields
  const [wordCount, setWordCount] = useState("");
  const [actors, setActors] = useState("");
  const [type, setType] = useState("");
  const [numberOfEpisodes, setNumberOfEpisodes] = useState("");

  const isEditing = !!id;
  const creatorLabel = category ? getCreatorLabel(category) : "Creator";

  // Load existing item if editing
  useEffect(() => {
    async function loadItem() {
      if (!id) return;

      try {
        setLoading(true);
        const item = await getContentItemById(parseInt(id, 10));
        if (item) {
          // Load shared fields
          setTitle(item.title);
          setCategory(item.category);
          setCreator(item.creator || "");
          setYear(item.year?.toString() || "");
          setCover((item as any).cover || "");
          setLink((item as any).link || "");

          // Load category-specific fields
          setWordCount((item as any).wordCount?.toString() || "");
          setActors((item as any).actors || "");
          setType((item as any).type || "");
          setNumberOfEpisodes((item as any).numberOfEpisodes?.toString() || "");
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
      ...(cover.trim() && { cover: cover.trim() }),
      ...(link.trim() && { link: link.trim() }),
      ...(wordCount && { wordCount }),
      ...(actors.trim() && { actors: actors.trim() }),
      ...(type.trim() && { type: type.trim() }),
      ...(numberOfEpisodes && { numberOfEpisodes }),
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

      // Update existing item metadata including category-specific fields
      await updateContentItem(parseInt(id!, 10), {
        title: title.trim(),
        category,
        creator: creator.trim() || undefined,
        year: year ? parseInt(year, 10) : undefined,
        cover: cover.trim() || undefined,
        link: link.trim() || undefined,
        wordCount: wordCount ? parseInt(wordCount, 10) : undefined,
        actors: actors.trim() || undefined,
        type: type.trim() || undefined,
        numberOfEpisodes: numberOfEpisodes
          ? parseInt(numberOfEpisodes, 10)
          : undefined,
      } as any);

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

          {/* Creator/Author/Director/Host Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>{creatorLabel}</Text>
            <TextInput
              style={customEntryStyles.input}
              placeholder={`Enter ${creatorLabel.toLowerCase()}`}
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

          {/* Cover URL Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>Cover Image URL</Text>
            <View style={customEntryStyles.inputWithButton}>
              <TextInput
                style={customEntryStyles.inputWithClearButton}
                placeholder="Enter cover image URL"
                value={cover}
                onChangeText={setCover}
                autoCapitalize="none"
                keyboardType="url"
              />
              {cover.trim() !== "" && (
                <TouchableOpacity
                  onPress={() => setCover("")}
                  style={customEntryStyles.clearButton}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Link URL Input */}
          <View style={customEntryStyles.inputGroup}>
            <Text style={customEntryStyles.label}>External Link</Text>
            <View style={customEntryStyles.inputWithButton}>
              <TextInput
                style={customEntryStyles.inputWithClearButton}
                placeholder="Enter external link (e.g., IMDB)"
                value={link}
                onChangeText={setLink}
                autoCapitalize="none"
                keyboardType="url"
              />
              {link.trim() !== "" && (
                <TouchableOpacity
                  onPress={() => setLink("")}
                  style={customEntryStyles.clearButton}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category-specific fields */}
          {/* Book: Word Count */}
          {category === ContentCategory.BOOK && (
            <View style={customEntryStyles.inputGroup}>
              <Text style={customEntryStyles.label}>Word Count</Text>
              <TextInput
                style={customEntryStyles.input}
                placeholder="Enter word count"
                value={wordCount}
                onChangeText={setWordCount}
                keyboardType="numeric"
              />
            </View>
          )}

          {/* Movies, TV Shows, Reality Shows, Musicals: Actors and Type */}
          {(category === ContentCategory.MOVIE ||
            category === ContentCategory.TV_SHOW ||
            category === ContentCategory.REALITY_SHOW ||
            category === ContentCategory.MUSICAL) && (
            <>
              <View style={customEntryStyles.inputGroup}>
                <Text style={customEntryStyles.label}>Actors</Text>
                <TextInput
                  style={customEntryStyles.input}
                  placeholder="Enter actors"
                  value={actors}
                  onChangeText={setActors}
                />
              </View>

              <View style={customEntryStyles.inputGroup}>
                <Text style={customEntryStyles.label}>Type/Genre</Text>
                <TextInput
                  style={customEntryStyles.input}
                  placeholder="Enter type or genre"
                  value={type}
                  onChangeText={setType}
                />
              </View>
            </>
          )}

          {/* TV Shows, Reality Shows: Number of Episodes */}
          {(category === ContentCategory.TV_SHOW ||
            category === ContentCategory.REALITY_SHOW) && (
            <View style={customEntryStyles.inputGroup}>
              <Text style={customEntryStyles.label}>Number of Episodes</Text>
              <TextInput
                style={customEntryStyles.input}
                placeholder="Enter number of episodes"
                value={numberOfEpisodes}
                onChangeText={setNumberOfEpisodes}
                keyboardType="numeric"
              />
            </View>
          )}

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
            <Text
              style={[
                customEntryStyles.buttonText,
                customEntryStyles.cancelButtonText,
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
