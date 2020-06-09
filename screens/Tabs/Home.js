import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../components/common/Loader';
import Post from '../../components/post/Post';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Text = styled.Text``;

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  console.log(loading, data);

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

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data?.seeFeed?.map((post) => <Post key={post.id} {...post} />)
      )}
    </Container>
  );
}

export default Home;
