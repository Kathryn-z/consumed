import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { searchInsertStyles } from "@/styles/screens/searchInsert";
import { CATEGORIES, ContentCategory } from "@/types/content";

export default function SearchInsert() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);

  const handleCategoryPress = (category: ContentCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAddCustomEntry = () => {
    router.push("/customEntry");
  };

  return (
    <SafeAreaView style={searchInsertStyles.container}>
      <ScrollView style={searchInsertStyles.content}>
        <Text style={searchInsertStyles.title}>Search</Text>

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
        onPress={handleAddCustomEntry}
        activeOpacity={0.8}
      >
        <Text style={searchInsertStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
