import { StyleSheet } from "react-native";
import { pageStyles, spacing } from "../common";

export const profileStyles = StyleSheet.create({
  ...pageStyles,
  content: {
    ...pageStyles.content,
    padding: spacing.md,
  },
});
