import { gql } from 'apollo-boost';

export const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;