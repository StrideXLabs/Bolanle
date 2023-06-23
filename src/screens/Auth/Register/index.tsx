import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {AppStackParams} from '../../../navigation/AppNavigation';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams,
  'RegisterScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {step} = useCreateBusinessCard();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [authState, setAuthState] = useState<ICredentials>({
    email: '',
    password: '',
  });

  return (
    <View className="px-[40px] py-[53px]">
      <HeaderStepCount
        step={step}
        onBackPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <Text>PersonalInformation</Text>
      <View className="mt-9 mb-[30px]">
        <HeaderWithText
          heading="CHOOSE PASSWORD"
          subtitle="Please choose a password for yourself to create the account."
        />
      </View>

      <View className="flex gap-[10px]">
        <View>
          <Text className="text-dark-blue mb-1 text-base font-bold text-off-white">
            Email
          </Text>
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
        <View>
          <Text className="text-dark-blue mb-1 text-base font-bold text-off-white">
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
        </View>
        <Button
          text="Create Account"
          callback={() => {}}
          className="w-full ml-1 mt-[52px]"
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
