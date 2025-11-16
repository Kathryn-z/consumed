import {
  CategorySelectionButton,
  CategorySelectionCancelButton,
} from "@/components/modals/categorySelectionModal/CategorySelectionButton";
import { modalStyles } from "@/styles/common";
import { CATEGORIES, ContentCategory } from "@/types/content";
import { useEffect, useRef } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";

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
        style={modalStyles.modalOverlay}
        activeOpacity={1}
        onPress={handleDismiss}
      >
        <Animated.View
          style={[
            modalStyles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={modalStyles.modalTitle}>Select Category</Text>
            <View>
              {CATEGORIES.map((category) => (
                <CategorySelectionButton
                  key={category}
                  category={category}
                  handleCategorySelect={handleCategorySelect}
                />
              ))}
            </View>
            <CategorySelectionCancelButton handleDismiss={handleDismiss} />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
