import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
  return (
    <View className="h-full bg-white">
      <View className="flex justify-center items-center" style={{flex: 1}}>
        <Image
          source={logo as ImageSourcePropType}
          resizeMode="contain"
          style={{
            width: responsiveWidth(50),
            height: responsiveWidth(50),
            marginTop: responsiveHeight(10),
          }}
        />
        <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
          <Text
            className="px-8 text-center text-accent font-bold mb-1"
            style={{
              fontSize: responsiveFontSize(22 / percentToPx),
              lineHeight: responsiveFontSize(30 / percentToPx),
            }}>
            Your Digital Business Card at Your Fingertips!
          </Text>
          <View
            className="flex justify-center items-center"
            style={{marginTop: responsiveHeight(22 / percentToPx)}}>
            <Button
              style={{
                width: responsiveWidth(80),
                marginBottom: responsiveHeight(20 / percentToPx),
              }}
              callback={() =>
                navigation.navigate('PersonalInformationScreen', {
                  cardId: null,
                  status: 'CREATING',
                })
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
    </View>
  );
};

export default WelcomeScreen;
