import React from "react";
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';

type SearchInputProps = {
  query: string;
  setQuery: (text: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TextInput
        placeholder="Search articles..."
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={query}
        onChangeText={setQuery}
        style={[styles.searchInput, isDark && styles.searchInputDark]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
    width: '95%'
  },
  containerDark: {
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  searchInputDark: {
    borderColor: '#555',
    color: '#fff',
    backgroundColor: '#222',
  },
});

export default SearchInput;