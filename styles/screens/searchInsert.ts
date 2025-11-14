import { StyleSheet } from "react-native";
import { commonStyles, spacing, colors } from "../common";

export const searchInsertStyles = StyleSheet.create({
  ...commonStyles,
  categoryIndicator: {
    backgroundColor: "#007AFF",
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
    color: "#007AFF",
    fontWeight: "500",
  },
  resultsContainer: {
    flex: 1,
    marginTop: spacing.md,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  customEntryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  customEntryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
