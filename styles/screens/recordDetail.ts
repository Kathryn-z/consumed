import { StyleSheet } from "react-native";
import {
  cardStyles,
  chipStyles,
  colors,
  imageStyles,
  pageStyles,
  spacing,
  textStyles,
} from "../common";

export const recordDetailStyles = StyleSheet.create({
  container: {
    ...pageStyles.container,
  },
  scrollContent: {
    ...pageStyles.scrollContent,
  },
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
    ...imageStyles.imagePlaceholderText,
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
    ...chipStyles.dateChip,
  },
  dateText: {
    ...cardStyles.cardInfoPrimary,
  },
  statusContainer: {
    ...chipStyles.dateChip,
  },
  notesContainer: {
    ...chipStyles.dateChip,
  },
  notesText: {
    ...textStyles.longTextPrimary,
  },
});
