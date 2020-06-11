import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import constants from '../../constants';
import styles from '../../styles';

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
      placeholder="Search"
      placeholderTextColor={styles.darkGreyColor}
      style={{
        width: constants.width - 40,
        height: 35,
        backgroundColor: styles.lightGreyColor,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
      }}
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
