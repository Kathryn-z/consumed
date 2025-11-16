import { StyleSheet } from "react-native";
import { colors, pageStyles, spacing } from "../common";

export const searchInsertStyles = StyleSheet.create({
  ...pageStyles,
  resultsContainer: {
    flex: 1,
    marginTop: spacing.md,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
});
