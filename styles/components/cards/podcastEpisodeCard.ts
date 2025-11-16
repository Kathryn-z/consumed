import { StyleSheet } from "react-native";
import { cardStyles, colors, spacing, textStyles } from "../../common";

export const podcastEpisodeCardStyles = StyleSheet.create({
  container: {
    ...cardStyles.cardContainer,
    padding: spacing.md,
    backgroundColor: colors.background.cardContainerGrey,
  },
  header: {
    ...cardStyles.cardHeaderContainer,
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
