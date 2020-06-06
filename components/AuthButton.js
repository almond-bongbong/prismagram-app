import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';
import { ActivityIndicator } from 'react-native';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  width: ${constants.width / 1.7}px;
`;

const Text = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 600;
`;

function AuthButton({ text, onPress, loading, backgroundColor }) {
  return (
    <Touchable disabled={loading} onPress={onPress}>
      <Container backgroundColor={backgroundColor}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text>{text}</Text>}
      </Container>
    </Touchable>
  );
}

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

AuthButton.defaultProps = {
  loading: false,
};

export default AuthButton;
