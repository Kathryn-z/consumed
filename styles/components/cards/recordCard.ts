import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing, textStyles } from "../../common";

export const recordCardStyles = StyleSheet.create({
  container: {
    ...cardStyles.cardContainer,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  ...imageStyles,
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  title: {
    ...cardStyles.cardTitle,
  },
  categoryRow: {
    ...cardStyles.category,
  },
  notes: {
    ...textStyles.longTextSecondary,
  },
});
