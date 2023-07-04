import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ImageSourcePropType} from 'react-native';
import DashboardScreen from '../screens/Dashboard';

import contactsIcon from '../assets/images/contacts.png';
import dashboardIcon from '../assets/images/dashboard.png';
import profileIcon from '../assets/images/profile.png';
import {accentColor} from '../constants';
import {useOpenModalState} from '../hooks/useOpenModal';
import ContactsScreen from '../screens/Contacts';
import ProfileScreen from '../screens/Profile';

export type BottomTabNavigatorParams = {
  ProfileScreen: undefined;
  ContactsScreen: undefined;
  DashboardScreen: undefined;
};

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParams>();

const BottomNavigation = () => {
  const open = useOpenModalState(state => state.open);

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {minHeight: 66, display: open ? 'none' : 'flex'},
        tabBarLabelStyle: {
          fontSize: 13,
          marginBottom: 12,
          fontFamily: 'Roboto-Medium',
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
                width: 21.6,
                height: 21.6,
                tintColor: focused ? accentColor : '#C9C9C9',
              }}
              source={dashboardIcon as ImageSourcePropType}
            />
          ),
        }}
        component={DashboardScreen}
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
                width: 24,
                height: 27,
                marginTop: 4,
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
                width: 21.6,
                height: 21.6,
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
