import { StyleSheet } from "react-native";
import { pageStyles, spacing } from "../common";

export const searchRecordsStyles = StyleSheet.create({
  ...pageStyles,
  loadingContainer: {
    ...pageStyles.loadingContainer,
    paddingVertical: spacing.xl,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
});
