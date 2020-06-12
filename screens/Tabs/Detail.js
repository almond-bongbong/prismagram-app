import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { POST_FRAGMENT } from '../../fragments';
import Loader from '../../components/common/Loader';
import Post from '../../components/post/Post';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

function Detail({ route }) {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: route.params.id },
  });
  const post = data?.seeFullPost;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        post && (
          <Post
            id={post.id}
            user={post.user}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            caption={post.caption}
            files={post.files}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        )
      )}
    </Container>
  );
}

export default Detail;
