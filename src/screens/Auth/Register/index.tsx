import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import {TOKEN} from '../../../constants';
import {socialMappings} from '../../../constants/socials';
import {useAuth} from '../../../hooks/useAuth';
import {IUser} from '../../../hooks/useAuth/interface';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {setTokenToStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import authService from '../../../services/auth.service';
import cardService from '../../../services/card.service';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams,
  'RegisterScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
  route: {params},
}) => {
  const showHeader = params?.showHeader ?? true;
  const {setAuthState} = useAuth();
  const {step, socialLinks, personalInformation, contactDetails} =
    useCreateBusinessCard();

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: '',
  });

  const handleCreateAccount = async () => {
    try {
      setCreatingAccount(true);
      const response = await authService.register(credentials);

      if (!response.success) {
        setCreatingAccount(false);
        return Toast.error({primaryText: response.message});
      }

      setCreatingAccount(false);
      Toast.success({primaryText: 'Account created successfully.'});

      const token = response.data?.token ?? '';
      await setTokenToStorage(TOKEN, token);

      const decodedUser = decodeJWT(token) as {[key: string]: string | number};
      const user = {
        id: decodedUser._id,
        email: decodedUser.email,
        expires: decodedUser.exp,
      } as IUser;

      const mappedSocialLinks = socialLinks.map(item => ({
        url: item.url,
        title: item.title,
        platform: socialMappings[item.id],
      }));

      const res = await cardService.create({
        contactDetails,
        personalInformation,
        socialLinks: mappedSocialLinks,
        companyLogo: contactDetails.companyLogo!,
        profileImage: contactDetails.profilePicture!,
      });

      console.log(res);

      if (!res.success) Toast.error({primaryText: res.message});
      else Toast.success({primaryText: res.message});

      setAuthState({authed: true, token, user});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="px-[40px] py-[53px]">
      <HeaderStepCount
        step={step}
        showDotes={showHeader}
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
            value={credentials.email}
            keyboardType="email-address"
            placeholder="john@gmail.com"
            onChangeText={email => setCredentials(state => ({...state, email}))}
          />
        </View>
        <View>
          <Text className="text-dark-blue mb-1 text-base font-bold text-off-white">
            Password
          </Text>
          <TextField
            value={credentials.password}
            onChangeText={password =>
              setCredentials(state => ({...state, password}))
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
          showLoading={creatingAccount}
          callback={handleCreateAccount}
          className="w-full ml-1 mt-[52px]"
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
