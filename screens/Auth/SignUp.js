import React, { useState } from 'react';
import styled from 'styled-components';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { EMAIL_REGEX } from '../../utils/regex';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
`;

const FacebookContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 10px;
`;

function SignUp({ navigation, route }) {
  const defaultEmail = route.params?.email || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState(defaultEmail);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  const handleSignUp = async () => {
    if (!name) {
      return Alert.alert('I need your name', '');
    }
    if (!EMAIL_REGEX.test(email)) {
      return Alert.alert('That email is invalid', '');
    }
    if (!username) {
      return Alert.alert('Invalid username', '');
    }

    try {
      setLoading(true);
      const { data } = await createAccount({
        variables: {
          name,
          email,
          username,
        },
      });

      if (data.createAccount) {
        Alert.alert('Account created.', 'Log in now');
        navigation.navigate('Login', { email });
      } else {
        Alert.alert("Can't sign up", '');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Username or email taken.', 'Log in instead');
      navigation.navigate('Login', { email });
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync(process.env.FACEBOOK_APP_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync();
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
        );
        const data = await response.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setUsername(data.email.split('@')[0]);
      }

      setLoading(false);
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`, '');
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: process.env.GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result);
        const data = result.user;
        setName(data.name || '');
        setEmail(data.email || '');
        setUsername(data.email.split('@')[0]);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      Alert.alert(`Google Login Error: ${message}`, '');
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          value={name}
          onChange={setName}
          placeholder="Name"
          autoCapitalize="words"
        />
        <AuthInput
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          placeholder="Email"
        />
        <AuthInput
          value={username}
          onChange={setUsername}
          placeholder="Username"
        />
        <AuthButton text="Sign up" onPress={handleSignUp} loading={loading} />

        <FacebookContainer>
          <AuthButton
            backgroundColor="#2d4da7"
            text="Connect Facebook"
            onPress={facebookLogin}
          />
        </FacebookContainer>
        <GoogleContainer>
          <AuthButton
            backgroundColor="#ee1922"
            text="Connect Google"
            onPress={googleLogin}
          />
        </GoogleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignUp;
