import { StyleSheet } from "react-native";
import { buttonStyles, modalStyles } from "../../common";

export const categorySelectionModalStyles = StyleSheet.create({
  ...modalStyles,
  categoryButtons: {
    ...buttonStyles.categoryButtonContainer,
  },
  categoryButton: {
    ...buttonStyles.categoryButton,
  },
  categoryButtonText: {
    ...buttonStyles.buttonText,
  },
  modalCancelButton: {
    ...buttonStyles.categoryCancelButton,
  },
  modalCancelButtonText: {
    ...buttonStyles.buttonTextSecondary,
  },
});
