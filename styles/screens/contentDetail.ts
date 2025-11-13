import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const contentDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginBottom: spacing.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#999",
  },
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
  notesSection: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  notes: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    backgroundColor: "#f5f5f5",
    padding: spacing.md,
    borderRadius: 8,
  },
});
