import { searchInsertStyles } from "@/styles/screens/searchInsert";
import { CATEGORIES, ContentCategory } from "@/types/content";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchInsert() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);

  const handleCategoryPress = (category: ContentCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAddContent = () => {
    router.push("/search");
  };

  return (
    <SafeAreaView style={searchInsertStyles.container}>
      <ScrollView style={searchInsertStyles.content}>
        <Text style={searchInsertStyles.title}>Home</Text>

        {/* Search Bar */}
        <TextInput
          style={searchInsertStyles.searchBar}
          placeholder="Search for content..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />

        {/* Category Filter Chips */}
        <View style={searchInsertStyles.filterContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                searchInsertStyles.chip,
                selectedCategory === category && searchInsertStyles.chipActive,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  searchInsertStyles.chipText,
                  selectedCategory === category && searchInsertStyles.chipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Results Area */}
        <View style={searchInsertStyles.searchResults}>
          {searchQuery ? (
            <Text style={searchInsertStyles.searchResultsText}>
              Search results for "{searchQuery}"
              {selectedCategory && ` in ${selectedCategory}`} will appear here
            </Text>
          ) : (
            <Text style={searchInsertStyles.searchResultsText}>
              Start typing to search for content
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={searchInsertStyles.fab}
        onPress={handleAddContent}
        activeOpacity={0.8}
      >
        <Text style={searchInsertStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
