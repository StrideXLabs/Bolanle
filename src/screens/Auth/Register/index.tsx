import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import Layout from '../../../components/Layout';
import TextField from '../../../components/TextField/TextFieldDark';
import {
  AuthStateKey,
  TokenKey,
  accentColor,
  percentToPx,
} from '../../../constants';
import {useAuth} from '../../../hooks/useAuth';
import {IAuthState, IUser} from '../../../hooks/useAuth/interface';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../../hooks/useBusinessCard/constants';
import {useRegisterUser} from '../../../hooks/useRegisterUser';
import {setDataToAsyncStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';
import cardService from '../../../services/card.service';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'RegisterScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {setAuthState, authed} = useAuth();
  const {
    step,
    setStep,
    socialLinks,
    setSocialItems,
    contactDetails,
    setSocialLinks,
    setContactDetails,
    personalInformation,
    setPersonalInformation,
  } = useCreateBusinessCard();

  const [creatingAccount, setCreatingAccount] = useState(false);
  const [creatingBusinessCard, setCreatingBusinessCard] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {email, password, setEmail, setPassword} = useRegisterUser();

  const handleCreateAccount = async () => {
    try {
      setCreatingAccount(true);
      const response = await authService.authenticate(
        {email, password},
        'REGISTRATION',
      );

      if (!response.success) {
        setCreatingAccount(false);
        return Toast.error({primaryText: response.message});
      }

      const token = response.data ?? '';
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
        companyLogo: contactDetails.companyLogo as PickerImage,
        profileImage: contactDetails.profilePicture as PickerImage,
      });

      setCreatingBusinessCard(false);
      if (!res.success) Toast.error({primaryText: res.message});

      await Promise.all([
        setStep(0),
        setSocialItems([]),
        setSocialLinks([]),
        setContactDetails(initialContactDetails),
        setPersonalInformation(initialPersonalInformation),
      ]);

      navigation.popToTop();
      navigation.replace('EmailVerificationScreen', {isVerified: false});
      // setAuthState({authed: true, token, user});
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
    <Layout>
      <View className="px-[40px] py-[53px]">
        <HeaderStepCount
          step={step}
          onBackPress={() => {
            setStep(step - 1);
            navigation.canGoBack() && navigation.goBack();
          }}
        />
        <View className="mt-9 mb-[30px]">
          <HeaderWithText
            heading="CHOOSE PASSWORD"
            subtitle="Please choose a password for yourself to create the account."
          />
        </View>
        <View>
          <TextField
            value={email}
            keyboardType="email-address"
            placeholder="john@gmail.com"
            onChangeText={email => setEmail(email)}
          />
          <View style={{marginTop: responsiveHeight(10 / percentToPx)}}>
            <TextField
              value={password}
              className="relative"
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              onChangeText={password => setPassword(password)}
            />
            <View
              className="absolute"
              style={{
                top: 12,
                right: responsiveHeight(8 / percentToPx),
              }}>
              {secureTextEntry ? (
                <EyeIcon
                  size={25}
                  color="#C9C9C9"
                  onPress={() => setSecureTextEntry(false)}
                />
              ) : (
                <EyeSlashIcon
                  size={25}
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
            disabled={creatingAccount || creatingBusinessCard}
          />
        </View>
      </View>
    </Layout>
  );
};

export default RegisterScreen;
