import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${({ theme }) => theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  width: 180px;
`;

const Text = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 600;
`;

function AuthButton({ text, onPress }) {
  return (
    <Touchable onPress={onPress}>
      <Container>
        <Text>{text}</Text>
      </Container>
    </Touchable>
  );
}

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AuthButton;
