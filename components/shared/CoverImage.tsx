import { imageStyles } from "@/styles/common";
import React from "react";
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";

interface CoverImageProps {
  coverUrl: string | undefined;
  category: string;
  showImage: boolean;
  setImageError: (val: boolean) => void;
  containerStyle: StyleProp<ViewStyle>;
}

export default function CoverImage({
  coverUrl,
  category,
  showImage,
  setImageError,
  containerStyle,
}: CoverImageProps) {
  return (
    <View style={containerStyle}>
      {showImage ? (
        <Image
          source={{ uri: coverUrl }}
          style={imageStyles.imageSizePct}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={imageStyles.imagePlaceholder}>
          <Text style={imageStyles.imagePlaceholderText}>
            {category.charAt(0)}
          </Text>
        </View>
      )}
    </View>
  );
}
