import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../../fragments';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../../components/common/Loader';
import UserProfile from '../../../components/profile/UserProfile';
import { RefreshControl } from 'react-native';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Text = styled.Text``;

export const SEE_MY_PROFILE = gql`
  {
    seeMyProfile {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

function Profile({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(SEE_MY_PROFILE, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.seeMyProfile) {
      navigation.setOptions({
        headerTitle: () => <Text>{data?.seeMyProfile.username}</Text>,
      });
    }
  }, [data?.seeMyProfile]);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {data?.seeMyProfile && <UserProfile {...data.seeMyProfile} />}
    </Container>
  );
}

export default Profile;
