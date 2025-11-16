import PrimaryButton from "@/components/buttons/PrimaryButton";
import { SearchedContentCard } from "@/components/cards/contentCards/SearchedContentCard";
import {
  ItunesPodcastResult,
  searchItunesPodcast,
} from "@/services/api/itunes";
import { searchInsertStyles } from "@/styles/screens/searchInsert";
import { ContentCategory } from "@/types/content";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchInsert() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const category = params.category as ContentCategory | undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ItunesPodcastResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    if (category !== ContentCategory.PODCAST) {
      setError("Search is currently only supported for Podcast category");
      return;
    }

    try {
      setSearching(true);
      setError(null);
      const results = await searchItunesPodcast(searchQuery.trim());
      setSearchResults(results.results);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search. Please try again.");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleResultPress = (result: ItunesPodcastResult) => {
    // Extract year from releaseDate if available
    const year = result.releaseDate
      ? new Date(result.releaseDate).getFullYear().toString()
      : "";

    // Build the images object with standardized field names
    const images = {
      small: result.artworkUrl60 || result.artworkUrl30 || "",
      medium: result.artworkUrl100 || result.artworkUrl60 || "",
      large: result.artworkUrl600 || result.artworkUrl100 || "",
    };

    const params = new URLSearchParams({
      title: result.collectionName,
      category: ContentCategory.PODCAST,
      year: year,
      images: JSON.stringify(images),
      link: result.collectionViewUrl || "",
      externalId: result.trackId.toString(),
      hosts: result.artistName,
      genres: JSON.stringify(result.genres || []),
      feedUrl: result.feedUrl || "",
      episodesCount: result.trackCount?.toString() || "",
    });

    router.push(`/recordInfo?${params.toString()}`);
  };

  const handleContentInfo = () => {
    if (category) {
      router.push(`/contentInfo?category=${category}`);
    } else {
      router.push("/contentInfo");
    }
  };

  return (
    <View style={searchInsertStyles.container}>
      <ScrollView style={searchInsertStyles.content}>
        {/* Search Bar*/}
        <View style={searchInsertStyles.searchBarContainer}>
          <TextInput
            style={searchInsertStyles.searchBar}
            placeholder={`Search for ${category || "content"}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Search Results Area */}
        <View style={searchInsertStyles.resultsContainer}>
          {searching ? (
            <View style={searchInsertStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={searchInsertStyles.loadingText}>Searching...</Text>
            </View>
          ) : error ? (
            <View>
              <Text style={searchInsertStyles.errorText}>{error}</Text>
              <PrimaryButton
                text="Enter Content Info"
                onPress={handleContentInfo}
              />
            </View>
          ) : searchResults.length > 0 ? (
            <ScrollView>
              {searchResults.map((result) => (
                <SearchedContentCard
                  key={result.trackId}
                  result={result}
                  onPress={handleResultPress}
                />
              ))}
            </ScrollView>
          ) : (
            <View>
              <Text style={searchInsertStyles.noResultsText}>
                If there is no content in the search result, you can try custom
                entry.
              </Text>
              <PrimaryButton
                text="Enter Content Info"
                onPress={handleContentInfo}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
