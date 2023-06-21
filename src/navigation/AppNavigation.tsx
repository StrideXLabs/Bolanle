import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

/* -------- SCREENS -------- */
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ContactDetails from '../screens/BusinessCard/ContactDetails';
import PersonalInformation from '../screens/BusinessCard/PersonalInformation';
import WelcomeScreen from '../screens/Welcome';
import BottomNavigation from './BottomNavigation';

export type AppStackParams = {
  LoginScreen: undefined;
  SocialLinks: undefined;
  AppBottomNav: undefined;
  WelcomeScreen: undefined;
  RegisterScreen: undefined;
  ContactDetails: undefined;
  PersonalInformation: undefined;
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
      <AppStack.Screen name="AppBottomNav" component={BottomNavigation} />
      <AppStack.Screen
        options={{
          animation: 'simple_push',
          // headerShown: true,
          // statusBarStyle: 'dark',
          // headerTransparent: true,
          // headerBackVisible: false,
          // header: props => <BusinessCardHeader {...props} />,
        }}
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <AppStack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{animation: 'simple_push'}}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
