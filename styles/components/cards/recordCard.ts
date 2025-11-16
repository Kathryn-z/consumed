import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing, textStyles } from "../../common";

export const recordCardStyles = StyleSheet.create({
  ...imageStyles,
  ...cardStyles,
  topRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  notes: {
    ...textStyles.longTextSecondary,
  },
});
