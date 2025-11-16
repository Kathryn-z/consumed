import { StyleSheet } from "react-native";
import { cardStyles, colors, spacing, textStyles } from "../common";

export const recordDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.page,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.page,
  },
  infoBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  contentCard: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  coverImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  coverPlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  coverPlaceholderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#999",
  },
  contentInfo: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    ...cardStyles.cardTitle,
  },
  meta: {
    ...cardStyles.cardInfoPrimary,
    marginBottom: 0,
  },
  dateContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dateText: {
    ...cardStyles.cardInfoPrimary,
  },
  statusContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  notesContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  notesText: {
    ...textStyles.longTextPrimary,
  },
});
