import { bottomMenuModalStyles } from "@/styles/components/modals/bottomMenuModal";
import { useEffect, useRef } from "react";
import { Animated, Modal, Text, TouchableOpacity } from "react-native";

export interface MenuOption {
  icon: string;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface BottomMenuModalProps {
  visible: boolean;
  onDismiss: () => void;
  options: MenuOption[];
}

export function BottomMenuModal({
  visible,
  onDismiss,
  options,
}: BottomMenuModalProps) {
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
      slideAnim.setValue(300);
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
        style={bottomMenuModalStyles.modalOverlay}
        activeOpacity={1}
        onPress={handleDismiss}
      >
        <Animated.View
          style={[
            bottomMenuModalStyles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={bottomMenuModalStyles.menuItem}
                onPress={option.onPress}
                activeOpacity={0.8}
              >
                <Text style={bottomMenuModalStyles.menuIcon}>
                  {option.icon}
                </Text>
                <Text
                  style={[
                    bottomMenuModalStyles.menuText,
                    option.isDestructive && bottomMenuModalStyles.deleteText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}
