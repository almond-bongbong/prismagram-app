import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
`;

function Confirm({ route }) {
  const [secret, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmSecret] = useMutation(CONFIRM_SECRET);
  const login = useLogIn();

  const handleConfirm = async () => {
    if (!secret || !secret.includes(' ')) {
      return Alert.alert("Invalid secert", '');
    }

    try {
      setLoading(true);
      const { email } = route.params;
      const { data } = await confirmSecret({ variables: { email, secret } });
      const token = data.confirmSecret;

      if (token) {
        login(token);
      } else {
        Alert.alert('Wrong secret!', '');
      }
    } catch (e) {
      Alert.alert("Can't confirm secret", '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          value={secret}
          onChange={setConfirm}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
        />
        <AuthButton text="Confirm" onPress={handleConfirm} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Confirm;
