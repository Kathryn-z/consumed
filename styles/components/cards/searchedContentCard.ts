import { StyleSheet } from "react-native";
import { colors, spacing } from "../../common";

export const searchedContentCardStyles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  resultInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resultArtist: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs / 2,
  },
  resultGenre: {
    fontSize: 13,
    color: colors.text.secondary,
    fontStyle: "italic",
    marginBottom: spacing.xs / 2,
  },
  resultMeta: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
});
