import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

/* -------- SCREENS -------- */
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import WelcomeScreen from '../screens/Welcome';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';

export type AppStackParams = {
  LoginScreen: undefined;
  WelcomeScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <AppStack.Screen name="LoginScreen" component={LoginScreen} />
      <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AppStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AppStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
