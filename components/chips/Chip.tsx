import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

export interface ChipProps {
  label: string;
  styles: {
    container: {};
    content: {};
    text: {};
  };
  onPress?: () => void;
  extraStyle?: ViewStyle;
}

export default function Chip({
  label,
  styles,
  onPress,
  extraStyle,
}: ChipProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[styles.content, extraStyle]}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
