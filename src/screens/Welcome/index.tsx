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

import linearBg from '../../assets/images/bg-2.png';
import logo from '../../assets/images/logo.png';
import Button from '../../components/Button';
import {AppStackParams} from '../../navigation/AppNavigation';

export type WelcomeScreenProps = NativeStackScreenProps<
  AppStackParams,
  'WelcomeScreen'
>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View className="h-screen">
      <StatusBar
        animated
        showHideTransition="slide"
        backgroundColor="#38251F"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        colors={['#38251F', '#7A2F17', '#9A3314', '#C1390F', '#F94108']}
        style={{flex: 1}}>
        <ImageBackground
          className="h-full"
          resizeMode="cover"
          source={linearBg as ImageSourcePropType}>
          <View className="h-full flex justify-center items-center flex-col">
            <View className="h-3/5 mt-20 items-center justify-center">
              <Image
                source={logo as ImageSourcePropType}
                className="w-[198px]"
                resizeMode="contain"
              />
            </View>
            <View className="-mt-24 flex-grow justify-self-end items-center">
              <Text className="px-8 text-center text-white text-[32px] font-bold mb-1">
                Your Digital Business Card at Your Fingertips!
              </Text>
              <View className="mt-5">
                <Button
                  className="mb-5"
                  callback={() =>
                    navigation.replace('PersonalInformationScreen')
                  }
                  text="Create New"
                />
                <Button
                  text="Log in"
                  showBackgroundColor={false}
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
