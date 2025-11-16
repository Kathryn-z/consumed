import { StyleSheet } from "react-native";
import { colors, commonStyles, pageStyles, spacing } from "../common";

export const searchInsertStyles = StyleSheet.create({
  ...commonStyles,
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
    ...pageStyles.loadingContainer,
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
});
