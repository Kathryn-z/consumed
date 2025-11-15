import { StyleSheet } from "react-native";
import { spacing, colors } from "../../common";

export const categorySelectionModalStyles = StyleSheet.create({
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
  categoryButtons: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryButton: {
    backgroundColor: "#f9f9f9",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.text.primary,
  },
  modalCancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancelButtonText: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.text.secondary,
  },
});
