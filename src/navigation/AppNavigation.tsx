import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

/* -------- SCREENS -------- */
import {accentColor} from '../constants';
import {ISocial} from '../constants/socials';
import useAuthState from '../hooks/useAuthState';
import ContactDetails from '../screens/ContactDetails';
import EditCardScreen from '../screens/EditCard';
import PersonalInformation from '../screens/PersonalInformation';
import SocialLinksScreen from '../screens/SocialLinks';
import OtherSocialScreen from '../screens/SocialLinks/OtherSocials';
import WhatsAppScreen from '../screens/SocialLinks/WhatsApp';
import {ICardData} from '../services/dashboard.service';
import AuthNavigation from './AuthNavigation';
import BottomNavigation from './BottomNavigation';

export type AppStackParams = {
  AppBottomNav: undefined;
  WelcomeScreen: undefined;
  SocialLinksScreen: undefined;
  ContactDetailsScreen: undefined;
  WhatsAppScreen: {social: ISocial};
  PersonalInformationScreen: undefined;
  OtherSocialsScreen: {social: ISocial};
  EditCardScreen: {
    card: Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>;
    editable: boolean;
  };
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppNavigation = () => {
  const {loading, authed} = useAuthState();

  if (loading)
    return (
      <View className="h-screen w-full flex justify-center items-center bg-white">
        <ActivityIndicator color={accentColor} size={50} />
      </View>
    );

  return (
    <>
      {authed ? (
        <AppStack.Navigator
          initialRouteName="AppBottomNav"
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
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
            name="SocialLinksScreen"
            component={SocialLinksScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <AppStack.Screen
            name="WhatsAppScreen"
            component={WhatsAppScreen}
            options={{animation: 'none'}}
          />
          <AppStack.Screen
            name="OtherSocialsScreen"
            component={OtherSocialScreen}
            options={{animation: 'none'}}
          />

          <AppStack.Screen
            name="EditCardScreen"
            component={EditCardScreen}
            options={{animation: 'slide_from_right'}}
          />
          <AppStack.Screen
            name="AppBottomNav"
            component={BottomNavigation}
            options={{animation: 'simple_push'}}
          />
        </AppStack.Navigator>
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default AppNavigation;
