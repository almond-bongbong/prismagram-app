import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';

const PhotoTab = createMaterialTopTabNavigator();

function PhotoNavigation() {
  return (
    <PhotoTab.Navigator tabBarPosition="bottom">
      <PhotoTab.Screen name="SelectPhoto" component={SelectPhoto} />
      <PhotoTab.Screen name="TakePhoto" component={TakePhoto} />
    </PhotoTab.Navigator>
  );
}
const PhotoStack = createStackNavigator();

export default function () {
  return (
    <PhotoStack.Navigator>
      <PhotoStack.Screen
        name="PhotoNavigation"
        options={{ title: '' }}
        component={PhotoNavigation}
      />
      <PhotoStack.Screen
        name="UploadPhoto"
        options={{ title: '' }}
        component={UploadPhoto}
      />
    </PhotoStack.Navigator>
  );
}
