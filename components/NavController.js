import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../navigation/MainNavigation';

function NavController() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer>
      <View style={{ flex: '1' }}>
        {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
      </View>
    </NavigationContainer>
  );
}

export default NavController;
