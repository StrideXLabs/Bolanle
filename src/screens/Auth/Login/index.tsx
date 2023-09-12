import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import Button from '../../../components/Button';
import TextField from '../../../components/TextField/GenericTextField/GenericTextField';
import {AuthStateKey, TokenKey, percentToPx} from '../../../constants';
import {useAuth} from '../../../hooks/useAuth';
import {IAuthState, IUser} from '../../../hooks/useAuth/interface';
import {useCredentials} from '../../../hooks/useCredentials';
import {setDataToAsyncStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';
import Layout from '../../../components/Layout';
import StaticContainer from '../../../containers/StaticContainer';
import {appleIcon, facebookIcon, googleIcon} from '../../../constants/icons';

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParams & AppStackParams,
  'LoginScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {authed, setAuthState} = useAuth();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, password, setEmail, setPassword} = useCredentials();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authService.login({email, password});

      if (!response.success) {
        setLoading(false);
        return Toast.error({primaryText: response.message});
      }

      if (!response.data?.isVerified && !response.data?.token) {
        return navigation.navigate('EmailVerificationScreen', {
          verificationToken: '',
        });
      }

      const token = response.data?.token ?? '';
      const decodedUser = decodeJWT(token) as {[key: string]: string | number};
      const user = {
        id: decodedUser._id,
        name: decodedUser.name,
        email: decodedUser.email,
        expires: decodedUser.exp,
      } as IUser;

      await setDataToAsyncStorage(TokenKey, token);
      await setDataToAsyncStorage(AuthStateKey, {
        user,
        token,
        authed: true,
      } as IAuthState);

      setAuthState({authed: true, token, user});
      navigation.replace('AppBottomNav');
    } catch (error) {
      Toast.error({
        primaryText: 'Something went wrong.',
        secondaryText: 'Please close and reopen the app.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!loading && authed) {
    navigation.replace('AppBottomNav');
    return null;
  }

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  return (
    <Layout>
      <StaticContainer isBack isHeader title="Home">
        {/* <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"> */}
        <View
          className="flex justify-start items-center"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <Text
              className="font-3 text-center text-black"
              style={{
                marginBottom: responsiveHeight(20 / percentToPx),
                marginTop: responsiveHeight(14 / percentToPx),
                fontSize: responsiveFontSize(16 / percentToPx),
              }}>
              Enter your details to sign in to your account!
            </Text>
            <TextField
              value={email}
              keyboardType="email-address"
              placeholder="Email Address"
              autoCapitalize="none"
              onChangeText={email => setEmail(email)}
            />
            <View
              style={{
                marginTop: responsiveHeight(22 / percentToPx),
                position: 'relative',
              }}>
              <TextField
                value={password}
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                onChangeText={password => setPassword(password)}
              />
              <View
                className="absolute"
                style={{
                  top: responsiveHeight(10 / percentToPx),
                  right: responsiveHeight(10 / percentToPx),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {secureTextEntry ? (
                  <EyeIcon
                    size={25}
                    color="black"
                    onPress={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <EyeSlashIcon
                    size={25}
                    color="black"
                    onPress={() => setSecureTextEntry(true)}
                  />
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{marginTop: responsiveHeight(16 / percentToPx)}}
              onPress={() => navigation.push('ForgotPasswordScreen')}>
              <Text className="font-3 text-black ml-1">Forgot password?</Text>
            </TouchableOpacity>

            <View style={{marginTop: responsiveHeight(24 / percentToPx)}}>
              <Button
                text="Login"
                disabled={loading}
                showLoading={loading}
                callback={handleLogin}
                showBackgroundColor={true}
              />
              <View
                className="flex flex-row justify-center"
                style={{marginTop: responsiveHeight(14 / percentToPx)}}>
                <Text className="text-black font-1">
                  Don't have an Account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    console.log('Clicked');
                    navigation.navigate('PersonalInformationScreen', {
                      cardId: null,
                      status: 'CREATING',
                    });
                  }}>
                  <Text className="ml-1 text-black font-3">Create One</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              className="flex justify-center items-center"
              style={{marginTop: responsiveHeight(14 / percentToPx)}}>
              <Text className="font-2 text-black">- Or Login with -</Text>
            </View>

            <View
              className="flex flex-row justify-between items-center gap-2"
              style={{marginTop: responsiveHeight(14 / percentToPx)}}>
              <TouchableOpacity
                style={{flex: 1}}
                className="p-3 bg-white rounded-lg">
                <View className="flex flex-row items-center justify-center space-x-1">
                  <Image
                    source={googleIcon as any}
                    className={`h-4 w-4`}
                    resizeMode="contain"
                  />
                  <Text className="font-1 text-black text-sm">Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                className="p-3 bg-white rounded-lg">
                <View className="flex flex-row items-center justify-center space-x-1">
                  <Image
                    source={appleIcon as any}
                    className={`h-4 w-4`}
                    resizeMode="contain"
                  />
                  <Text className="font-1 text-black text-sm">Apple</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                className="p-3 bg-white rounded-lg">
                <View className="flex flex-row items-center justify-center space-x-1">
                  <Image
                    source={facebookIcon as any}
                    className={`h-4 w-4`}
                    resizeMode="contain"
                  />
                  <Text className="font-1 text-black text-sm">Facebook</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </StaticContainer>
    </Layout>
  );
};

export default LoginScreen;
