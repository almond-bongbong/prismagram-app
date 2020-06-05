import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import AuthButton from '../../components/AuthButton';

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: 140px;
  height: 60px;
  margin-bottom: 30px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View`
  margin-top: 20px;
`;

const LoginLinkText = styled.Text`
  color: ${({ theme }) => theme.blueColor};
`;

export default ({ navigation }) => (
  <Container>
    <Image resizeMode="contain" source={require('../../assets/logo.png')} />
    <AuthButton
      text="Create New Account"
      onPress={() => navigation.navigate('SignUp')}
    />
    <Touchable onPress={() => navigation.navigate('Login')}>
      <LoginLink>
        <LoginLinkText>Login</LoginLinkText>
      </LoginLink>
    </Touchable>
  </Container>
);
