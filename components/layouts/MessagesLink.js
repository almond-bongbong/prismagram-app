import React from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavIcon from '../../navigation/NavIcon';

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

function MessagesLink() {
  const navigation = useNavigation();
  const isIOS = Platform.OS === 'ios';

  return (
    <Container onPress={() => navigation.navigate('MessageNavigation')}>
      <NavIcon name={isIOS ? 'ios-paper-plane' : 'md-paper-plane'} />
    </Container>
  );
}

export default MessagesLink;
