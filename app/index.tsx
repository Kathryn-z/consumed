import { indexStyles } from "@/styles/screens/index";
import { CATEGORIES, ContentCategory } from "@/types/content";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "done" | "todo";

export default function SearchInsert() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("done");
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleCategoryPress = (category: ContentCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAddContent = () => {
    router.push("/search");
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
        <Text style={indexStyles.title}>Home</Text>

        {/* Tab Switcher */}
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

        {/* Search Bar */}
        <TextInput
          style={indexStyles.searchBar}
          placeholder="Search for content..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />

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

        {/* Search Results Area */}
        <View style={indexStyles.searchResults}>
          {searchQuery ? (
            <Text style={indexStyles.searchResultsText}>
              {activeTab === "done" ? "Done" : "To do"} results for "{searchQuery}"
              {selectedCategory && ` in ${selectedCategory}`} will appear here
            </Text>
          ) : (
            <Text style={indexStyles.searchResultsText}>
              {activeTab === "done"
                ? "Your completed content will appear here"
                : "Your to-do content will appear here"}
            </Text>
          )}
        </View>
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
