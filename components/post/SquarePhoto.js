import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../constants';

function SquarePhoto({ id, files = [], onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.width / 3 }}
      />
    </TouchableOpacity>
  );
}

SquarePhoto.propTypes = {
  id: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({})),
  onPress: PropTypes.func.isRequired,
};

SquarePhoto.defaultProps = {
  files: [],
};

export default SquarePhoto;
