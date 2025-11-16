import { StyleSheet } from "react-native";
import { pageStyles, spacing } from "../common";

export const recordsStyles = StyleSheet.create({
  ...pageStyles,
  content: {
    ...pageStyles.content,
    padding: spacing.md,
  },
});
