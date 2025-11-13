import { useState, useMemo } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { searchRecordsStyles } from "@/styles/screens/searchRecords";
import { useContent } from "@/hooks/useContent";
import { ContentCard } from "@/components/ContentCard";

export default function SearchRecords() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Load all items (both done and todo)
  const { items, loading } = useContent();

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.creator?.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={searchRecordsStyles.container}>
      <ScrollView style={searchRecordsStyles.content}>
        <Text style={searchRecordsStyles.title}>Search Your Records</Text>

        {/* Search Bar with Cancel Button */}
        <View style={searchRecordsStyles.searchBarContainer}>
          <TextInput
            style={searchRecordsStyles.searchBar}
            placeholder="Search by title, creator, or category..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity
            style={searchRecordsStyles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={searchRecordsStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Search Results */}
        {loading ? (
          <View style={searchRecordsStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : searchQuery.trim() === "" ? (
          <View style={searchRecordsStyles.emptyContainer}>
            <Text style={searchRecordsStyles.emptyText}>
              Start typing to search your saved content
            </Text>
          </View>
        ) : filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentCard item={item} onPress={(item) => console.log("Pressed:", item.title)} />
            )}
            scrollEnabled={false}
            contentContainerStyle={searchRecordsStyles.listContent}
          />
        ) : (
          <View style={searchRecordsStyles.emptyContainer}>
            <Text style={searchRecordsStyles.emptyText}>
              No records found matching "{searchQuery}"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
