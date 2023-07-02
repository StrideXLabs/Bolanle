import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import linearBg from '../../assets/images/bg-1.png';
import logo from '../../assets/images/logo.png';
import Button from '../../components/Button';
import {percentToPx} from '../../constants';
import {AppStackParams} from '../../navigation/AppNavigation';
import {AuthStackParams} from '../../navigation/AuthNavigation';

export type WelcomeScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'WelcomeScreen'
>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}} className="h-screen bg-accent">
      <StatusBar
        backgroundColor="#38251F"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        className="h-full"
        colors={['#38251F', '#7A2F17', '#9A3314', '#C1390F', '#F94108']}
        style={{flex: 1}}>
        <ImageBackground
          resizeMode="cover"
          className="h-full"
          source={linearBg as ImageSourcePropType}>
          <View className="flex justify-center items-center" style={{flex: 1}}>
            <Image
              source={logo as ImageSourcePropType}
              resizeMode="contain"
              style={{
                width: responsiveWidth(50),
                marginTop: responsiveHeight(10),
              }}
            />
            <View
              className="flex justify-center items-center"
              style={{marginTop: responsiveHeight(57 / percentToPx)}}>
              <Text
                className="px-8 text-center text-white font-bold mb-1"
                style={{
                  fontSize: responsiveFontSize(24 / percentToPx),
                  lineHeight: responsiveFontSize(32 / percentToPx),
                }}>
                Your Digital Business Card at Your Fingertips!
              </Text>
              <View style={{marginTop: responsiveHeight(22 / percentToPx)}}>
                <Button
                  style={{
                    marginBottom: responsiveHeight(20 / percentToPx),
                    width: responsiveWidth(80),
                  }}
                  callback={() =>
                    navigation.navigate('PersonalInformationScreen')
                  }
                  text="Create New"
                />
                <Button
                  text="Log in"
                  showBackgroundColor={false}
                  style={{width: responsiveWidth(80)}}
                  callback={() => navigation.replace('LoginScreen')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default WelcomeScreen;
