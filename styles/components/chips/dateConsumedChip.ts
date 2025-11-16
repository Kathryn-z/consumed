import { StyleSheet } from "react-native";
import { commonStyles, spacing } from "../../common";

export const dateConsumedChipStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  dateText: {
    ...commonStyles.cardInfoPrimary,
    marginBottom: 0,
  },
});
