import { StyleSheet } from "react-native";
import { buttonStyles, modalStyles } from "../../common";

export const categorySelectionModalStyles = StyleSheet.create({
  modalOverlay: {
    ...modalStyles.modalOverlay,
  },
  modalContent: {
    ...modalStyles.modalContent,
  },
  modalTitle: {
    ...modalStyles.modalTitle,
  },
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
