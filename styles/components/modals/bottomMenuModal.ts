import { StyleSheet } from "react-native";
import { buttonStyles, colors, iconStyles, modalStyles } from "../../common";

export const bottomMenuModalStyles = StyleSheet.create({
  modalOverlay: {
    ...modalStyles.modalOverlay,
  },
  menuContainer: {
    ...modalStyles.modalContent,
  },
  menuItem: {
    ...buttonStyles.menuButton,
  },
  menuIcon: {
    ...iconStyles.menuIcon,
  },
  menuText: {
    ...buttonStyles.buttonText,
  },
  deleteText: {
    color: colors.text.dangerous,
  },
});
