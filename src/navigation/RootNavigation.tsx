import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigation from './AppNavigation';
import {SafeAreaView, ScrollView} from 'react-native';

const theme = Object.freeze({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F5F5',
  },
});

const RootNavigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
