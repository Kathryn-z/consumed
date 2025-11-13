import { ContentCard } from "@/components/ContentCard";
import { useContent } from "@/hooks/useContent";
import { indexStyles } from "@/styles/screens/index";
import { CATEGORIES, ContentCategory, ContentStatus } from "@/types/content";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "done" | "todo";

export default function SearchInsert() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("done");
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Load items based on active tab
  const status = activeTab === "done" ? ContentStatus.DONE : ContentStatus.TODO;
  const { items, loading, refresh } = useContent(status);

  // Refresh when screen comes into focus (e.g., after adding an item)
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    return filtered;
  }, [items, selectedCategory]);

  const handleCategoryPress = (category: ContentCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAddContent = () => {
    router.push("/searchInsert");
  };

  const handleSearchRecords = () => {
    router.push("/searchRecords");
  };

  const handleItemPress = (item: any) => {
    router.push(`/contentDetail?id=${item.id}`);
  };

  const handleTabPress = (tab: TabType) => {
    if (tab === activeTab) return;

    Animated.spring(animatedValue, {
      toValue: tab === "done" ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();

    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={indexStyles.container}>
      <ScrollView style={indexStyles.content}>
        {/* Header with Tab Switcher and Search Icon */}
        <View style={indexStyles.header}>
          <View style={indexStyles.tabSwitcher}>
            <TouchableOpacity
              style={[
                indexStyles.tab,
                activeTab === "done" && indexStyles.tabActive,
              ]}
              onPress={() => handleTabPress("done")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  indexStyles.tabText,
                  activeTab === "done" && indexStyles.tabTextActive,
                ]}
              >
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                indexStyles.tab,
                activeTab === "todo" && indexStyles.tabActive,
              ]}
              onPress={() => handleTabPress("todo")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  indexStyles.tabText,
                  activeTab === "todo" && indexStyles.tabTextActive,
                ]}
              >
                To do
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Icon */}
          <TouchableOpacity
            style={indexStyles.searchIcon}
            onPress={handleSearchRecords}
            activeOpacity={0.7}
          >
            <Text style={indexStyles.searchIconText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter Chips */}
        <View style={indexStyles.filterContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                indexStyles.chip,
                selectedCategory === category && indexStyles.chipActive,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  indexStyles.chipText,
                  selectedCategory === category && indexStyles.chipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content List */}
        {loading ? (
          <View style={indexStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ContentCard item={item} onPress={handleItemPress} />
            )}
            scrollEnabled={false}
            contentContainerStyle={indexStyles.listContent}
          />
        ) : (
          <View style={indexStyles.emptyContainer}>
            <Text style={indexStyles.emptyText}>
              {selectedCategory
                ? "No items found"
                : activeTab === "done"
                ? "No completed content yet"
                : "No items to do yet"}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={indexStyles.fab}
        onPress={handleAddContent}
        activeOpacity={0.8}
      >
        <Text style={indexStyles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
