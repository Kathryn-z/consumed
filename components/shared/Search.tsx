import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { colors, pageStyles, searchBarStyles } from "@/styles/common";
import { JSX, default as React } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TextInput,
  View,
} from "react-native";

interface SearchBarProps {
  placeholderText: string;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  handleSearch: () => void;
}

export function SearchBar({
  placeholderText,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) {
  return (
    <View style={searchBarStyles.searchBarContainer}>
      <TextInput
        style={searchBarStyles.searchBar}
        placeholder={placeholderText}
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        autoFocus
      />
    </View>
  );
}

interface SearchResultsListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
}

export function SearchResultsList<T>({
  data,
  keyExtractor,
  renderItem,
}: SearchResultsListProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={true}
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

interface SearchResultsWrapperProps<T> {
  loading: boolean;
  error?: string | null;
  data: T[];
  renderItem: (props: { item: T }) => JSX.Element;
  keyExtractor: (item: T) => string;
  emptyMessage: string;
  onButtonPress?: () => void;
  buttonText?: string;
}

export function SearchResultsWrapper<T>({
  loading,
  error,
  data,
  renderItem,
  keyExtractor,
  emptyMessage,
  onButtonPress,
  buttonText,
}: SearchResultsWrapperProps<T>) {
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
      <SearchResultsList
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
