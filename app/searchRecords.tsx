import { ContentCard } from "@/components/cards/contentCards/ContentCard";
import { MySearchBar } from "@/components/shared/MySearchBar";
import { ScrollListWrapper } from "@/components/shared/ScrollList";
import { useContent } from "@/hooks/useContent";
import { pageStyles } from "@/styles/common";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

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
    <View style={pageStyles.container}>
      {/* Search Bar */}
      <MySearchBar
        placeholderText="Search by title, creator, or category..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => {}}
      />

      <View style={pageStyles.content}>
        {/* Search Results */}
        <ScrollListWrapper
          loading={loading}
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ContentCard item={item} onPress={handleItemPress} />
          )}
          emptyMessage={"No records found"}
        />
      </View>
    </View>
  );
}
