import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';
import {BASE_URL} from '../constants';
import {Text, View} from 'react-native';

import StaticContainer from '../containers/StaticContainer';

const linkings = {
  prefixes: ['hellobolanle://', BASE_URL],
  config: {
    screens: {
      EditCardScreen: {
        path: 'EditCardScreen/:cardId',
      },
    },
  },
} as LinkingOptions<ReactNavigation.RootParamList>;

const RootNavigation = () => {
  const idRef = useRef<any>(null);

  useEffect(() => {
    SplashScreen.hide();
    return () => clearTimeout(idRef.current);
  }, []);

  return (
    <NavigationContainer
      linking={linkings}
      onReady={() => {
        idRef.current = setTimeout(() => SplashScreen.hide(), 300);
      }}>
      <AppNavigation />
      {/* <StaticContainer isBack={true} title="title" isHeader={true}>
        <View className="flex-1 w-full border-2 border-black"></View>
      </StaticContainer> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
