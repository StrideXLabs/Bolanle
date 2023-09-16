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
import Layout from '../../../components/Layout';
import StaticContainerReg from '../../../containers/StaticContainerReg';
import GenericTextField from '../../../components/TextField/GenericTextField/GenericTextField';

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
    <Layout>
      <StaticContainerReg
        isBack
        isHeader
        title="Login"
        onBackPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}>
        <ScrollView
          contentContainerStyle={{
            marginVertical: responsiveHeight(10 / percentToPx),
          }}
          keyboardShouldPersistTaps="handled">
          <View className="flex justify-center items-center h-full">
            <View
              className="bg-secondary-blue w-full"
              style={{
                borderRadius: 20,
                width: responsiveWidth(85),
                padding: responsiveHeight(38 / percentToPx),
                paddingLeft: responsiveHeight(35 / percentToPx),
              }}>
              <Text className="text-black font-3 text-center text-xl">
                Forgot your password?
              </Text>
              <Text
                style={[
                  {
                    fontSize: responsiveFontSize(16 / percentToPx),
                    marginTop: responsiveHeight(30 / percentToPx),
                  },
                ]}
                className="text-black font-1">
                Please enter your registered email address to reset your
                password.
              </Text>
              <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
                <GenericTextField
                  value={email}
                  keyboardType="email-address"
                  placeholder="Enter email address"
                  autoCapitalize="none"
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
                <Button
                  text="Submit"
                  disabled={sendingEmail}
                  showLoading={sendingEmail}
                  showBackgroundColor
                  callback={handleSentForgotEmail}
                  style={{width: responsiveWidth(67)}}
                />
                <View className="mt-4 flex flex-row justify-center">
                  <Text className="text-black font-1">Go back to</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text className="ml-1 text-black font-3">Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </StaticContainerReg>
    </Layout>
  );
};

export default ForgotPasswordScreen;
