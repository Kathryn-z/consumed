import { TimelineRecordCard } from "@/components/cards/recordCards/TimelineRecordCard";
import { useRecords } from "@/hooks/useRecords";
import { indexStyles } from "@/styles/screens/index";
import { recordsStyles } from "@/styles/screens/records";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Records() {
  const router = useRouter();
  const { records, loading, refresh } = useRecords();

  // Refresh when screen comes into focus (e.g., after deleting a record)
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleRecordPress = (record: any) => {
    router.push(`/recordDetail/${record.id}`);
  };

  return (
    <SafeAreaView style={recordsStyles.container}>
      <View style={recordsStyles.content}>
        <Text style={recordsStyles.pageTitle}>My Records</Text>
        <Text style={recordsStyles.description}>
          View all your rated and recorded content.
        </Text>
        <ScrollView>
          {/* Content List */}
          {loading ? (
            <View style={indexStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : records.length > 0 ? (
            <FlatList
              data={records}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TimelineRecordCard record={item} onPress={handleRecordPress} />
              )}
              scrollEnabled={false}
              contentContainerStyle={indexStyles.listContent}
            />
          ) : (
            <View>
              <Text style={indexStyles.emptyText}>{"No records found"}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
