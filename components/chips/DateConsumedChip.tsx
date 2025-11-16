import { dateConsumedChipStyles } from "@/styles/components/chips/dateConsumedChip";
import { formatDateAndDayToString } from "@/utils/dateFormat";
import { Text, View } from "react-native";

interface DateConsumedChipProps {
  dateConsumed: string | Date;
}

export function DateConsumedChip({ dateConsumed }: DateConsumedChipProps) {
  return (
    <View style={dateConsumedChipStyles.container}>
      <Text style={dateConsumedChipStyles.dateText}>
        {formatDateAndDayToString(dateConsumed)}
      </Text>
    </View>
  );
}
