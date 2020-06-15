import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../../../components/common/SearchBar';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH } from './SearchQueries';
import { RefreshControl } from 'react-native';
import Loader from '../../../components/common/Loader';
import SquarePhoto from '../../../components/post/SquarePhoto';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Text = styled.Text``;

function Search({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { loading, data, refetch } = useQuery(SEARCH, {
    variables: { term: keyword },
    skip: !shouldFetch,
    fetchPolicy: 'network-only',
  });

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        value={keyword}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ),
  });

  const handleChange = (value) => {
    setKeyword(value);
    setShouldFetch(false);
  };

  const handleSubmit = () => {
    setShouldFetch(true);
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      refetch({ variables: { term: keyword } });
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
      {data?.searchPost.map((post) => (
        <SquarePhoto key={post.id} id={post.id} files={post.files} />
      ))}
    </Container>
  );
}

export default Search;
