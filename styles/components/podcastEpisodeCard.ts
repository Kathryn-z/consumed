import { StyleSheet } from "react-native";
import { spacing, colors } from "../common";

export const podcastEpisodeCardStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  episodeNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#007AFF",
  },
  date: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500",
  },
});
