import { StyleSheet } from "react-native";
import { spacing } from "../../common";

export const statusRatingChipStyles = StyleSheet.create({
  statusButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#d4d4d4ff",
  },
  statusButtonText: {
    fontSize: 13,
    color: "#000000ff",
    fontWeight: "500",
  },
  todoButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#E8D4F8",
  },
  todoButtonText: {
    fontSize: 13,
    color: "#9C27B0",
    fontWeight: "500",
  },
  ratingChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  ratingStar: {
    fontSize: 13,
    color: "#FFFFFF",
  },
});
