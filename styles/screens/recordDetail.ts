import { StyleSheet } from "react-native";
import { cardStyles, colors, pageStyles, spacing, textStyles } from "../common";

export const recordDetailStyles = StyleSheet.create({
  ...pageStyles,
  loadingContainer: {
    ...pageStyles.loadingContainer,
    backgroundColor: colors.background.page,
  },
  contentCard: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
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
  notesText: {
    ...textStyles.longTextPrimary,
  },
});
