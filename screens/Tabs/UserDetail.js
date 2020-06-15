import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { Text } from 'react-native';
import { USER_FRAGMENT } from '../../fragments';
import Loader from '../../components/common/Loader';
import UserProfile from '../../components/profile/UserProfile';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const GET_USER = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

function UserDetail({ navigation, route }) {
  const { username } = route.params;
  navigation.setOptions({ headerTitle: () => <Text>{username}</Text> });
  const { loading, data } = useQuery(GET_USER, {
    variables: { username },
    fetchPolicy: 'network-only',
  });
  const user = data?.seeProfile;

  return loading ? (
    <Loader />
  ) : (
    <Container>{user && <UserProfile {...user} />}</Container>
  );
}

export default UserDetail;
