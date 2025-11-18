import { StyleSheet } from "react-native";
import { borderRadii, spacing } from "../common";

export const mySearchBarStyles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingHorizontal: 18,
    width: "100%",
    height: "6%",
  },
  searchBar: {
    // NEEDFIX
    backgroundColor: "#f5f5f5",
    borderRadius: borderRadii.lg,
    height: "100%",
    width: "100%",
  },
});
