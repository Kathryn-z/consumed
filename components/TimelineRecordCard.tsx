import { RecordCard } from "@/components/RecordCard";
import { timelineRecordCardStyles } from "@/styles/components/timelineRecordCard";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { Text, View } from "react-native";

interface TimelineRecordCardProps {
  record: ConsumptionRecord;
  onPress?: (record: ConsumptionRecord) => void;
}

export function TimelineRecordCard({
  record,
  onPress,
}: TimelineRecordCardProps) {
  // Format the date consumed
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      year: date.getFullYear(),
      monthDay: `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  const dateInfo = formatDate(record.dateConsumed);

  return (
    <View style={timelineRecordCardStyles.container}>
      {/* Left side: Date information */}
      <View style={timelineRecordCardStyles.dateSection}>
        <Text style={timelineRecordCardStyles.year}>{dateInfo.year}</Text>
        <Text style={timelineRecordCardStyles.monthDay}>
          {dateInfo.monthDay}
        </Text>
        <Text style={timelineRecordCardStyles.weekday}>{dateInfo.weekday}</Text>
      </View>

      {/* Divider */}
      <View style={timelineRecordCardStyles.divider} />

      {/* Right side: Record Card */}
      <View style={timelineRecordCardStyles.cardSection}>
        <RecordCard record={record} onPress={onPress} />
      </View>
    </View>
  );
}
