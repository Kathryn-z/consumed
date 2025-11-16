import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing, textStyles } from "../../common";

export const recordCardStyles = StyleSheet.create({
  ...imageStyles,
  ...cardStyles,
  topRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  notes: {
    ...textStyles.longTextSecondary,
  },
});
