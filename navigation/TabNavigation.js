import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesLink from '../components/layouts/MessagesLink';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = ({ route }) => {
  const { InitialRoute, customConfig } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.name}
        component={InitialRoute}
        options={customConfig}
      />
    </Stack.Navigator>
  );
};

function TabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={stackFactory}
        initialParams={{
          InitialRoute: Home,
          customConfig: {
            title: 'Hello',
            headerRight: () => <MessagesLink />,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={stackFactory}
        initialParams={{
          InitialRoute: Search,
        }}
      />
      <Tab.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('PhotoNavigation');
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={stackFactory}
        initialParams={{
          InitialRoute: Notifications,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={stackFactory}
        initialParams={{
          InitialRoute: Profile,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
