import { StyleSheet } from "react-native";
import { colors, pageStyles, spacing } from "../common";

export const recordDetailEditStyles = StyleSheet.create({
  container: {
    ...pageStyles.container,
  },
  scrollContent: {
    ...pageStyles.scrollContent,
  },
  starsContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  notesInputContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  notesInput: {
    fontSize: 15,
    color: colors.text.primary,
    textAlignVertical: "top",
    minHeight: 100,
    padding: 0,
  },
  saveButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
