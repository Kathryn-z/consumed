import { StyleSheet } from "react-native";
import { colors, pageStyles, spacing } from "../common";

export const searchInsertStyles = StyleSheet.create({
  ...pageStyles,
  noResultsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
});
