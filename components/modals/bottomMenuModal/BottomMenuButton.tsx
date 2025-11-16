import { MenuOption } from "@/components/modals/bottomMenuModal/BottomMenuModal";
import { buttonStyles, colors, iconStyles } from "@/styles/common";
import { Text, TouchableOpacity } from "react-native";

interface BottomMenuButtonProps {
  option: MenuOption;
}

export default function BottomMenuButton({ option }: BottomMenuButtonProps) {
  return (
    <TouchableOpacity
      style={buttonStyles.menuButton}
      onPress={option.onPress}
      activeOpacity={0.8}
    >
      <Text style={iconStyles.menuIcon}>{option.icon}</Text>
      <Text
        style={[
          buttonStyles.buttonText,
          option.isDestructive && { color: colors.text.dangerous },
        ]}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}
