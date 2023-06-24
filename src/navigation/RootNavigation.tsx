import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';

const theme = Object.freeze({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F5F5',
  },
});

const RootNavigation = () => {
  return (
    <NavigationContainer theme={theme} onReady={() => SplashScreen.hide()}>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
