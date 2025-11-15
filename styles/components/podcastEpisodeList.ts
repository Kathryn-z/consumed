import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const podcastEpisodeListStyles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    padding: spacing.md,
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#d32f2f",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  showMoreButton: {
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});
