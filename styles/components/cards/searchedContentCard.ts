import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing } from "../../common";

export const searchedContentCardStyles = StyleSheet.create({
  ...cardStyles,
  resultImage: {
    ...imageStyles.imageContainerSquare,
  },
  resultArtist: {
    ...cardStyles.cardInfoPrimary,
    marginBottom: spacing.xs / 2,
  },
  resultGenre: {
    ...cardStyles.cardInfoPrimary,
    fontStyle: "italic",
  },
});
