import { searchInsertStyles } from "@/styles/screens/searchInsert";
import { ContentCategory } from "@/types/content";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchInsert() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const category = params.category as ContentCategory | undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Reset search when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Cleanup when screen loses focus
        setSearchQuery("");
        setSearchResults([]);
      };
    }, [])
  );

  const handleSearch = () => {
    // TODO: Implement actual search logic with category filter
    console.log("Searching for:", searchQuery, "in category:", category);
    // For now, set empty results to show the "no results" message
    setSearchResults([]);
  };

  const handleCustomEntry = () => {
    if (category) {
      router.push(`/customEntry?category=${category}`);
    } else {
      router.push("/customEntry");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={searchInsertStyles.container}>
      <ScrollView style={searchInsertStyles.content}>
        {/* Category Indicator */}
        {category && (
          <View style={searchInsertStyles.categoryIndicator}>
            <Text style={searchInsertStyles.categoryIndicatorText}>
              Searching in: {category}
            </Text>
          </View>
        )}

        {/* Search Bar with Cancel Button */}
        <View style={searchInsertStyles.searchBarContainer}>
          <TextInput
            style={searchInsertStyles.searchBar}
            placeholder={`Search for ${category || "content"}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={searchInsertStyles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={searchInsertStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Search Results Area */}
        <View style={searchInsertStyles.resultsContainer}>
          {searchResults.length > 0 ? (
            // TODO: Display search results here
            <Text>Results will appear here</Text>
          ) : (
            <View style={searchInsertStyles.noResultsContainer}>
              <Text style={searchInsertStyles.noResultsText}>
                If there is no content in the search result, you can try custom entry.
              </Text>
              <TouchableOpacity
                style={searchInsertStyles.customEntryButton}
                onPress={handleCustomEntry}
                activeOpacity={0.8}
              >
                <Text style={searchInsertStyles.customEntryButtonText}>
                  Enter Custom Entry
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
