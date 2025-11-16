import { StyleSheet } from "react-native";
import { colors, commonStyles, spacing } from "../common";

export const searchInsertStyles = StyleSheet.create({
  ...commonStyles,
  categoryIndicator: {
    backgroundColor: colors.selected,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: spacing.md,
  },
  categoryIndicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },
  cancelButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.text.highlight,
    fontWeight: "500",
  },
  resultsContainer: {
    flex: 1,
    marginTop: spacing.md,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl * 2,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
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
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  resultInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resultArtist: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs / 2,
  },
  resultGenre: {
    fontSize: 13,
    color: colors.text.secondary,
    fontStyle: "italic",
    marginBottom: spacing.xs / 2,
  },
  resultMeta: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
});
