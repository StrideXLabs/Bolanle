import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {HttpError} from 'http-errors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import bgImage from '../../../assets/images/background.png';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField/TextFieldLight';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {useAuth} from '../../../hooks/useAuth';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';

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
  const idRef = useRef<number | null>(null);

  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  if (authed) {
    navigation.replace('AppBottomNav');
    return null;
  }

  const handleSentForgotEmail = async () => {
    try {
      setSendingEmail(true);
      const response = await authService.sendForgotPasswordEmail(email);

      if (!response.success)
        return Toast.error({primaryText: response.message});

      setSendingEmail(false);
      Toast.success({primaryText: 'Email sent successfully.'});

      idRef.current = setTimeout(() => navigation.navigate('LoginScreen'), 300);
    } catch (error) {
      setSendingEmail(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  useEffect(() => {
    return () => {
      idRef.current && clearTimeout(idRef.current);
    };
  }, []);

  return (
    <ImageBackground
      className="h-screen"
      resizeMode="contain"
      source={bgImage as ImageSourcePropType}>
      <View className="flex justify-center items-center h-full">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View
          className="bg-accent w-[85%]"
          style={{
            borderRadius: 20,
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
              disabled={sendingEmail}
              showLoading={sendingEmail}
              showBackgroundColor={false}
              callback={handleSentForgotEmail}
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
