import { StyleSheet } from "react-native";

// Common colors
export const colors = {
  background: {
    page: "#fff",
    cardContainerWhite: "#fff",
    cardContainerGrey: "#f9f9f9",
    button: "#fff",
    imageContainer: "#f0f0f0",
    imagePlaceholder: "#e0e0e0",
    chipDefault: "#d4d4d4ff",
    chipTodo: "#E8D4F8",
    chipRating: "#4CAF50",
  },
  text: {
    primary: "#000",
    secondary: "#666",
    tertiary: "#999",
    highlight: "#007AFF",
    dangerous: "#FF3B30",
    chipStatus: "#000",
    chipTodo: "#9C27B0",
    chipRating: "#fff",
  },
  border: "#ddd",
  shadow: "#000",
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

export const textStyles = StyleSheet.create({
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

export const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.page,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  scrollContent: {
    padding: spacing.sm,
    paddingBottom: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
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
});

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
});

export const cardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardContainerWithShadow: {
    flexDirection: "row",
    backgroundColor: colors.background.cardContainerWhite,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
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
});

export const chipStyles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  chipBoldText: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export const buttonStyles = StyleSheet.create({
  categoryButtonContainer: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryButton: {
    backgroundColor: colors.background.button,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryCancelButton: {
    backgroundColor: colors.background.button,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.text.primary,
  },
  buttonTextSecondary: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.text.primary,
  },
});

export const iconStyles = StyleSheet.create({
  menuIcon: {
    fontSize: 20,
  },
});

export const dividerStyles = StyleSheet.create({
  divider: {
    width: 2,
    backgroundColor: colors.background.imagePlaceholder,
    marginRight: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});
