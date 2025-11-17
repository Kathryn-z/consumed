import { categoryChipStyles } from "@/styles/components/chips/chips";
import React from "react";
import Chip from "./Chip";

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  label,
  isActive,
  onPress,
}: CategoryChipProps) {
  const styles = categoryChipStyles;

  return (
    <Chip
      label={label}
      onPress={onPress}
      styles={{
        container: styles.container,
        content: [styles.chip, isActive && styles.chipActive],
        text: [styles.text, isActive && styles.textActive],
      }}
    />
  );
}
