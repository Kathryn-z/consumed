import { dateConsumedChipStyles } from "@/styles/components/chips/chips";
import { formatDateAndDayToString } from "@/utils/dateFormat";
import Chip from "./Chip";

interface DateConsumedChipProps {
  dateConsumed: string | Date;
}

export function DateConsumedChip({ dateConsumed }: DateConsumedChipProps) {
  return (
    <Chip
      label={formatDateAndDayToString(dateConsumed)}
      styles={dateConsumedChipStyles}
      onPress={() => {}}
    />
  );
}
