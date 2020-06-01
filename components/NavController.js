import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import TabNavigation from '../navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';

function NavController() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer>
      <View style={{ flex: '1' }}>
        {!isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
      </View>
    </NavigationContainer>
  );
}

export default NavController;
