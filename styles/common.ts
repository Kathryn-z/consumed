import { StyleSheet } from "react-native";

// Common colors
export const colors = {
  background: "#fff",
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
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
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
  longText: {
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
