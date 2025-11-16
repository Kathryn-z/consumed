import { StyleSheet } from "react-native";
import { cardStyles, chipStyles } from "../../common";

export const dateConsumedChipStyles = StyleSheet.create({
  container: {
    ...chipStyles.dateChip,
  },
  dateText: {
    ...cardStyles.cardInfoPrimary,
    marginBottom: 0,
  },
});
