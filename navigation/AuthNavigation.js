import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/Auth/SignUp';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import AuthHome from '../screens/Auth/AuthHome';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="SignUp" headerMode="none">
      <Stack.Screen name="AuthHome" component={AuthHome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
