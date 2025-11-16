import { StyleSheet } from "react-native";
import { cardStyles, colors, spacing, textStyles } from "../../common";

export const podcastEpisodeCardStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  episodeNumber: {
    ...textStyles.highlightText,
  },
  date: {
    ...cardStyles.cardInfoSecondary,
  },
  title: {
    ...cardStyles.cardTitle,
  },
  description: {
    ...textStyles.longTextSecondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500",
  },
});
