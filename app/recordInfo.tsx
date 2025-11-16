import PrimaryButton from "@/components/buttons/PrimaryButton";
import { contentInfoStyles } from "@/styles/screens/contentInfo";
import { ContentCategory, ContentStatus } from "@/types/content";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PodcastEpisodeSelector from "@/components/selectors/PodcastEpisodeSelector";
import { ItunesPodcastEpisode } from "@/services/api/itunes";

export default function RecordInfo() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title: string;
    category: string;
    year?: string;
    images?: string;
    link?: string;
    externalId?: string;
    // Book fields
    author?: string;
    wordCount?: string;
    tags?: string;
    // TV/Movie & Drama shared fields
    subtype?: string;
    directors?: string;
    casts?: string;
    genres?: string;
    episodesCount?: string;
    countries?: string;
    // Drama-specific fields
    performers?: string;
    venue?: string;
    duration?: string;
    // Podcast fields
    hosts?: string;
    feedUrl?: string;
  }>();

  const [status, setStatus] = useState<ContentStatus>(ContentStatus.TODO);
  const [rating, setRating] = useState(0);
  const [dateConsumed, setDateConsumed] = useState(new Date());
  const [selectedEpisode, setSelectedEpisode] = useState<ItunesPodcastEpisode | null>(null);

  const handleNext = () => {
    // Build URL params with all content data and consumption data
    const urlParams = new URLSearchParams({
      // Base content fields
      title: params.title,
      category: params.category,
      ...(params.year && { year: params.year }),
      ...(params.images && { images: params.images }),
      ...(params.link && { link: params.link }),
      ...(params.externalId && { externalId: params.externalId }),
      // Consumption record fields
      status,
      rating: rating.toString(),
      dateConsumed: dateConsumed.toISOString(),
    });

    // Add category-specific fields
    const category = params.category as ContentCategory;

    if (category === ContentCategory.BOOK) {
      if (params.author) urlParams.append("author", params.author);
      if (params.wordCount) urlParams.append("wordCount", params.wordCount);
      if (params.tags) urlParams.append("tags", params.tags);
    } else if (category === ContentCategory.TV_MOVIE) {
      if (params.subtype) urlParams.append("subtype", params.subtype);
      if (params.directors) urlParams.append("directors", params.directors);
      if (params.casts) urlParams.append("casts", params.casts);
      if (params.genres) urlParams.append("genres", params.genres);
      if (params.episodesCount) urlParams.append("episodesCount", params.episodesCount);
      if (params.countries) urlParams.append("countries", params.countries);
    } else if (category === ContentCategory.PODCAST) {
      if (params.hosts) urlParams.append("hosts", params.hosts);
      if (params.episodesCount) urlParams.append("episodesCount", params.episodesCount);
      if (params.genres) urlParams.append("genres", params.genres);
      if (params.feedUrl) urlParams.append("feedUrl", params.feedUrl);

      // Add selected episode data if available
      if (selectedEpisode) {
        urlParams.append("episodeData", JSON.stringify({
          trackId: selectedEpisode.trackId,
          trackName: selectedEpisode.trackName,
          trackNumber: selectedEpisode.trackNumber,
          description: selectedEpisode.description,
          releaseDate: selectedEpisode.releaseDate,
          trackTimeMillis: selectedEpisode.trackTimeMillis,
          episodeUrl: selectedEpisode.episodeUrl,
          episodeGuid: selectedEpisode.episodeGuid,
        }));
      }
    } else if (category === ContentCategory.DRAMA) {
      if (params.subtype) urlParams.append("subtype", params.subtype);
      if (params.directors) urlParams.append("directors", params.directors);
      if (params.casts) urlParams.append("casts", params.casts);
      if (params.performers) urlParams.append("performers", params.performers);
      if (params.venue) urlParams.append("venue", params.venue);
      if (params.duration) urlParams.append("duration", params.duration);
    }

    // Navigate to recordDetailEdit with all data
    router.push(`/recordDetailEdit/new?${urlParams.toString()}`);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starDisplay = rating >= i ? "★" : "☆";

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Text style={contentInfoStyles.star}>{starDisplay}</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={contentInfoStyles.container}>
      <ScrollView
        style={contentInfoStyles.content}
        contentContainerStyle={contentInfoStyles.scrollContent}
      >
        <View style={contentInfoStyles.formContainer}>
          {/* Status Selection */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>Status *</Text>
            <View style={contentInfoStyles.filterContainer}>
              <TouchableOpacity
                style={[
                  contentInfoStyles.chip,
                  status === ContentStatus.TODO && contentInfoStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.TODO)}
              >
                <Text
                  style={[
                    contentInfoStyles.chipText,
                    status === ContentStatus.TODO &&
                      contentInfoStyles.chipTextActive,
                  ]}
                >
                  To do
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  contentInfoStyles.chip,
                  status === ContentStatus.DONE && contentInfoStyles.chipActive,
                ]}
                onPress={() => setStatus(ContentStatus.DONE)}
              >
                <Text
                  style={[
                    contentInfoStyles.chipText,
                    status === ContentStatus.DONE &&
                      contentInfoStyles.chipTextActive,
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Podcast Episode Selector - only for podcasts with feedUrl */}
          {params.category === ContentCategory.PODCAST && params.externalId && params.feedUrl && (
            <View style={contentInfoStyles.inputGroup}>
              <PodcastEpisodeSelector
                podcastId={params.externalId}
                podcastTitle={params.title}
                feedUrl={params.feedUrl}
                onEpisodeSelect={setSelectedEpisode}
              />
            </View>
          )}

          {/* Show date consumed and rating only if status is DONE */}
          {status === ContentStatus.DONE && (
            <>
              {/* Date Consumed */}
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Date Consumed</Text>
                <DateTimePicker
                  value={dateConsumed}
                  mode="date"
                  display="default"
                  onChange={(_event, selectedDate) => {
                    if (selectedDate) {
                      setDateConsumed(selectedDate);
                    }
                  }}
                  style={{ alignSelf: "flex-start" }}
                />
              </View>

              {/* Rating */}
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Rating</Text>
                <View style={contentInfoStyles.ratingContainer}>
                  {renderStars()}
                </View>
              </View>
            </>
          )}

          {/* Next Button */}
          <PrimaryButton
            text="Next"
            onPress={handleNext}
          />

          {/* Cancel Button */}
          <PrimaryButton
            text="Cancel"
            onPress={handleCancel}
            buttonStyle={contentInfoStyles.cancelButton}
            textStyle={contentInfoStyles.cancelButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}
