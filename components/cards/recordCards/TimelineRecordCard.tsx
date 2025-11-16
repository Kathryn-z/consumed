import { RecordCard } from "@/components/cards/recordCards/RecordCard";
import { timelineRecordCardStyles } from "@/styles/components/cards/timelineRecordCard";
import { ConsumptionRecord } from "@/types/consumptionRecord";
import { formatDate } from "@/utils/dateFormat";
import { Text, View } from "react-native";

interface TimelineRecordCardProps {
  record: ConsumptionRecord;
  onPress?: (record: ConsumptionRecord) => void;
}

export function TimelineRecordCard({
  record,
  onPress,
}: TimelineRecordCardProps) {
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
