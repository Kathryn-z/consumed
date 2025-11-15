import { ContentCard } from "@/components/ContentCard";
import { useContent } from "@/hooks/useContent";
import { searchRecordsStyles } from "@/styles/screens/searchRecords";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchRecords() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Load all items (both done and todo)
  const { items, loading } = useContent();

  // Reset search when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Cleanup when screen loses focus
        setSearchQuery("");
      };
    }, [])
  );

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

  const handleItemPress = (item: any) => {
    router.push(`/contentDetail/${item.id}`);
  };

  return (
    <View style={searchRecordsStyles.container}>
      <ScrollView style={searchRecordsStyles.content}>
        {/* Search Bar */}
        <View style={searchRecordsStyles.searchBarContainer}>
          <TextInput
            style={searchRecordsStyles.searchBar}
            placeholder="Search by title, creator, or category..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoFocus
          />
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
              <ContentCard item={item} onPress={handleItemPress} />
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
    </View>
  );
}
