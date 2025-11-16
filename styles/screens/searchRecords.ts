import { StyleSheet } from "react-native";
import { colors, spacing } from "../common";

export const searchRecordsStyles = StyleSheet.create({
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  listContent: {
    paddingBottom: spacing.md,
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
});
