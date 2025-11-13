import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { contentDetailStyles } from "@/styles/screens/contentDetail";
import { ContentItem } from "@/types/content";
import { getContentItemById } from "@/db/contentOperations";

export default function ContentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      if (!id) return;

      try {
        const contentItem = await getContentItemById(parseInt(id, 10));
        setItem(contentItem);
      } catch (error) {
        console.error("Error loading content item:", error);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={contentDetailStyles.container}>
        <View style={contentDetailStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={contentDetailStyles.container}>
        <View style={contentDetailStyles.errorContainer}>
          <Text style={contentDetailStyles.errorText}>Content not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={contentDetailStyles.container}>
      <ScrollView
        style={contentDetailStyles.content}
        contentContainerStyle={contentDetailStyles.scrollContent}
      >
        {/* Cover Image or Placeholder */}
        <View style={contentDetailStyles.imageContainer}>
          {item.coverImage ? (
            <Image
              source={{ uri: item.coverImage }}
              style={contentDetailStyles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={contentDetailStyles.placeholder}>
              <Text style={contentDetailStyles.placeholderText}>
                {item.category.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* Content Information */}
        <View style={contentDetailStyles.infoContainer}>
          {/* Title */}
          <Text style={contentDetailStyles.title}>{item.title}</Text>

          {/* Category */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Category:</Text>
            <Text style={contentDetailStyles.value}>{item.category}</Text>
          </View>

          {/* Creator */}
          {item.creator && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Creator:</Text>
              <Text style={contentDetailStyles.value}>{item.creator}</Text>
            </View>
          )}

          {/* Year */}
          {item.year && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Year:</Text>
              <Text style={contentDetailStyles.value}>{item.year}</Text>
            </View>
          )}

          {/* Status */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Status:</Text>
            <View style={[
              contentDetailStyles.statusBadge,
              item.status === 'done' ? contentDetailStyles.statusDone : contentDetailStyles.statusTodo
            ]}>
              <Text style={contentDetailStyles.statusText}>
                {item.status === 'done' ? 'Done' : 'To do'}
              </Text>
            </View>
          </View>

          {/* Date Added */}
          <View style={contentDetailStyles.row}>
            <Text style={contentDetailStyles.label}>Added:</Text>
            <Text style={contentDetailStyles.value}>{formatDate(item.dateAdded)}</Text>
          </View>

          {/* Date Consumed */}
          {item.dateConsumed && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Consumed:</Text>
              <Text style={contentDetailStyles.value}>{formatDate(item.dateConsumed)}</Text>
            </View>
          )}

          {/* Rating */}
          {item.rating !== undefined && item.rating !== null && (
            <View style={contentDetailStyles.row}>
              <Text style={contentDetailStyles.label}>Rating:</Text>
              <View style={contentDetailStyles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={contentDetailStyles.star}>
                    {star <= item.rating! ? '★' : '☆'}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Notes */}
          {item.notes && (
            <View style={contentDetailStyles.notesSection}>
              <Text style={contentDetailStyles.label}>Notes:</Text>
              <Text style={contentDetailStyles.notes}>{item.notes}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
