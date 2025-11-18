import { ContentCard } from "@/components/cards/contentCards/ContentCard";
import CategoryChip from "@/components/chips/CategoryChip";
import { CategorySelectionModal } from "@/components/modals/categorySelectionModal/CategorySelectionModal";
import { ScrollListWrapper } from "@/components/shared/ScrollList";
import { TabHeader, TabItem, TabValue } from "@/components/shared/TabHeader";
import { useContent } from "@/hooks/useContent";
import { iconSizes } from "@/styles/common";
import { indexStyles } from "@/styles/screens/index";
import { CATEGORIES, ContentCategory, ContentStatus } from "@/types/content";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory | null>(null);
  const [activeTabLabel, setActiveTabLabel] = useState<string>(
    ContentStatus.DONE
  );
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Load items based on active tab
  const status =
    activeTabLabel === ContentStatus.DONE
      ? ContentStatus.DONE
      : ContentStatus.TODO;
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
    setCategoryModalVisible(true);
  };

  const handleCategorySelect = (category: ContentCategory) => {
    setCategoryModalVisible(false);
    router.push(`/searchInsert?category=${category}`);
  };

  const handleSearchRecords = () => {
    router.push("/searchRecords");
  };

  const handleItemPress = (item: any) => {
    router.push(`/contentDetail/${item.id}`);
  };

  const handleTabPress = (tabLabel: string) => {
    if (tabLabel === activeTabLabel) return;

    Animated.spring(animatedValue, {
      toValue: tabLabel === ContentStatus.DONE ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();

    setActiveTabLabel(tabLabel);
  };

  const tabs: TabItem[] = [
    { label: ContentStatus.DONE, value: TabValue.DONE },
    { label: ContentStatus.TODO, value: TabValue.TODO },
  ];

  return (
    <View style={indexStyles.container}>
      {/* Page Header */}
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={indexStyles.headerContainer}
      >
        <Text style={indexStyles.pageTitle}>Library</Text>
        {/* Search Icon */}
        <TouchableOpacity onPress={handleSearchRecords}>
          <EvilIcons name="search" size={iconSizes.header} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Tab Header */}
      <TabHeader
        tabs={tabs}
        activeTabLabel={activeTabLabel}
        onChange={(tabLabel) => {
          handleTabPress(tabLabel);
        }}
      />

      <View style={indexStyles.content}>
        {/* Category Filter Chips */}
        <View style={indexStyles.filterContainer}>
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              isActive={selectedCategory === category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>

        {/* Content List */}
        <ScrollListWrapper
          loading={loading}
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ContentCard item={item} onPress={handleItemPress} />
          )}
          emptyMessage={
            selectedCategory
              ? "No items found"
              : activeTabLabel === ContentStatus.DONE
                ? "No completed content yet"
                : "No items to do yet"
          }
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={indexStyles.fab}
        onPress={handleAddContent}
        activeOpacity={0.8}
      >
        <Text style={indexStyles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Category Selection Modal */}
      <CategorySelectionModal
        visible={categoryModalVisible}
        onDismiss={() => setCategoryModalVisible(false)}
        onSelectCategory={handleCategorySelect}
      />
    </View>
  );
}
