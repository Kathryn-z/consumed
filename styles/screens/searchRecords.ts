import { StyleSheet } from "react-native";
import { pageStyles, spacing } from "../common";

export const searchRecordsStyles = StyleSheet.create({
  ...pageStyles,
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
  loadingContainer: {
    ...pageStyles.loadingContainer,
    paddingVertical: spacing.xl,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
});
