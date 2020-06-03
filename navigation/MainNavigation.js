import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
      <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
    </Stack.Navigator>
  );
}

export default MainNavigation;
