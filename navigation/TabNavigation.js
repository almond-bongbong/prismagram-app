import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

function Add({ navigation }) {
  useEffect(() => {
    return navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('PhotoNavigation');
    });
  }, [navigation]);
  return <View />;
}

function TabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

export default TabNavigation;
