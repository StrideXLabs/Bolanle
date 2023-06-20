import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import bgImage from '../../../assets/images/bg-2.png';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams,
  'RegisterScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [authState, setAuthState] = useState<ICredentials>({
    email: '',
    password: '',
  });

  return (
    <ImageBackground
      className="h-screen"
      resizeMode="cover"
      source={bgImage as ImageSourcePropType}>
      <View className="flex justify-center items-center h-full">
        <View className="h-[55%] bg-accent w-[85%] rounded-lg py-[35px] pr-[40px] pl-[35px]">
          <Text className="text-5xl font-bold text-[#F7F6F0]">REGISTER</Text>
          <View className="mt-10">
            <View className="flex gap-2">
              <Text className="text-base font-bold text-[#F7F6F0]">Email</Text>
              <TextField
                value={authState.email}
                onChangeText={email =>
                  setAuthState(state => ({
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
              <Text className="text-base font-bold text-[#F7F6F0]">
                Password
              </Text>
              <TextField
                value={authState.password}
                onChangeText={password =>
                  setAuthState(state => ({...state, password}))
                }
                placeholder="Password"
                className="relative"
                secureTextEntry={secureTextEntry}
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
                <Text className="text-right text-base font-bold text-[#F7F6F0]">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-[102%] mt-auto">
            <Button
              text="Register"
              className="w-full"
              callback={() => {}}
              showBackgroundColor={false}
            />
            <View className="mt-4 flex flex-row justify-center">
              <Text className="text-[#F7F6F0]">Already have an Account?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="ml-1 text-[#F7F6F0] font-extrabold">
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

export default RegisterScreen;
