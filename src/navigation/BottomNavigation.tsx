import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import DashboardScreen from '../screens/Dashboard';

import contactsIcon from '../assets/images/contacts.png';
import dashboardIcon from '../assets/images/dashboard.png';
import profileIcon from '../assets/images/profile.png';
import geoLocationIcon from '../assets/images/geoLocation.png';
import {QrCodeIcon} from '../constants/icons';
import {accentColor} from '../constants';
import {useOpenModalState} from '../hooks/useOpenModal';
import ContactsScreen from '../screens/Contacts/test';
import ProfileScreen from '../screens/Profile';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import GeoLocation from '../screens/GeoTags';
import QRScanner from '../screens/QR-Scanner';

export type BottomTabNavigatorParams = {
  ProfileScreen: undefined;
  ContactsScreen: undefined;
  DashboardScreen: undefined;
  GeoLocationScreen: undefined;
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
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 23,
                height: 23,
                marginTop: 8,
                tintColor: focused ? accentColor : '#C9C9C9',
              }}
              source={dashboardIcon as ImageSourcePropType}
            />
          ),
        }}
        component={DashboardScreen}
      />
      <BottomTabNavigator.Screen
        name="GeoLocationScreen"
        options={{
          title: 'Geo Tags',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 23,
                height: 23,
                marginTop: 8,
                tintColor: focused ? accentColor : '#C9C9C9',
              }}
              source={geoLocationIcon as ImageSourcePropType}
            />
          ),
        }}
        component={GeoLocation}
      />
      <BottomTabNavigator.Screen
        name="QRScannerScreen"
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <View className="p-4 rounded-full bg-blue-600 absolute -top-8">
              <Image
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? 'white' : '#c9c9c9',
                }}
                source={QrCodeIcon as ImageSourcePropType}
              />
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
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              style={{
                width: 23,
                height: 23,
                marginTop: 8,
                tintColor: focused ? accentColor : '#C9C9C9',
              }}
              source={contactsIcon as ImageSourcePropType}
            />
          ),
        }}
        component={ContactsScreen as any}
      />
      <BottomTabNavigator.Screen
        name={'ProfileScreen' as any}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 22,
                height: 22,
                marginTop: 8,
                tintColor: focused ? accentColor : '#C9C9C9',
              }}
              source={profileIcon as ImageSourcePropType}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigation;
