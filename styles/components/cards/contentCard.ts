import { StyleSheet } from "react-native";
import { cardStyles, imageStyles, spacing } from "../../common";

export const contentCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
