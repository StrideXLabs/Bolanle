import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import bgImage from '../../../assets/images/bg-2.png';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField/TextFieldLight';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {useAuth} from '../../../hooks/useAuth';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';

export type LoginScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'ForgotPasswordScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const ForgotPasswordScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {authed} = useAuth();
  const [email, setEmail] = useState('');

  if (authed) {
    navigation.replace('AppBottomNav');
    return null;
  }

  return (
    <ImageBackground
      className="h-screen"
      resizeMode="contain"
      source={bgImage as ImageSourcePropType}>
      <View className="flex justify-center items-center h-full">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View
          className="bg-accent w-[85%] rounded-lg"
          style={{
            width: responsiveWidth(85),
            padding: responsiveHeight(38 / percentToPx),
            paddingLeft: responsiveHeight(35 / percentToPx),
          }}>
          <Text
            style={[
              textStyles.bebasNeueBold,
              {fontSize: responsiveFontSize(35 / percentToPx)},
            ]}
            className="font-bold text-off-white-1">
            FORGOT PASSWORD
          </Text>
          <Text
            style={[
              textStyles.robotoRegular,
              {
                fontSize: responsiveFontSize(16 / percentToPx),
                marginTop: responsiveHeight(30 / percentToPx),
              },
            ]}
            className="text-off-white-1">
            Please enter the registered email address to reset your password
          </Text>
          <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
            <TextField
              label="Email"
              value={email}
              keyboardType="email-address"
              placeholder="john@gmail.com"
              enablesReturnKeyAutomatically
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={{marginTop: responsiveHeight(50 / percentToPx)}}>
            <Button
              text="Submit"
              callback={() => {}}
              showBackgroundColor={false}
              style={{width: responsiveWidth(67)}}
            />
            <View className="mt-4 flex flex-row justify-center">
              <Text
                style={textStyles.robotoRegular}
                className="text-off-white-1">
                Go back to
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text
                  style={textStyles.robotoBold}
                  className="ml-1 text-off-white-1 font-extrabold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;
