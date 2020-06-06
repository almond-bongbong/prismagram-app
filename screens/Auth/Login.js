import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { EMAIL_REGEX } from '../../utils/regex';
import { LOG_IN } from './AuthQueries';
import { useMutation } from 'react-apollo-hooks';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
`;

function Login({ navigation, route }) {
  const defaultEmail = route.params?.email || '';
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [requestSecret] = useMutation(LOG_IN);

  const handleLogin = async () => {
    if (!email) {
      return Alert.alert("Email can't empty", '');
    }

    if (!EMAIL_REGEX.test(email)) {
      return Alert.alert('That email is invalid', '');
    }

    try {
      setLoading(true);
      const { data } = await requestSecret({ variables: { email } });
      if (data.requestSecret) {
        Alert.alert('Check your email', '');
        navigation.navigate('Confirm', { email });
      } else {
        Alert.alert('Account not found', '');
        navigation.navigate('SignUp', { email });
      }
    } catch (e) {
      Alert.alert("Can't log in now", '');
    } finally {
      setLoading(false);
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
        <AuthButton text="Log In" onPress={handleLogin} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;
