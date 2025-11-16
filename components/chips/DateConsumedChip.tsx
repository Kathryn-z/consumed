import { dateConsumedChipStyles } from "@/styles/components/chips/dateConsumedChip";
import { formatDateConsumed } from "@/utils/dateFormat";
import { Text, View } from "react-native";

interface DateConsumedChipProps {
  dateConsumed: string | Date;
}

export function DateConsumedChip({ dateConsumed }: DateConsumedChipProps) {
  return (
    <View style={dateConsumedChipStyles.container}>
      <Text style={dateConsumedChipStyles.dateText}>
        {formatDateConsumed(dateConsumed)}
      </Text>
    </View>
  );
}
