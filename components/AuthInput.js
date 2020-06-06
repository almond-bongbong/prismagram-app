import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 1.7}px;
  padding: 10px;
  background-color: ${({ theme }) => theme.greyColor};
  border: 1px solid ${({ theme }) => theme.darkGreyColor};
  border-radius: 4px;
`;

function AuthInput({
  value,
  onChange,
  placeholder,
  keyboardType,
  autoCapitalize,
  returnKeyType,
  onSubmitEditing,
  autoCorrect,
}) {
  return (
    <Container>
      <TextInput
        value={value}
        autoCorrect={autoCorrect}
        onChangeText={onChange}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </Container>
  );
}

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  placeholder: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
};

AuthInput.defaultProps = {
  autoCapitalize: 'none',
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCorrect: false,
};

export default AuthInput;
