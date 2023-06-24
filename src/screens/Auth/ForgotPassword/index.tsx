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
import TextField from '../../../components/TextField/TextFieldLight';
import {AppStackParams} from '../../../navigation/AppNavigation';
import textStyles from '../../../constants/fonts';

export type LoginScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ForgotPasswordScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const ForgotPasswordScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [authState, setAuthState] = useState<ICredentials>({
    email: '',
    password: '',
  });

  return (
    <ImageBackground
      className="h-screen"
      resizeMode="contain"
      source={bgImage as ImageSourcePropType}>
      <View className="flex justify-center items-center h-full">
        <View className="h-[45%] bg-accent w-[85%] rounded-lg py-[35px] pr-[40px] pl-[35px]">
          <Text
            style={textStyles.bebasNeueBold}
            className="text-3xl font-bold text-off-white">
            FORGOT PASSWORD
          </Text>
          <Text
            style={textStyles.robotoMedium}
            className="mt-8 text-[18px] text-off-white">
            Please enter the registered email address to reset your password
          </Text>
          <View className="mt-8">
            <View className="flex gap-2">
              <Text
                style={textStyles.robotoMedium}
                className="text-base font-bold text-off-white">
                Email
              </Text>
              <TextField
                value={authState.email}
                autoFocus
                enablesReturnKeyAutomatically
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
          <View className="w-[102%] mt-auto">
            <Button
              text="Submit"
              className="w-full"
              callback={() => {}}
              showBackgroundColor={false}
            />
            <View className="mt-4 flex flex-row justify-center">
              <Text style={textStyles.robotoMedium} className="text-off-white">
                Go back to
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text
                  style={textStyles.robotoMedium}
                  className="ml-1 text-off-white font-extrabold">
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
