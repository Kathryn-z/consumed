import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing } from "../../common";

export const contentCardStyles = StyleSheet.create({
  container: {
    ...cardStyles.cardContainerWithShadow,
  },
  imageContainer: {
    ...imageStyles.imageContainerLarge,
  },
  image: {
    ...imageStyles.imageSizePct,
  },
  placeholder: {
    ...imageStyles.imagePlaceholder,
  },
  placeholderText: {
    ...imageStyles.imagePlaceholderText,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  title: {
    ...cardStyles.cardTitle,
  },
  category: {
    ...cardStyles.category,
  },
  year: {
    ...cardStyles.cardInfoPrimary,
  },
  creator: {
    ...cardStyles.cardInfoPrimary,
  },
  date: {
    ...cardStyles.cardInfoSecondary,
  },
});
