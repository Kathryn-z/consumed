import { StyleSheet } from "react-native";
import { cardStyles, spacing } from "../../common";

export const contentCardStyles = StyleSheet.create({
  ...cardStyles,
  info: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
});
