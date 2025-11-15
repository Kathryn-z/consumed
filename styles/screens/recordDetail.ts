import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const recordDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  infoBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  contentCard: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  coverImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  coverPlaceholder: {
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  coverPlaceholderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#999",
  },
  contentInfo: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  meta: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  statusContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  statusButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#E8D4F8",
  },
  statusButtonText: {
    fontSize: 13,
    color: "#9C27B0",
    fontWeight: "500",
  },
});
