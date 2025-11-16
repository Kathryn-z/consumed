import { StyleSheet } from "react-native";
import { spacing, colors } from "../../common";

export const dateConsumedChipStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dateText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
