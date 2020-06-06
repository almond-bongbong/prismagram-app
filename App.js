import React, { useCallback, useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import styles from './styles';
import apolloClientOptions from './apollo';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const preLoad = useCallback(async () => {
    await AsyncStorage.clear();

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
      <ThemeProvider theme={styles}>
        <AuthProvider>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
