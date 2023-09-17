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
import ShareCardScreen from '../screens/ShareCard';
import ShareCardDetailsScreen from '../screens/ShareDetails';
import SocialLinksScreen from '../screens/SocialLinks';
import OtherSocialScreen from '../screens/SocialLinks/OtherSocials';
import WhatsAppScreen from '../screens/SocialLinks/WhatsApp';
import {ICardData} from '../services/dashboard.service';
import AuthNavigation from './AuthNavigation';
import BottomNavigation from './BottomNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from './CustomDrawer';
import ExtendedMap from '../screens/ExtendedMap';

export type ScreenStatus = 'EDITING' | 'CREATING';
export type ShareType = '' | 'TEXT_CARD' | 'EMAIL_CARD' | 'WHATSAPP_CARD';

export type EditScreenParams = {
  SocialLinksScreen: {status: ScreenStatus; cardId: string | null};
  ContactDetailsScreen: {status: ScreenStatus; cardId: string | null};
  PersonalInformationScreen: {status: ScreenStatus; cardId: string | null};
  WhatsAppScreen: {
    social: ISocial;
    status: ScreenStatus;
    cardId: string | null;
  };
  OtherSocialsScreen: {
    social: ISocial;
    status: ScreenStatus;
    cardId: string | null;
  };
};

export type AppStackParams = {
  AppBottomNav: undefined;
  EditCardScreen: {
    editable: boolean;
    cardId?: string;
    card: Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>;
  };
  ShareCardScreen:
    | {cardId: number; type: 'WITH_ID'; company: string; fullName: string}
    | {
        company: string;
        type: 'WITH_DATA';
        fullName: string;
        card: Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>;
      };

  ShareCardDetailsScreen: {
    company: string;
    fullName: string;
    shareType: ShareType;
    card: Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>;
  };
  ExtendedMapScreen: {
    id: string | null;
  };
} & EditScreenParams;

const AppStack = createNativeStackNavigator<AppStackParams>();
const Drawer = createDrawerNavigator();

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
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            swipeEnabled: false,
            drawerPosition: 'right',
            drawerStyle: {
              width: '60%',
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              backgroundColor: '#E8F1F8',
            },
          }}>
          <Drawer.Screen name="AppStack" component={AppStackScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

const AppStackScreen = () => {
  return (
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
        options={{animation: 'fade_from_bottom'}}
      />
      <AppStack.Screen name="ShareCardScreen" component={ShareCardScreen} />
      <AppStack.Screen
        component={ShareCardDetailsScreen}
        name={'ShareCardDetailsScreen' as any}
      />
      <AppStack.Screen
        name="AppBottomNav"
        component={BottomNavigation}
        options={{animation: 'simple_push'}}
      />
      <AppStack.Screen
        name="ExtendedMapScreen"
        component={ExtendedMap}
        options={{animation: 'slide_from_bottom'}}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
