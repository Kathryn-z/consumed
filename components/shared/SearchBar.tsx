import { searchBarStyles } from "@/styles/common";
import { default as React } from "react";
import { TextInput, View } from "react-native";

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
