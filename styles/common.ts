import { StyleSheet } from "react-native";

export const colors = {
  background: {
    page: "#fff",
    cardContainerWhite: "#fff",
    cardContainerGrey: "#f9f9f9",
    button: "#fff",
    cancelButton: "#f5f5f5",
    imageContainer: "#f0f0f0",
    imagePlaceholder: "#e0e0e0",
    chipDefault: "#d4d4d4ff",
    chipTodo: "#E8D4F8",
    chipRating: "#4CAF50",
    chipSelected: "#000",
  },
  text: {
    primary: "#000",
    secondary: "#666",
    tertiary: "#999",
    highlight: "#007AFF",
    dangerous: "#FF3B30",
    chipDone: "#000",
    chipTodo: "#9C27B0",
    chipRating: "#fff",
    chipSelected: "#fff",
    button: "#fff",
  },
  border: "#ddd",
  shadow: "#000",
  selected: "#007AFF",
};

export const spacing = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fontSizes = {
  imagePlaceHolder: 32,
  pageTitle: 24,
  modalTitle: 20,
  button: 17,
  primary: 16,
  infoPrimary: 14,
  chip: 13,
  infoSecondary: 12,
};

export const fontWeights = {
  bold: "700",
  primary: "600",
  secondary: "500",
} as const;

export const lineHeights = {
  longText: 20,
};

export const borderRadii = {
  sm: 8,
  md: 12,
  lg: 20,
};

export const borderWidths = {
  default: 1.5,
};

export const iconSizes = {
  header: 32,
};

export const textStyles = StyleSheet.create({
  longTextPrimary: {
    fontSize: fontSizes.infoPrimary,
    color: colors.text.primary,
    lineHeight: lineHeights.longText,
    marginBottom: spacing.xs,
  },
  longTextSecondary: {
    fontSize: fontSizes.infoPrimary,
    color: colors.text.secondary,
    lineHeight: lineHeights.longText,
    marginBottom: spacing.xs,
  },
  highlightText: {
    fontSize: fontSizes.infoSecondary,
    fontWeight: fontWeights.bold,
    color: colors.text.highlight,
  },
});

export const imageStyles = StyleSheet.create({
  imageContainerContentDetail: {
    width: "100%",
    height: 300,
    borderRadius: borderRadii.md,
    overflow: "hidden",
    backgroundColor: colors.background.imageContainer,
    marginBottom: spacing.md,
  },
  imageContainerLarge: {
    width: 80,
    height: 120,
    borderRadius: borderRadii.sm,
    overflow: "hidden",
    backgroundColor: colors.background.imageContainer,
  },
  imageContainerSmall: {
    width: 60,
    height: 90,
    borderRadius: borderRadii.sm,
    overflow: "hidden",
    backgroundColor: colors.background.imageContainer,
  },
  imageContainerSquare: {
    width: 80,
    height: 80,
    borderRadius: borderRadii.sm,
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
    fontSize: fontSizes.imagePlaceHolder,
    fontWeight: "bold",
    color: colors.text.tertiary,
  },
});

export const searchBarStyles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderWidth: borderWidths.default,
    borderColor: colors.border,
    borderRadius: borderRadii.lg,
    paddingHorizontal: spacing.md,
    fontSize: fontSizes.primary,
    backgroundColor: colors.background.cardContainerGrey,
  },
});

export const pageStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.background.page,
  },
  headerContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  scrollContent: {
    padding: spacing.xs,
    paddingBottom: spacing.lg,
  },
  // Text
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSizes.primary,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: fontSizes.primary,
    color: colors.text.secondary,
    textAlign: "center",
  },
  emptyText: {
    fontSize: fontSizes.primary,
    color: colors.text.secondary,
    textAlign: "center",
  },
  pageTitle: {
    fontSize: fontSizes.pageTitle,
    fontWeight: fontWeights.bold,
  },
  description: {
    fontSize: fontSizes.primary,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
});

export const modalStyles = StyleSheet.create({
  // Container
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  // Content
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: borderRadii.lg,
    borderTopRightRadius: borderRadii.lg,
    paddingBottom: 40,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  // Text
  modalTitle: {
    fontSize: fontSizes.modalTitle,
    fontWeight: fontWeights.primary,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
});

export const cardStyles = StyleSheet.create({
  // Container
  cardContainer: {
    borderRadius: borderRadii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardContainerWithShadow: {
    flexDirection: "row",
    backgroundColor: colors.background.cardContainerWhite,
    borderRadius: borderRadii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Content
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  // Text
  cardTitle: {
    fontSize: fontSizes.primary,
    fontWeight: fontWeights.primary,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: fontSizes.infoSecondary,
    color: colors.text.highlight,
    fontWeight: fontWeights.secondary,
    marginBottom: spacing.xs,
  },
  cardInfoPrimary: {
    fontSize: fontSizes.infoPrimary,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  cardInfoSecondary: {
    fontSize: fontSizes.infoSecondary,
    color: colors.text.tertiary,
  },
});

export const buttonStyles = StyleSheet.create({
  // Button
  categoryButton: {
    backgroundColor: colors.background.button,
    borderWidth: borderWidths.default,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadii.md,
    alignItems: "center",
  },
  categoryCancelButton: {
    backgroundColor: colors.background.button,
    borderWidth: borderWidths.default,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadii.md,
    alignItems: "center",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: borderWidths.default,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.selected,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  cancelButton: {
    backgroundColor: colors.background.cancelButton,
    marginTop: spacing.sm,
  },
  // Text
  primaryButtonText: {
    color: colors.text.button,
    fontSize: fontSizes.primary,
    fontWeight: fontWeights.primary,
  },
  cancelButtonText: {
    color: colors.text.primary,
  },
  buttonText: {
    fontSize: fontSizes.button,
    fontWeight: fontWeights.secondary,
    color: colors.text.primary,
  },
  buttonTextSecondary: {
    fontSize: fontSizes.button,
    fontWeight: fontWeights.secondary,
    color: colors.text.primary,
  },
});

export const iconStyles = StyleSheet.create({
  menuIcon: {
    fontSize: fontSizes.modalTitle,
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
