import { customEntryStyles } from "@/styles/screens/customEntry";
import { CATEGORIES, ContentCategory } from "@/types/content";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CustomEntry() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ContentCategory | null>(null);
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // TODO: Save the custom entry
    console.log("Saving custom entry:", { title, category, creator, year, notes });
    router.back();
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
            style={customEntryStyles.button}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={customEntryStyles.buttonText}>Save Entry</Text>
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
