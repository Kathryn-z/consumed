import { StyleSheet } from "react-native";
import { cardStyles, colors, dividerStyles, spacing } from "../../common";

export const timelineRecordCardStyles = StyleSheet.create({
  ...cardStyles,
  container: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  dateSection: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: spacing.md,
    paddingRight: spacing.md,
    minWidth: 60,
  },
  year: {
    ...cardStyles.cardInfoPrimary,
    fontWeight: "600",
    color: colors.text.primary,
  },
  divider: {
    ...dividerStyles.divider,
  },
  cardSection: {
    flex: 1,
  },
});
