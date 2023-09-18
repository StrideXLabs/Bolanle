import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType, Platform, View} from 'react-native';
import DashboardScreen from '../screens/Dashboard';

import {accentColor} from '../constants';
import {useOpenModalState} from '../hooks/useOpenModal';
import ContactsScreen from '../screens/Contacts';
import ProfileScreen from '../screens/Profile';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import GeoTags from '../screens/GeoTags';
import QRScanner from '../screens/Scanner';
import {ICardData} from '../services/dashboard.service';

//icons
import DashboardFilled from '../assets/svgs/DashboardFilled.svg';
import Dashboard from '../assets/svgs/Dashboard.svg';
import GeoLocationFilled from '../assets/svgs/GeoFilled.svg';
import GeoLocation from '../assets/svgs/Geo.svg';
import ProfileFilled from '../assets/svgs/ProfileFilled.svg';
import Profile from '../assets/svgs/Profile.svg';
import Scanner from '../assets/svgs/Scanner.svg';
import ContactsFilled from '../assets/svgs/ContactsFilled.svg';
import Contacts from '../assets/svgs/Contacts.svg';

export type BottomTabNavigatorParams = {
  ProfileScreen: undefined;
  ContactsScreen: undefined;
  DashboardScreen: undefined;
  GeoLocationScreen: {
    businessCard?: ICardData;
    toggle?: boolean;
  };
  QRScannerScreen: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParams>();

const BottomNavigation = () => {
  const open = useOpenModalState(state => state.open);

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          minHeight:
            Platform.OS == 'android'
              ? responsiveHeight(9)
              : responsiveHeight(11),
          display: open ? 'none' : 'flex',
          paddingHorizontal: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
          fontFamily: 'Poppins-Medium',
        },
        tabBarActiveTintColor: accentColor,
      }}>
      <BottomTabNavigator.Screen
        name="DashboardScreen"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({focused}) =>
            focused ? (
              <DashboardFilled width={23} height={23} />
            ) : (
              <Dashboard width={23} height={23} />
            ),
        }}
        component={DashboardScreen}
      />
      <BottomTabNavigator.Screen
        name="GeoLocationScreen"
        options={{
          title: 'Geo Tags',
          tabBarIcon: ({focused}) =>
            focused ? (
              <GeoLocationFilled width={23} height={23} />
            ) : (
              <GeoLocation width={23} height={23} />
            ),
        }}
        component={GeoTags}
        defaultParams={{toggle: false, businessCard: undefined}}
      />
      <BottomTabNavigator.Screen
        name="QRScannerScreen"
        options={{
          title: '',
          tabBarIcon: () => (
            <View className="p-4 rounded-full absolute -top-10">
              <Scanner width={64} height={64} />
            </View>
          ),
        }}
        component={QRScanner}
      />
      <BottomTabNavigator.Screen
        name={'ContactsScreen' as any}
        options={{
          title: 'Contacts',
          tabBarLabel: 'Contacts',
          tabBarIcon: ({focused}) =>
            focused ? (
              <ContactsFilled width={23} height={23} />
            ) : (
              <Contacts width={23} height={23} />
            ),
        }}
        component={ContactsScreen as any}
      />
      <BottomTabNavigator.Screen
        name={'ProfileScreen' as any}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) =>
            focused ? (
              <ProfileFilled width={23} height={23} />
            ) : (
              <Profile width={23} height={23} />
            ),
        }}
        component={ProfileScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigation;
