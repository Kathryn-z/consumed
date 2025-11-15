import PrimaryButton from "@/components/buttons/PrimaryButton";
import { getContentItemById, updateContentItem } from "@/db/contentOperations";
import { contentInfoStyles } from "@/styles/screens/contentInfo";
import { ContentCategory, DramaSubtype, TVMovieSubtype } from "@/types/content";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContentInfo() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; category?: string }>();
  const { id } = params;
  // Shared fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ContentCategory | null>(
    params.category ? (params.category as ContentCategory) : null
  );
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState("");
  const [link, setLink] = useState("");

  // Book fields
  const [author, setAuthor] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [tags, setTags] = useState("");

  // TV/Movie fields
  const [tvMovieSubtype, setTvMovieSubtype] = useState<TVMovieSubtype | null>(
    null
  );
  const [directors, setDirectors] = useState("");
  const [casts, setCasts] = useState("");
  const [genres, setGenres] = useState("");
  const [episodesCount, setEpisodesCount] = useState("");
  const [countries, setCountries] = useState("");

  // Drama fields
  const [dramaSubtype, setDramaSubtype] = useState<DramaSubtype | null>(null);
  const [dramaDirectors, setDramaDirectors] = useState("");
  const [dramaCasts, setDramaCasts] = useState("");
  const [performers, setPerformers] = useState("");
  const [venue, setVenue] = useState("");
  const [duration, setDuration] = useState("");

  // Podcast fields
  const [hosts, setHosts] = useState("");

  const isEditing = !!id;

  // Load existing item if editing
  useEffect(() => {
    async function loadItem() {
      if (!id) return;

      try {
        setLoading(true);
        const item = await getContentItemById(parseInt(id, 10));
        if (item) {
          const itemAny = item as any;

          // Load shared fields
          setTitle(item.title);
          setCategory(item.category);
          setYear(item.year?.toString() || "");
          setLink(item.link || "");

          // Load images (handle JSON or plain string)
          if (item.images) {
            try {
              const imagesObj = JSON.parse(item.images);
              setImages(
                imagesObj.medium || imagesObj.large || imagesObj.small || ""
              );
            } catch {
              setImages(item.images);
            }
          } else {
            // Fall back to legacy fields
            setImages(itemAny.cover || itemAny.coverImage || "");
          }

          // Load category-specific fields
          if (item.category === ContentCategory.BOOK) {
            setAuthor(itemAny.author || "");
            setWordCount(itemAny.wordCount?.toString() || "");
            setTags(itemAny.tags || "");
          } else if (item.category === ContentCategory.TV_MOVIE) {
            setTvMovieSubtype(itemAny.subtype || null);
            setDirectors(itemAny.directors || "");
            setCasts(itemAny.casts || "");
            setGenres(itemAny.genres || "");
            setEpisodesCount(itemAny.episodesCount?.toString() || "");
            setCountries(itemAny.countries || "");
          } else if (item.category === ContentCategory.PODCAST) {
            setHosts(itemAny.hosts || itemAny.creator || "");
            setEpisodesCount(itemAny.episodesCount?.toString() || "");
          } else if (item.category === ContentCategory.DRAMA) {
            setDramaSubtype(itemAny.subtype || null);
            setDramaDirectors(itemAny.directors || itemAny.creator || "");
            setDramaCasts(itemAny.casts || "");
            setPerformers(itemAny.performers || "");
            setVenue(itemAny.venue || "");
            setDuration(itemAny.duration?.toString() || "");
          }
        }
      } catch (error) {
        console.error("Error loading item:", error);
        Alert.alert("Error", "Failed to load item");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const handleNext = () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    // Validate category-specific required fields
    if (category === ContentCategory.TV_MOVIE && !tvMovieSubtype) {
      Alert.alert("Error", "Please select TV or Movie");
      return;
    }
    if (category === ContentCategory.DRAMA && !dramaSubtype) {
      Alert.alert("Error", "Please select Drama subtype");
      return;
    }

    // Build params object based on category
    const baseParams: any = {
      title: title.trim(),
      category,
      ...(year && { year }),
      ...(images.trim() && { images: images.trim() }),
      ...(link.trim() && { link: link.trim() }),
    };

    // Add category-specific fields
    if (category === ContentCategory.BOOK) {
      if (author.trim()) baseParams.author = author.trim();
      if (wordCount) baseParams.wordCount = wordCount;
      if (tags.trim()) baseParams.tags = tags.trim();
    } else if (category === ContentCategory.TV_MOVIE) {
      baseParams.subtype = tvMovieSubtype;
      if (directors.trim()) baseParams.directors = directors.trim();
      if (casts.trim()) baseParams.casts = casts.trim();
      if (genres.trim()) baseParams.genres = genres.trim();
      if (episodesCount) baseParams.episodesCount = episodesCount;
      if (countries.trim()) baseParams.countries = countries.trim();
    } else if (category === ContentCategory.PODCAST) {
      if (hosts.trim()) baseParams.hosts = hosts.trim();
      if (episodesCount) baseParams.episodesCount = episodesCount;
    } else if (category === ContentCategory.DRAMA) {
      baseParams.subtype = dramaSubtype;
      if (dramaDirectors.trim()) baseParams.directors = dramaDirectors.trim();
      if (dramaCasts.trim()) baseParams.casts = dramaCasts.trim();
      if (performers.trim()) baseParams.performers = performers.trim();
      if (venue.trim()) baseParams.venue = venue.trim();
      if (duration) baseParams.duration = duration;
    }

    const params = new URLSearchParams(baseParams);
    router.push(`/recordInfo?${params.toString()}`);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    // Validate category-specific required fields
    if (category === ContentCategory.TV_MOVIE && !tvMovieSubtype) {
      Alert.alert("Error", "Please select TV or Movie");
      return;
    }
    if (category === ContentCategory.DRAMA && !dramaSubtype) {
      Alert.alert("Error", "Please select Drama subtype");
      return;
    }

    try {
      setSaving(true);

      // Build update object based on category
      const updates: any = {
        title: title.trim(),
        category,
        year: year ? parseInt(year, 10) : undefined,
        images: images.trim() || undefined,
        link: link.trim() || undefined,
      };

      // Add category-specific fields
      if (category === ContentCategory.BOOK) {
        updates.author = author.trim() || undefined;
        updates.wordCount = wordCount ? parseInt(wordCount, 10) : undefined;
        updates.tags = tags.trim() || undefined;
      } else if (category === ContentCategory.TV_MOVIE) {
        updates.subtype = tvMovieSubtype;
        updates.directors = directors.trim() || undefined;
        updates.casts = casts.trim() || undefined;
        updates.genres = genres.trim() || undefined;
        updates.episodesCount = episodesCount
          ? parseInt(episodesCount, 10)
          : undefined;
        updates.countries = countries.trim() || undefined;
      } else if (category === ContentCategory.PODCAST) {
        updates.hosts = hosts.trim() || undefined;
        updates.episodesCount = episodesCount
          ? parseInt(episodesCount, 10)
          : undefined;
      } else if (category === ContentCategory.DRAMA) {
        updates.subtype = dramaSubtype;
        updates.directors = dramaDirectors.trim() || undefined;
        updates.casts = dramaCasts.trim() || undefined;
        updates.performers = performers.trim() || undefined;
        updates.venue = venue.trim() || undefined;
        updates.duration = duration ? parseInt(duration, 10) : undefined;
      }

      await updateContentItem(parseInt(id!, 10), updates);

      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update entry. Please try again.");
      console.error("Error saving entry:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={contentInfoStyles.container}>
      <ScrollView
        style={contentInfoStyles.content}
        contentContainerStyle={contentInfoStyles.scrollContent}
      >
        <View style={contentInfoStyles.formContainer}>
          {/* Title Input */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>Title *</Text>
            <TextInput
              style={contentInfoStyles.input}
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Author Input - only for Book */}
          {category === ContentCategory.BOOK && (
            <View style={contentInfoStyles.inputGroup}>
              <Text style={contentInfoStyles.label}>Author</Text>
              <TextInput
                style={contentInfoStyles.input}
                placeholder="Enter author"
                value={author}
                onChangeText={setAuthor}
              />
            </View>
          )}

          {/* Year Input */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>Year</Text>
            <TextInput
              style={contentInfoStyles.input}
              placeholder="Enter year"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
            />
          </View>

          {/* Cover URL Input */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>Cover Image URL</Text>
            <View style={contentInfoStyles.inputWithButton}>
              <TextInput
                style={contentInfoStyles.inputWithClearButton}
                placeholder="Enter cover image URL"
                value={images}
                onChangeText={setImages}
                autoCapitalize="none"
                keyboardType="url"
              />
              {images.trim() !== "" && (
                <TouchableOpacity
                  onPress={() => setImages("")}
                  style={contentInfoStyles.clearButton}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Link URL Input */}
          <View style={contentInfoStyles.inputGroup}>
            <Text style={contentInfoStyles.label}>External Link</Text>
            <View style={contentInfoStyles.inputWithButton}>
              <TextInput
                style={contentInfoStyles.inputWithClearButton}
                placeholder="Enter external link (e.g., IMDB)"
                value={link}
                onChangeText={setLink}
                autoCapitalize="none"
                keyboardType="url"
              />
              {link.trim() !== "" && (
                <TouchableOpacity
                  onPress={() => setLink("")}
                  style={contentInfoStyles.clearButton}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category-specific fields */}

          {/* Book fields */}
          {category === ContentCategory.BOOK && (
            <>
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Word Count</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter word count"
                  value={wordCount}
                  onChangeText={setWordCount}
                  keyboardType="numeric"
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Tags</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter tags (comma-separated)"
                  value={tags}
                  onChangeText={setTags}
                />
              </View>
            </>
          )}

          {/* TV/Movie fields */}
          {category === ContentCategory.TV_MOVIE && (
            <>
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Type *</Text>
                <View style={contentInfoStyles.filterContainer}>
                  {Object.values(TVMovieSubtype).map((subtype) => (
                    <TouchableOpacity
                      key={subtype}
                      style={[
                        contentInfoStyles.chip,
                        tvMovieSubtype === subtype &&
                          contentInfoStyles.chipActive,
                      ]}
                      onPress={() => setTvMovieSubtype(subtype)}
                    >
                      <Text
                        style={[
                          contentInfoStyles.chipText,
                          tvMovieSubtype === subtype &&
                            contentInfoStyles.chipTextActive,
                        ]}
                      >
                        {subtype}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Directors</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter directors (comma-separated)"
                  value={directors}
                  onChangeText={setDirectors}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Cast</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter cast members (comma-separated)"
                  value={casts}
                  onChangeText={setCasts}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Genres</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter genres (comma-separated)"
                  value={genres}
                  onChangeText={setGenres}
                />
              </View>

              {tvMovieSubtype === TVMovieSubtype.TV && (
                <View style={contentInfoStyles.inputGroup}>
                  <Text style={contentInfoStyles.label}>Episodes Count</Text>
                  <TextInput
                    style={contentInfoStyles.input}
                    placeholder="Enter number of episodes"
                    value={episodesCount}
                    onChangeText={setEpisodesCount}
                    keyboardType="numeric"
                  />
                </View>
              )}

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Countries</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter countries (comma-separated)"
                  value={countries}
                  onChangeText={setCountries}
                />
              </View>
            </>
          )}

          {/* Podcast fields */}
          {category === ContentCategory.PODCAST && (
            <>
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Hosts</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter hosts (comma-separated)"
                  value={hosts}
                  onChangeText={setHosts}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Episodes Count</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter number of episodes"
                  value={episodesCount}
                  onChangeText={setEpisodesCount}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          {/* Drama fields */}
          {category === ContentCategory.DRAMA && (
            <>
              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Type *</Text>
                <View style={contentInfoStyles.filterContainer}>
                  {Object.values(DramaSubtype).map((subtype) => (
                    <TouchableOpacity
                      key={subtype}
                      style={[
                        contentInfoStyles.chip,
                        dramaSubtype === subtype &&
                          contentInfoStyles.chipActive,
                      ]}
                      onPress={() => setDramaSubtype(subtype)}
                    >
                      <Text
                        style={[
                          contentInfoStyles.chipText,
                          dramaSubtype === subtype &&
                            contentInfoStyles.chipTextActive,
                        ]}
                      >
                        {subtype}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Directors</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter directors (comma-separated)"
                  value={dramaDirectors}
                  onChangeText={setDramaDirectors}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Cast</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter cast members (comma-separated)"
                  value={dramaCasts}
                  onChangeText={setDramaCasts}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Performers</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter performers"
                  value={performers}
                  onChangeText={setPerformers}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Venue</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter venue/theater"
                  value={venue}
                  onChangeText={setVenue}
                />
              </View>

              <View style={contentInfoStyles.inputGroup}>
                <Text style={contentInfoStyles.label}>Duration (minutes)</Text>
                <TextInput
                  style={contentInfoStyles.input}
                  placeholder="Enter duration in minutes"
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          {/* Save Button (for editing) */}
          {isEditing && (
            <PrimaryButton
              text="Save"
              loadingText="Saving..."
              loading={saving}
              onPress={handleSave}
            />
          )}

          {/* Next Button (for new entry) */}
          {!isEditing && <PrimaryButton text="Next" onPress={handleNext} />}

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
