import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';

function NavController() {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();

  return (
    <View style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <AuthNavigation />
      )}
    </View>
  );
}

export default NavController;
