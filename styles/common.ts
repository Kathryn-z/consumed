import { StyleSheet } from "react-native";

// Common colors
export const colors = {
  background: {
    page: "#fff",
    cardContainer: "#fff",
    imageContainer: "#f0f0f0",
    imagePlaceholder: "#e0e0e0",
  },
  text: {
    primary: "#000",
    secondary: "#666",
    tertiary: "#999",
    highlight: "#007AFF",
  },
  selected: "#007AFF",
};

// Common spacing
export const spacing = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

// Common reusable styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cardContainer,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  // Page Level
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold" as const,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
});

export const textStyles = StyleSheet.create({
  // Text
  longTextPrimary: {
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  longTextSecondary: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  highlightText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.highlight,
  },
});

export const imageStyles = StyleSheet.create({
  imageContainerLarge: {
    width: 80,
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.background.imageContainer,
  },
  imageContainerSmall: {
    width: 60,
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.background.imageContainer,
  },
  imageContainerSquare: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.background.imageContainer,
  },
  imageSizePct: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background.imagePlaceholder,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.tertiary,
  },
});

export const cardStyles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: 12,
    color: colors.text.highlight,
    fontWeight: "500",
    marginBottom: spacing.xs,
  },
  cardInfoPrimary: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  cardInfoSecondary: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});
