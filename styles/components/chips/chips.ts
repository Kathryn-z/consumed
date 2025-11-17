import { StyleSheet } from "react-native";
import {
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "../../common";

export const statusRatingChipStyles = (
  style: "todo" | "done" | "rated",
  size: "small" | "medium" | "large"
) => {
  const sizeMap = {
    small: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: 13,
      borderRadius: 8,
    },
    medium: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 14,
      borderRadius: 12,
    },
    large: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      borderRadius: 20,
    },
  };
  const sizeInfo = sizeMap[size];

  const styleMap = {
    todo: {
      backgroundColor: colors.background.chipTodo,
      textColor: colors.text.chipTodo,
    },
    done: {
      backgroundColor: colors.background.chipDefault,
      textColor: colors.text.chipDone,
    },
    rated: {
      backgroundColor: colors.background.chipRating,
      textColor: colors.text.chipRating,
    },
  };
  const styleInfo = styleMap[style];

  return StyleSheet.create({
    container: {},
    content: {
      backgroundColor: styleInfo.backgroundColor,
      paddingVertical: sizeInfo.paddingVertical,
      paddingHorizontal: sizeInfo.paddingHorizontal,
      borderRadius: sizeInfo.borderRadius,
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    text: {
      color: styleInfo.textColor,
      fontSize: sizeInfo.fontSize,
      fontWeight: fontWeights.primary,
    },
  });
};

export const dateConsumedChipStyles = StyleSheet.create({
  container: {},
  content: {},
  text: {
    fontSize: fontSizes.infoPrimary,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
});

export const categoryChipStyles = StyleSheet.create({
  container: {},
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: borderWidths.default,
    borderColor: colors.border,
    borderRadius: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chipActive: {
    backgroundColor: colors.background.chipSelected,
    borderColor: colors.background.chipSelected,
  },
  text: {
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: fontWeights.secondary,
  },
  textActive: {
    color: colors.text.chipSelected,
    fontWeight: fontWeights.primary,
  },
});
