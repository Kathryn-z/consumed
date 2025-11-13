import { searchStyles } from "@/styles/screens/search";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    // TODO: Implement actual search logic
    console.log("Searching for:", searchQuery);
    // For now, set empty results to show the "no results" message
    setSearchResults([]);
  };

  const handleCustomEntry = () => {
    router.push("/customEntry");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={searchStyles.container}>
      <ScrollView style={searchStyles.content}>
        {/* Search Bar with Cancel Button */}
        <View style={searchStyles.searchBarContainer}>
          <TextInput
            style={searchStyles.searchBar}
            placeholder="Search for content..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={searchStyles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={searchStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Search Results Area */}
        <View style={searchStyles.resultsContainer}>
          {searchResults.length > 0 ? (
            // TODO: Display search results here
            <Text>Results will appear here</Text>
          ) : (
            <View style={searchStyles.noResultsContainer}>
              <Text style={searchStyles.noResultsText}>
                If there is no content in the search result, you can try custom entry.
              </Text>
              <TouchableOpacity
                style={searchStyles.customEntryButton}
                onPress={handleCustomEntry}
                activeOpacity={0.8}
              >
                <Text style={searchStyles.customEntryButtonText}>
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
