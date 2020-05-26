import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/Auth/SignUp';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import AuthHome from '../screens/Auth/AuthHome';
import TouchableOpacity from 'react-native-web/src/exports/TouchableOpacity';
import Text from 'react-native-web/dist/exports/Text';

const AuthNavigation = createStackNavigator({
  SignUp,
  Confirm,
  Login,
  AuthHome,
});

function AuthNavigation({ SignUp }) {
  return (
    <div>
      <TouchableOpacity>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Go to Sign out</Text>
      </TouchableOpacity>
    </div>
  );
}

export default AuthNavigation;
