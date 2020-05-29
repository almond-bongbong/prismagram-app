import React from 'react';
import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <Container>
    <Text>Auth Home</Text>
    <Text>hello</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text>Go to Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text>Go to Signup</Text>
    </TouchableOpacity>
  </Container>
);
