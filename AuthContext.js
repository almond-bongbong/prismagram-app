import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

export const AuthContext = createContext();

export const AuthProvider = ({ children, isLoggedIn: isLoggedInProp }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    (async () => {
      const defaultIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(defaultIsLoggedIn === 'true');
    })();
  }, []);

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('jwt', token);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (e) {
      console.error(e);
    }
  };

  return isLoggedIn !== null ? (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logUserIn,
        logUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  ) : (
    <AppLoading />
  );
};

export default AuthContext;

export const useIsLoggedIn = () => useContext(AuthContext).isLoggedIn;
export const useLogIn = () => useContext(AuthContext).logUserIn;
export const useLogOut = () => useContext(AuthContext).logUserOut;
