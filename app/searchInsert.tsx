import { SearchedContentCard } from "@/components/cards/contentCards/SearchedContentCard";
import { SearchBar, SearchResultsWrapper } from "@/components/shared/Search";
import {
  ItunesPodcastResult,
  searchItunesPodcast,
} from "@/services/api/itunes";
import { pageStyles } from "@/styles/common";
import { ContentCategory } from "@/types/content";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

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
    <View style={pageStyles.container}>
      <View style={pageStyles.content}>
        {/* Search Bar */}
        <SearchBar
          placeholderText={`Search for ${category || "content"}...`}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        {/* Search Results */}
        <SearchResultsWrapper
          loading={searching}
          error={error}
          data={searchResults}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <SearchedContentCard result={item} onPress={handleResultPress} />
          )}
          emptyMessage="If there is no content in the search result, you can try custom entry."
          onButtonPress={handleContentInfo}
          buttonText="Enter Content Info"
        />
      </View>
    </View>
  );
}
