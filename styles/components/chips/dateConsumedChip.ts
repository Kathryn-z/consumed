import { StyleSheet } from "react-native";
import { cardStyles, spacing } from "../../common";

export const dateConsumedChipStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dateText: {
    ...cardStyles.cardInfoPrimary,
    marginBottom: 0,
  },
});
