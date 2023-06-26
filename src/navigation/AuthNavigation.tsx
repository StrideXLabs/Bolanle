import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

/* -------- SCREENS -------- */
import {accentColor} from '../constants';
import {ISocial} from '../constants/socials';
import useAuthState from '../hooks/useAuthState';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ContactDetails from '../screens/ContactDetails';
import PersonalInformation from '../screens/PersonalInformation';
import SocialLinksScreen from '../screens/SocialLinks';
import OtherSocialScreen from '../screens/SocialLinks/OtherSocials';
import WhatsAppScreen from '../screens/SocialLinks/WhatsApp';
import WelcomeScreen from '../screens/Welcome';

export type AuthStackParams = {
  LoginScreen: undefined;
  WelcomeScreen: undefined;
  SocialLinksScreen: undefined;
  ForgotPasswordScreen: undefined;
  ContactDetailsScreen: undefined;
  WhatsAppScreen: {social: ISocial};
  PersonalInformationScreen: undefined;
  OtherSocialsScreen: {social: ISocial};
  RegisterScreen: {fromLoginScreen: boolean};
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation = () => {
  const {loading, redirectToLogin} = useAuthState();

  if (loading)
    return (
      <View className="h-screen w-full flex justify-center items-center bg-off-white-1">
        <ActivityIndicator color={accentColor} size={50} />
      </View>
    );

  return (
    <>
      <AuthStack.Navigator
        initialRouteName={redirectToLogin ? 'LoginScreen' : 'WelcomeScreen'}
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <AuthStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <AuthStack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformation}
          options={{animation: 'slide_from_bottom'}}
        />
        <AuthStack.Screen
          name="ContactDetailsScreen"
          component={ContactDetails}
          options={{animation: 'slide_from_bottom'}}
        />
        <AuthStack.Screen
          name="SocialLinksScreen"
          component={SocialLinksScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <AuthStack.Screen
          name="WhatsAppScreen"
          component={WhatsAppScreen}
          options={{animation: 'none'}}
        />
        <AuthStack.Screen
          name="OtherSocialsScreen"
          component={OtherSocialScreen}
          options={{animation: 'none'}}
        />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthNavigation;
