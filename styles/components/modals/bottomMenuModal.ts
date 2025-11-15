import { StyleSheet } from "react-native";
import { spacing, colors } from "../../common";

export const bottomMenuModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingTop: spacing.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.text.primary,
  },
  deleteText: {
    color: "#FF3B30",
  },
});
