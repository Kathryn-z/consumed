import { RatingStatus } from "@/components/chips/StatusRatingChip";
import { StyleSheet } from "react-native";
import { chipStyles, colors } from "../../common";

type ColorSet = { bg: string; text: string };

export const STATUS_COLORS: Record<RatingStatus, ColorSet> = {
  todo: { bg: colors.background.chipTodo, text: colors.text.chipTodo },
  done: { bg: colors.background.chipDefault, text: colors.text.chipStatus },
  rated: { bg: colors.background.chipRating, text: colors.text.chipRating },
};

export const statusRatingChipStyles = (bgColor: string, textColor: string) =>
  StyleSheet.create({
    button: {
      ...chipStyles.chip,
      backgroundColor: bgColor,
    },
    text: {
      ...chipStyles.chipText,
      color: textColor,
    },
    ratingChip: {
      ...chipStyles.chip,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: bgColor,
      gap: 4,
    },
    ratingText: {
      ...chipStyles.chipBoldText,
      color: textColor,
    },
  });
