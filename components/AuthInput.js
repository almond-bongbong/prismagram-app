import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput``;

function AuthInput({ value, placeholder, keyboardType, autoCapitalize }) {
  return (
    <Container>
      <TextInput
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    </Container>
  );
}

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  placeholder: PropTypes.string.isRequired,
};

AuthInput.defaultProps = {
  autoCapitalize: 'none',
  keyboardType: 'default',
};

export default AuthInput;
