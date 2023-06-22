import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

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

export type AppStackParams = {
  LoginScreen: undefined;
  AppBottomNav: undefined;
  WelcomeScreen: undefined;
  WhatsAppScreen: undefined;
  RegisterScreen: undefined;
  SocialLinksScreen: undefined;
  OtherSocialsScreen: undefined;
  ContactDetailsScreen: undefined;
  ForgotPasswordScreen: undefined;
  PersonalInformationScreen: undefined;
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
        options={{animation: 'slide_from_bottom'}}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
