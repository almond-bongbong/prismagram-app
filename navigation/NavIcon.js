import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from '../styles';

function NavIcon({ focused, name, color, size }) {
  return (
    <Ionicons
      name={name}
      color={focused ? color : styles.darkGreyColor}
      size={size}
    />
  );
}

NavIcon.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

NavIcon.defaultProps = {
  focused: true,
  color: styles.blackColor,
  size: 26,
};

export default NavIcon;
