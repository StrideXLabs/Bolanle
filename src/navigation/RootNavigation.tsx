import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';

const RootNavigation = () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
