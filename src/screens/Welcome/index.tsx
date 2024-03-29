import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import logo from '../../assets/images/logo.png';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import {percentToPx} from '../../constants';
import {AppStackParams} from '../../navigation/AppNavigation';
import {AuthStackParams} from '../../navigation/AuthNavigation';
import {newLogo} from '../../constants/icons';
import LinearGradient from 'react-native-linear-gradient';

export type WelcomeScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'WelcomeScreen'
>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  return (
    <Layout>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={{flex: 1}}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={{flex: 1}}>
          <View className="h-[90%] justify-end">
            <View className="flex justify-end items-start">
              <View className="flex flex-row gap-2 items-center ml-4">
                <Image
                  source={newLogo as ImageSourcePropType}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(18),
                    height: responsiveWidth(18),
                  }}
                />
                <Text className="font-6 font-semibold text-white text-2xl tracking-widest -m-3">
                  HELLO{'\n'}BOLANLE
                </Text>
              </View>
            </View>
            <View className="flex justify-start items-center">
              <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
                <Text
                  className="text-start text-white font-2 mb-1"
                  style={{
                    fontSize: responsiveFontSize(22 / percentToPx),
                    lineHeight: responsiveFontSize(30 / percentToPx),
                  }}>
                  Digital Business Card{'\n'}at Your Fingertips!
                </Text>
                <View
                  className="flex justify-center items-center"
                  style={{marginTop: responsiveHeight(22 / percentToPx)}}>
                  <Button
                    text="Log in"
                    showBackgroundColor={false}
                    style={{
                      width: responsiveWidth(85),
                      marginBottom: responsiveHeight(20 / percentToPx),
                    }}
                    callback={() => navigation.navigate('LoginScreen')}
                  />
                  <Button
                    style={{
                      width: responsiveWidth(85),
                    }}
                    callback={() =>
                      navigation.navigate('PersonalInformationScreen', {
                        cardId: null,
                        status: 'CREATING',
                      })
                    }
                    text="Create New"
                  />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Layout>
  );
};

export default WelcomeScreen;
