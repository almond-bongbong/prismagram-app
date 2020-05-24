import React, { useCallback, useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './apollo';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const preLoad = useCallback(async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync([require('./assets/logo.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    preLoad();
  }, [preLoad]);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Open up App.js</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
