import { StyleSheet } from "react-native";
import { colors, pageStyles, spacing } from "../common";

export const contentDetailStyles = StyleSheet.create({
  ...pageStyles,
  infoContainer: {
    gap: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
    minWidth: 100,
  },
  value: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  statusDone: {
    backgroundColor: "#4CAF50",
  },
  statusTodo: {
    backgroundColor: "#FF9800",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
  },
  star: {
    fontSize: 20,
    color: "#FFD700",
  },
  historySection: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  historySectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  recordCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  recordStar: {
    fontSize: 16,
    color: "#FFD700",
  },
  recordNotes: {
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: "#f0f7ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.selected,
    alignSelf: "flex-start",
  },
  linkButtonText: {
    fontSize: 15,
    color: colors.text.highlight,
    fontWeight: "500",
  },
});
