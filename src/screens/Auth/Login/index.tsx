import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useState} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';

import bgImage from '../../../assets/images/bg-2.png';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField/TextFieldLight';
import {AuthStateKey, TokenKey} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {useAuth} from '../../../hooks/useAuth';
import {IUser} from '../../../hooks/useAuth/interface';
import {setDataToAsyncStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import authService from '../../../services/auth.service';

export type LoginScreenProps = NativeStackScreenProps<
  AppStackParams,
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
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authService.authenticate(credentials, 'LOGIN');

      if (!response.success) {
        setLoading(false);
        return Toast.error({primaryText: response.message});
      }

      const token = response.data?.token ?? '';
      const decodedUser = decodeJWT(token) as {[key: string]: string | number};
      const user = {
        id: decodedUser._id,
        email: decodedUser.email,
        expires: decodedUser.exp,
      } as IUser;

      await setDataToAsyncStorage(TokenKey, token);
      await setDataToAsyncStorage('user', user);
      await setDataToAsyncStorage(AuthStateKey, {authed: true, token, user});

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

  return (
    <ImageBackground
      className="h-screen"
      resizeMode="cover"
      source={bgImage as ImageSourcePropType}>
      <View className="flex justify-center items-center h-full">
        <View className="h-[55%] bg-accent w-[85%] rounded-lg py-[35px] pr-[40px] pl-[35px]">
          <Text
            style={textStyles.bebasNeueBold}
            className="text-5xl font-bold text-off-white">
            LOGIN
          </Text>
          <View className="mt-10">
            <View className="flex gap-2">
              <Text
                style={textStyles.robotoMedium}
                className="text-base font-bold text-off-white">
                Email
              </Text>
              <TextField
                value={credentials.email}
                onChangeText={email =>
                  setCredentials(state => ({
                    ...state,
                    email,
                  }))
                }
                placeholder="john@gmail.com"
              />
            </View>
          </View>
          <View className="mt-6">
            <View className="flex gap-2">
              <Text className="text-base font-bold text-off-white">
                Password
              </Text>
              <TextField
                value={credentials.password}
                onChangeText={password =>
                  setCredentials(state => ({...state, password}))
                }
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                className="relative"
              />
              <View className="absolute right-1 top-[41px]">
                {secureTextEntry ? (
                  <EyeIcon
                    size={27}
                    color="white"
                    onPress={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <EyeSlashIcon
                    size={27}
                    color="white"
                    onPress={() => setSecureTextEntry(true)}
                  />
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('ForgotPasswordScreen')}>
                <Text className="text-right text-base font-bold text-off-white">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-[102%] mt-auto">
            <Button
              text="Login"
              className="w-full"
              showLoading={loading}
              callback={handleLogin}
              showBackgroundColor={false}
            />
            <View className="mt-4 flex flex-row justify-center">
              <Text className="text-off-white">Don't have an Account?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('RegisterScreen', {fromLoginScreen: true})
                }>
                <Text className="ml-1 text-off-white font-extrabold">
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
