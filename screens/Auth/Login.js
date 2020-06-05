import React from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <AuthInput value={''} keyboardType="email-address" placeholder="Email" />
    <AuthButton text="Log In" onPress={() => null} />
  </View>
);
