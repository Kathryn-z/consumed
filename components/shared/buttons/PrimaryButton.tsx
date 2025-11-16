import { buttonStyles } from "@/styles/common";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

export default function PrimaryButton({
  onPress,
  text,
  loading = false,
  loadingText,
  disabled = false,
  buttonStyle,
  textStyle,
  activeOpacity = 0.8,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const displayText = loading && loadingText ? loadingText : text;

  return (
    <TouchableOpacity
      style={[
        buttonStyles.primaryButton,
        loading && { opacity: 0.6 },
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
    >
      <Text style={[buttonStyles.primaryButtonText, textStyle]}>
        {displayText}
      </Text>
    </TouchableOpacity>
  );
}
