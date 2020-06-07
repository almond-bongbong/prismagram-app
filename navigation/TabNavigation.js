import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesLink from '../components/layouts/MessagesLink';
import NavIcon from './NavIcon';
import { stackStyles } from './config';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackFactory = ({ route }) => {
  const { InitialRoute, customConfig } = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { ...stackStyles },
      }}
    >
      <Stack.Screen
        name={route.name}
        component={InitialRoute}
        options={customConfig}
      />
    </Stack.Navigator>
  );
};

function TabNavigation() {
  const isIOS = Platform.OS === 'ios';
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#fafafa',
        },
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
            headerTitle: <NavIcon name="logo-instagram" size={36} />,
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={isIOS ? 'ios-home' : 'md-home'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={stackFactory}
        initialParams={{
          InitialRoute: Search,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={isIOS ? 'ios-search' : 'md-search'}
              size={24}
            />
          ),
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
        options={{
          tabBarIcon: () => (
            <NavIcon
              focused={false}
              name={isIOS ? 'ios-add' : 'md-add'}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={stackFactory}
        initialParams={{
          InitialRoute: Notifications,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={isIOS ? 'ios-heart' : 'md-heart'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={stackFactory}
        initialParams={{
          InitialRoute: Profile,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={isIOS ? 'ios-person' : 'md-person'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
