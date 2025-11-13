import { StyleSheet } from "react-native";

// Common colors
export const colors = {
  background: "#fff",
  text: {
    primary: "#000",
    secondary: "#666",
  },
};

// Common spacing
export const spacing = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

// Common typography
export const typography = {
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
  },
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
  title: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.description,
    marginBottom: spacing.md,
  },
});
