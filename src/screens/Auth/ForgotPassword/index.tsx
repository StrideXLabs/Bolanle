/* eslint-disable react-native/no-inline-styles */
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
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
import Button from '../../../components/Button';
import TextField from '../../../components/TextField/TextFieldDark';
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
    <View className="h-screen bg-white">
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View className="flex justify-center items-center h-full">
          {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}
          <View
            className="bg-secondary-blue w-[85%]"
            style={{
              borderRadius: 20,
              width: responsiveWidth(85),
              padding: responsiveHeight(38 / percentToPx),
              paddingLeft: responsiveHeight(35 / percentToPx),
            }}>
            <Text
              style={[{fontSize: responsiveFontSize(35 / percentToPx)}]}
              className="font-3 text-black text-center">
              FORGOT PASSWORD
            </Text>
            <Text
              style={[
                {
                  fontSize: responsiveFontSize(16 / percentToPx),
                  marginTop: responsiveHeight(30 / percentToPx),
                },
              ]}
              className="text-black font-0">
              Please enter the registered email address to reset your password
            </Text>
            <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
              <TextField
                value={email}
                keyboardType="email-address"
                placeholder="Enter email address"
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={{marginTop: responsiveHeight(50 / percentToPx)}}>
              <Button
                text="Submit"
                disabled={sendingEmail}
                showLoading={sendingEmail}
                callback={handleSentForgotEmail}
                style={{width: responsiveWidth(67)}}
              />
              <View className="mt-4 flex flex-row justify-center">
                <Text className="text-black font-0">Go back to</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text className="ml-1 text-black font-2">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;
