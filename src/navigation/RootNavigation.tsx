import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';
import {BASE_URL} from '../constants';
import {Text, View} from 'react-native';

import StaticContainer from '../containers/StaticContainer';
import GenericCardContainer from '../containers/GenericCardContainer';

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
        <GenericCardContainer>
          <View className="h-[100px] w-full bg-red-500"></View>
          <Text>hello</Text>
        </GenericCardContainer>
      </StaticContainer> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
