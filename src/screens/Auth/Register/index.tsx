import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import {
  AuthStateKey,
  TokenKey,
  accentColor,
  percentToPx,
} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {useAuth} from '../../../hooks/useAuth';
import {IAuthState, IUser} from '../../../hooks/useAuth/interface';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {setDataToAsyncStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';
import cardService from '../../../services/card.service';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
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
  const {setAuthState, authed} = useAuth();
  const {step, socialLinks, personalInformation, contactDetails} =
    useCreateBusinessCard();

  const fromLoginScreen = params.fromLoginScreen;
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [creatingBusinessCard, setCreatingBusinessCard] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: '',
  });

  const handleCreateAccount = async () => {
    try {
      setCreatingAccount(true);
      const response = await authService.authenticate(
        credentials,
        'REGISTRATION',
      );

      if (!response.success) {
        setCreatingAccount(false);
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
      await setDataToAsyncStorage<IAuthState>(AuthStateKey, {
        user,
        token,
        authed: true,
      });

      setCreatingAccount(false);
      Toast.success({primaryText: 'Account created successfully.'});

      if (fromLoginScreen) {
        setAuthState({authed: true, token, user});
        return;
      }

      setCreatingBusinessCard(true);
      const mappedSocialLinks = socialLinks.map(item => ({
        url: item.url,
        title: item.title,
        platform: item.id,
      }));

      const cDetails = {
        email: contactDetails.email,
        mobile: contactDetails.mobile,
        websiteUrl: contactDetails.websiteUrl,
        companyAddress: contactDetails.companyAddress,
      };

      const res = await cardService.create({
        personalInformation,
        contactDetails: cDetails,
        socialLinks: mappedSocialLinks,
        companyLogo: contactDetails.companyLogo!,
        profileImage: contactDetails.profilePicture!,
      });

      setCreatingBusinessCard(false);
      if (!res.success) Toast.error({primaryText: res.message});
      setAuthState({authed: true, token, user});

      navigation.popToTop();
      navigation.replace('AppBottomNav');
      return;
    } catch (error) {
      Toast.error({
        primaryText: 'Something went wrong.',
        secondaryText: 'Please close and reopen the app.',
      });
    }
  };

  useEffect(() => {
    if (authed && !creatingAccount && !creatingBusinessCard) {
      navigation.popToTop();
      navigation.replace('AppBottomNav');
    }
  }, [authed, creatingAccount, creatingBusinessCard]);

  if (authed && !creatingAccount && !creatingBusinessCard) {
    navigation.popToTop();
    navigation.replace('AppBottomNav');

    return (
      <View className="h-screen w-full flex justify-center items-center bg-off-white-1">
        <ActivityIndicator color={accentColor} size={50} />
      </View>
    );
  }

  return (
    <View className="px-[40px] py-[53px] bg-white h-full">
      <HeaderStepCount
        step={step}
        showDotes={!fromLoginScreen}
        onBackPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <View className="mt-9 mb-[30px]">
        <HeaderWithText
          heading="CHOOSE PASSWORD"
          subtitle="Please choose a password for yourself to create the account."
        />
      </View>
      <View className="flex gap-[10px]">
        <View>
          <Text
            style={textStyles.robotoMedium}
            className="text-dark-blue mb-1 text-base font-bold text-off-white">
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
          <Text
            style={textStyles.robotoMedium}
            className="text-dark-blue mb-1 text-base font-bold text-off-white">
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
          <View
            className="absolute"
            style={{
              top: 35,
              right: responsiveHeight(6 / percentToPx),
            }}>
            {secureTextEntry ? (
              <EyeIcon
                size={27}
                color="#C9C9C9"
                onPress={() => setSecureTextEntry(false)}
              />
            ) : (
              <EyeSlashIcon
                size={27}
                color="#C9C9C9"
                onPress={() => setSecureTextEntry(true)}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{marginTop: responsiveHeight(52 / percentToPx)}}>
        <Button
          text={
            creatingBusinessCard
              ? 'Creating Your Business Card...'
              : 'Create Account'
          }
          showLoading={creatingAccount}
          callback={handleCreateAccount}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
