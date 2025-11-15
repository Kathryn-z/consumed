import { contentInfoStyles } from "@/styles/screens/contentInfo";
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from "react-native";

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
        contentInfoStyles.button,
        loading && { opacity: 0.6 },
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
    >
      <Text style={[contentInfoStyles.buttonText, textStyle]}>
        {displayText}
      </Text>
    </TouchableOpacity>
  );
}
