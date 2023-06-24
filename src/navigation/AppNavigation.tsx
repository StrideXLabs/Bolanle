import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';

/* -------- SCREENS -------- */
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ContactDetails from '../screens/BusinessCard/ContactDetails';
import PersonalInformation from '../screens/BusinessCard/PersonalInformation';
import SocialLinksScreen from '../screens/BusinessCard/SocialLinks';
import OtherSocialScreen from '../screens/BusinessCard/SocialLinks/OtherSocials';
import WhatsAppScreen from '../screens/BusinessCard/SocialLinks/WhatsApp';
import WelcomeScreen from '../screens/Welcome';
import BottomNavigation from './BottomNavigation';
import {useAuth} from '../hooks/useAuth';

export type AppStackParams = {
  LoginScreen: undefined;
  AppBottomNav: undefined;
  WelcomeScreen: undefined;
  ContactDetailsScreen: undefined;
  ForgotPasswordScreen: undefined;
  BottomNavigatorScreen: undefined;
  PersonalInformationScreen: undefined;
  RegisterScreen?: {showHeader?: boolean};
  WhatsAppScreen?: {fromSocialLinks?: boolean};
  SocialLinksScreen?: {toSocialLinks?: boolean};
  OtherSocialsScreen?: {fromSocialLinks?: boolean};
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigation = () => {
  const {authed, token, user} = useAuth();

  return (
    <>
      <StatusBar
        animated
        barStyle="dark-content"
        showHideTransition="slide"
        backgroundColor="#F5F5F5"
      />
      <AppStack.Navigator
        initialRouteName={authed ? 'BottomNavigatorScreen' : 'WelcomeScreen'}
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <AppStack.Screen name="LoginScreen" component={LoginScreen} />
        <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <AppStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          initialParams={{showHeader: true}}
        />
        <AppStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <AppStack.Screen name="AppBottomNav" component={BottomNavigation} />
        <AppStack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformation}
          options={{animation: 'slide_from_bottom'}}
        />
        <AppStack.Screen
          name="ContactDetailsScreen"
          component={ContactDetails}
          options={{animation: 'slide_from_bottom'}}
        />
        <AppStack.Screen
          component={SocialLinksScreen}
          name={'SocialLinksScreen' as any}
          options={{animation: 'slide_from_bottom'}}
        />
        <AppStack.Screen
          component={WhatsAppScreen}
          name={'WhatsAppScreen' as any}
          options={{animation: 'none'}}
        />
        <AppStack.Screen
          component={OtherSocialScreen}
          name={'OtherSocialsScreen' as any}
          options={{animation: 'none'}}
        />
      </AppStack.Navigator>
    </>
  );
};

export default AppNavigation;
