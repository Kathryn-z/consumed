import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { colors, pageStyles } from "@/styles/common";
import { JSX, default as React } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";

interface ScrollListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
}

export function ScrollList<T>({
  data,
  keyExtractor,
  renderItem,
}: ScrollListProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
}

export function Loading() {
  return (
    <View style={pageStyles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.selected} />
      <Text style={pageStyles.loadingText}>Loading...</Text>
    </View>
  );
}

interface ScrollListWrapperProps<T> {
  loading: boolean;
  error?: string | null;
  data: T[];
  renderItem: (props: { item: T }) => JSX.Element;
  keyExtractor: (item: T) => string;
  emptyMessage: string;
  onButtonPress?: () => void;
  buttonText?: string;
}

export function ScrollListWrapper<T>({
  loading,
  error,
  data,
  renderItem,
  keyExtractor,
  emptyMessage,
  onButtonPress,
  buttonText,
}: ScrollListWrapperProps<T>) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View>
        <Text style={pageStyles.emptyText}>{error}</Text>
        {onButtonPress && buttonText && (
          <PrimaryButton text={buttonText} onPress={onButtonPress} />
        )}
      </View>
    );
  }

  if (data.length > 0) {
    return (
      <ScrollList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  }

  return (
    <View>
      <Text style={pageStyles.emptyText}>{emptyMessage}</Text>
      {/* Only for searchInsert */}
      {onButtonPress && buttonText && (
        <PrimaryButton text={buttonText} onPress={onButtonPress} />
      )}
    </View>
  );
}
