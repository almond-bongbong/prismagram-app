import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import { stackStyles } from './config';
import styles from '../styles';

const PhotoTab = createMaterialTopTabNavigator();

function PhotoNavigation() {
  return (
    <PhotoTab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: { backgroundColor: styles.blackColor },
        labelStyle: { color: styles.blackColor, fontWeight: '600' },
        style: { ...stackStyles },
      }}
    >
      <PhotoTab.Screen
        name="TakePhoto"
        options={{ tabBarLabel: 'Take' }}
        component={TakePhoto}
      />
      <PhotoTab.Screen
        name="SelectPhoto"
        options={{ tabBarLabel: 'Select' }}
        component={SelectPhoto}
      />
    </PhotoTab.Navigator>
  );
}
const PhotoStack = createStackNavigator();

export default function () {
  return (
    <PhotoStack.Navigator
      screenOptions={{
        headerStyle: { ...stackStyles },
        headerTitle: '',
      }}
    >
      <PhotoStack.Screen
        name="PhotoNavigation"
        component={PhotoNavigation}
        options={{
          headerTitle: 'Choose Photo',
        }}
      />
      <PhotoStack.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoStack.Navigator>
  );
}
