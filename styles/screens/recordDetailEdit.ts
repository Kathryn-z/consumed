import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const recordDetailEditStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  privacyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  privacyText: {
    fontSize: 14,
    color: "#007AFF",
  },
  contentCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  coverPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },
  coverPlaceholderIcon: {
    fontSize: 24,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 2,
  },
  contentCategory: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  editIcon: {
    padding: spacing.xs,
  },
  dateSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 15,
    color: colors.text.primary,
  },
  ratingSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  ratingButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  notesSection: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  notesInput: {
    fontSize: 15,
    color: colors.text.primary,
    textAlignVertical: "top",
    minHeight: 100,
  },
  notesPlaceholder: {
    fontSize: 15,
    color: "#C0C0C0",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    gap: spacing.md,
  },
  toolbarButton: {
    padding: spacing.xs,
  },
  collectionButton: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  collectionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
