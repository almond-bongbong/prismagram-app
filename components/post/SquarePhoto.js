import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import constants from '../../constants';

function SquarePhoto({ id, files = [], onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Detail', { id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{ uri: files[0].url || constants.noImageUrl }}
        style={{ width: constants.width / 3, height: constants.width / 3 }}
      />
    </TouchableOpacity>
  );
}

SquarePhoto.propTypes = {
  id: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({})),
};

SquarePhoto.defaultProps = {
  files: [],
};

export default SquarePhoto;
