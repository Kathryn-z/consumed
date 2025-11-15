import { CATEGORIES, ContentCategory } from "@/types/content";
import { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { categorySelectionModalStyles } from "@/styles/components/modals/categorySelectionModal";

interface CategorySelectionModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSelectCategory: (category: ContentCategory) => void;
}

export function CategorySelectionModal({
  visible,
  onDismiss,
  onSelectCategory,
}: CategorySelectionModalProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Animate modal slide-up when shown
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  const handleCategorySelect = (category: ContentCategory) => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onSelectCategory(category);
    });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleDismiss}
      statusBarTranslucent={false}
    >
      <TouchableOpacity
        style={categorySelectionModalStyles.modalOverlay}
        activeOpacity={1}
        onPress={handleDismiss}
      >
        <Animated.View
          style={[
            categorySelectionModalStyles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={categorySelectionModalStyles.modalTitle}>
              Select Category
            </Text>
            <View style={categorySelectionModalStyles.categoryButtons}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={categorySelectionModalStyles.categoryButton}
                  onPress={() => handleCategorySelect(category)}
                  activeOpacity={0.8}
                >
                  <Text style={categorySelectionModalStyles.categoryButtonText}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={categorySelectionModalStyles.modalCancelButton}
              onPress={handleDismiss}
              activeOpacity={0.8}
            >
              <Text style={categorySelectionModalStyles.modalCancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
