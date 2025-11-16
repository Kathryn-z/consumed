import { buttonStyles } from "@/styles/common";
import { ContentCategory } from "@/types/content";
import { Text, TouchableOpacity } from "react-native";

interface CategorySelectionButtonProps {
  category: ContentCategory;
  handleCategorySelect: (category: ContentCategory) => void;
}

interface CategorySelectionCancelButtonProps {
  handleDismiss: () => void;
}

export function CategorySelectionButton({
  category,
  handleCategorySelect,
}: CategorySelectionButtonProps) {
  return (
    <TouchableOpacity
      style={buttonStyles.categoryButton}
      onPress={() => handleCategorySelect(category)}
      activeOpacity={0.8}
    >
      <Text style={buttonStyles.buttonText}>{category}</Text>
    </TouchableOpacity>
  );
}

export function CategorySelectionCancelButton({
  handleDismiss,
}: CategorySelectionCancelButtonProps) {
  return (
    <TouchableOpacity
      style={buttonStyles.categoryCancelButton}
      onPress={handleDismiss}
      activeOpacity={0.8}
    >
      <Text style={buttonStyles.buttonTextSecondary}>Cancel</Text>
    </TouchableOpacity>
  );
}
