import { TimelineRecordCard } from "@/components/cards/recordCards/TimelineRecordCard";
import { ScrollListWrapper } from "@/components/shared/ScrollList";
import { useRecords } from "@/hooks/useRecords";
import { recordsStyles } from "@/styles/screens/records";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";
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
    <View style={recordsStyles.container}>
      {/* header */}
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={recordsStyles.headerContainer}
      >
        <Text style={recordsStyles.pageTitle}>My Records</Text>
      </SafeAreaView>

      {/* Main Content */}
      <View style={recordsStyles.content}>
        <Text style={recordsStyles.description}>
          View all your rated and recorded content.
        </Text>

        {/* Content List */}
        <ScrollListWrapper
          loading={loading}
          data={records}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TimelineRecordCard record={item} onPress={handleRecordPress} />
          )}
          emptyMessage={"No records found"}
        />
      </View>
    </View>
  );
}
