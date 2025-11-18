import { mySearchBarStyles } from "@/styles/components/mySearchBar";
import { default as React } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

interface SearchBarProps {
  placeholderText: string;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  handleSearch: () => void;
}

export function MySearchBar({
  placeholderText,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) {
  return (
    // <View style={searchBarStyles.searchBarContainer}>
    //   <TextInput
    //     style={searchBarStyles.searchBar}
    //     placeholder={placeholderText}
    //     value={searchQuery}
    //     onChangeText={setSearchQuery}
    //     returnKeyType="search"
    //     onSubmitEditing={handleSearch}
    //     autoFocus
    //   />
    // </View>
    <View style={mySearchBarStyles.searchBarContainer}>
      <Searchbar
        style={mySearchBarStyles.searchBar}
        inputStyle={{ paddingBottom: "2.3%", margin: 0 }} // NEEDFIX
        theme={{ colors: { primary: "black" } }} // NEEDFIX
        placeholder={placeholderText}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        value={searchQuery}
        autoFocus
      />
    </View>
  );
}
