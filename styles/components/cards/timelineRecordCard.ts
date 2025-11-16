import { StyleSheet } from "react-native";
import { cardStyles, colors, spacing } from "../../common";

export const timelineRecordCardStyles = StyleSheet.create({
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
  monthDay: {
    ...cardStyles.cardTitle,
  },
  weekday: {
    ...cardStyles.cardInfoPrimary,
  },
  divider: {
    width: 2,
    backgroundColor: "#E0E0E0",
    marginRight: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardSection: {
    flex: 1,
  },
});
