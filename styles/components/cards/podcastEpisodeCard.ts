import { StyleSheet } from "react-native";
import { cardStyles, colors, spacing, textStyles } from "../../common";

export const podcastEpisodeCardStyles = StyleSheet.create({
  ...cardStyles,
  container: {
    ...cardStyles.cardContainer,
    padding: spacing.md,
    backgroundColor: colors.background.cardContainerGrey,
  },
  episodeNumber: {
    ...textStyles.highlightText,
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
