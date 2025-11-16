import { StyleSheet } from "react-native";
import { colors, spacing } from "../../common";

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
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  monthDay: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  weekday: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  divider: {
    width: 2,
    backgroundColor: "#E0E0E0",
    marginRight: spacing.xs,
  },
  cardSection: {
    flex: 1,
  },
});
