import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './AppNavigation';
import {BASE_URL} from '../constants';
// import {Text, View, TextInput, Image, ImageSourcePropType} from 'react-native';
// import {EyeIcon, EyeOffIcon} from '../constants/icons';

// import StaticContainer from '../containers/StaticContainer';
// import GenericCardContainer from '../containers/GenericCardContainer';
// import GenericTextField from '../components/TextField/GenericTextField/GenericTextField';
// import PersonalInformation from '../screens/Auth/Register/PersonalInformation';
// import AccountInformation from '../screens/Auth/Register/AccountInformation';
// import ExtraInformation from '../screens/Auth/Register/ExtraInformation';

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
      {/* <PersonalInformation /> */}
      {/* <AccountInformation /> */}
      {/* <ExtraInformation /> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
