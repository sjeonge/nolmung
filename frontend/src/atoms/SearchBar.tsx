import React, {useState} from 'react';
import {StyleSheet, Pressable, Text, TextInput, View} from 'react-native';
import {MAIN_COLOR} from '~/const';
import Search from '@assets/search.svg';

interface Props {
  searchValue: string;
  onSearchSubmit: (val: string) => void;
  onChangeSearchValue: (val: string) => void;
}

function SearchBar({onSearchSubmit, searchValue, onChangeSearchValue}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const customOnFocus = () => {
    setIsFocused(true);
  };
  const customOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.hContainer}>
      <TextInput
        style={styles.textInput}
        value={searchValue}
        onChangeText={text => onChangeSearchValue(text)}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        keyboardType={'default'}
      />
      <Pressable
        style={styles.searchButton}
        onPress={() => onSearchSubmit(searchValue)}>
        <Search width={20} height={20} fill={'black'} stroke={'black'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    flex: 1.5,
    padding: 5,
    width: '100%',
  },
  searchButton: {
    flex: 1,
  },
});

export default SearchBar;
