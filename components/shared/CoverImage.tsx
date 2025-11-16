import { imageStyles } from "@/styles/common";
import { Image } from "expo-image";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

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
      {showImage && coverUrl ? (
        <Image
          source={{ uri: coverUrl, cacheKey: coverUrl }}
          style={imageStyles.imageSizePct}
          contentFit="cover"
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
