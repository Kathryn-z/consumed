import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing } from "../../common";

export const searchedContentCardStyles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
