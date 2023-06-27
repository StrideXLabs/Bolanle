import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';

const RootNavigation = () => {
  const idRef = useRef<any>(null);

  useEffect(() => {
    return () => clearTimeout(idRef.current);
  }, []);

  return (
    <NavigationContainer
      onReady={() => {
        idRef.current = setTimeout(() => SplashScreen.hide(), 200);
      }}>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
