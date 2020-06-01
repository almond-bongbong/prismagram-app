import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import Confirm from '../screens/Confirm';
import Login from '../screens/Login';
import AuthHome from '../screens/AuthHome';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
      <Stack.Navigator initialRouteName="AuthHome" headerMode="none">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Confirm" component={Confirm} />
      </Stack.Navigator>
  );
}

export default AuthNavigation;
