import { StyleSheet } from "react-native";
import { commonStyles, spacing } from "../../common";

export const recordCardStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  imageContainer: {
    width: 60,
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#999",
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "flex-start",
  },
  title: {
    ...commonStyles.cardTitle,
  },
  categoryRow: {
    ...commonStyles.category,
  },
  notes: {
    ...commonStyles.longText,
  },
});
