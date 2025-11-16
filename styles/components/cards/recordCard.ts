import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing, textStyles } from "../../common";

export const recordCardStyles = StyleSheet.create({
  container: {
    ...cardStyles.cardContainer,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  imageContainer: {
    ...imageStyles.imageContainerSmall,
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
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  title: {
    ...cardStyles.cardTitle,
  },
  categoryRow: {
    ...cardStyles.category,
  },
  notes: {
    ...textStyles.longTextSecondary,
  },
});
