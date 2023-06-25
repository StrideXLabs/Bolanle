import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

/* -------- SCREENS -------- */
import jwtDecode from 'jwt-decode';
import {AuthStateKey, accentColor} from '../constants';
import {ISocial} from '../constants/socials';
import {useAuth} from '../hooks/useAuth';
import {IAuthState} from '../hooks/useAuth/interface';
import {flushStorage, getDataFromAsyncStorage} from '../lib/storage';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ContactDetails from '../screens/ContactDetails';
import PersonalInformation from '../screens/PersonalInformation';
import SocialLinksScreen from '../screens/SocialLinks';
import OtherSocialScreen from '../screens/SocialLinks/OtherSocials';
import WhatsAppScreen from '../screens/SocialLinks/WhatsApp';
import WelcomeScreen from '../screens/Welcome';
import BottomNavigation from './BottomNavigation';
import {ICardData} from '../services/dashboard.service';
import EditCardScreen from '../screens/EditCard';

export type AppStackParams = {
  LoginScreen: undefined;
  AppBottomNav: undefined;
  WelcomeScreen: undefined;
  SocialLinksScreen: undefined;
  ForgotPasswordScreen: undefined;
  ContactDetailsScreen: undefined;
  EditCardScreen: {card: ICardData};
  WhatsAppScreen: {social: ISocial};
  PersonalInformationScreen: undefined;
  OtherSocialsScreen: {social: ISocial};
  RegisterScreen: {fromLoginScreen: boolean};
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigation = () => {
  const {authed, setAuthState} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const data = await getDataFromAsyncStorage<IAuthState>(AuthStateKey);

        if (!data) {
          await flushStorage();
          setAuthState({authed: false, token: null, user: null});
          setLoading(false);
          return;
        }

        jwtDecode(data.token || '');
        setAuthState(data);
      } catch (error) {
        await flushStorage();
        setAuthState({authed: false, token: null, user: null});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <View className="h-screen w-full flex justify-center items-center bg-off-white-1">
        <ActivityIndicator color={accentColor} size={50} />
      </View>
    );

  return (
    <>
      <StatusBar
        animated
        barStyle="dark-content"
        showHideTransition="slide"
        backgroundColor="#F5F5F5"
      />

      <AppStack.Navigator
        initialRouteName={authed ? 'AppBottomNav' : 'WelcomeScreen'}
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
          options={{animation: 'none'}}
        />
        <AppStack.Screen
          component={EditCardScreen}
          name={'EditCardScreen' as any}
          options={{animation: 'slide_from_right'}}
        />
      </AppStack.Navigator>
    </>
  );
};

export default AppNavigation;
