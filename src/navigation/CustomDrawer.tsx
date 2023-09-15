import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  aboutLogo,
  feedbackLogo,
  guideLogo,
  licenceLogo,
  logoutLogo,
  privacyLogo,
  ratingsLogo,
} from '../constants/icons';

const Drawer = createDrawerNavigator();

export const CustomDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={aboutLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="About"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={feedbackLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="Feedback"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={licenceLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="License"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={privacyLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="Privacy Policy"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={guideLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="User Guide"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={ratingsLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="Rate Us"
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                className={'h-11 w-11 rounded-lg'}
                source={logoutLogo as ImageSourcePropType}
              />
            </TouchableOpacity>
          ),
        }}
        name="Logout"
      />
    </Drawer.Navigator>
  );
};

export default CustomDrawer;
