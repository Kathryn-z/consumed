import { StyleSheet } from "react-native";
import { chipStyles, colors } from "../../common";

export const statusRatingChipStyles = StyleSheet.create({
  statusButton: {
    ...chipStyles.chip,
    backgroundColor: colors.background.chipDefault,
  },
  statusButtonText: {
    ...chipStyles.chipText,
    color: colors.text.chipStatus,
  },
  todoButton: {
    ...chipStyles.chip,
    backgroundColor: colors.background.chipTodo,
  },
  todoButtonText: {
    ...chipStyles.chipText,
    color: colors.text.chipTodo,
  },
  ratingChip: {
    ...chipStyles.chip,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.chipRating,
    gap: 4,
  },
  ratingText: {
    ...chipStyles.chipBoldText,
    color: colors.text.chipRating,
  },
});
