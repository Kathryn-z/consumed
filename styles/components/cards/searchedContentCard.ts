import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing } from "../../common";

export const searchedContentCardStyles = StyleSheet.create({
  resultItem: {
    ...cardStyles.cardContainerWithShadow,
  },
  resultImage: {
    ...imageStyles.imageContainerSquare,
  },
  resultInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  resultTitle: {
    ...cardStyles.cardTitle,
  },
  resultArtist: {
    ...cardStyles.cardInfoPrimary,
    marginBottom: spacing.xs / 2,
  },
  resultGenre: {
    ...cardStyles.cardInfoPrimary,
    fontStyle: "italic",
  },
  resultMeta: {
    ...cardStyles.cardInfoSecondary,
  },
});
