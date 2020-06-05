import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { EMAIL_REGEX } from '../../utils/regex';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
`;

function Login() {
  const [email, setEmail] = useState('');
  const handleLogin = () => {
    if (!email) {
      return Alert.alert("Email can't empty", '');
    }

    if (!EMAIL_REGEX.test(email)) {
      return Alert.alert('That email is invalid', '');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          placeholder="Email"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />
        <AuthButton text="Log In" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;
