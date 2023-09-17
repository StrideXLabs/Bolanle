import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

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
import {useCredentials} from '../../../hooks/useCredentials';
import {setDataToAsyncStorage} from '../../../lib/storage';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {AuthStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';
import cardService from '../../../services/card.service';
import StaticContainerReg from '../../../containers/StaticContainerReg';
import GenericTextField from '../../../components/TextField/GenericTextField/GenericTextField';

export type RegisterScreenProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'RegisterScreen'
>;

export interface ICredentials {
  email: string;
  password: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const authed = useAuth(state => state.authed);
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
  const {email, password, setEmail, setPassword} = useCredentials();

  const handleCreateAccount = async () => {
    try {
      setCreatingAccount(true);
      const response = await authService.register({email, password});

      if (!response.success) {
        setCreatingAccount(false);
        return Toast.error({primaryText: response.message});
      }

      const token = response.data?.token ?? '';
      await setDataToAsyncStorage(TokenKey, token);

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
        coverVideo: '',
        lat: contactDetails.lat,
        lng: contactDetails.lng,
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
      navigation.replace('EmailVerificationScreen', {
        verificationToken: response.data?.verificationToken || '',
      });
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
      <StaticContainerReg
        isBack
        isHeader
        title="Social links"
        onBackPress={() => {
          setStep(step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}>
        <View
          className="w-full"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <View
              className="w-full"
              style={{
                marginTop: responsiveHeight(10 / percentToPx),
                marginBottom: responsiveHeight(20 / percentToPx),
              }}>
              <Text className="text-lg font-3 text-black text-center">
                Step 4: Enter a password
              </Text>
            </View>
            <View>
              <GenericTextField
                value={email}
                keyboardType="email-address"
                placeholder="Email address"
                autoCapitalize="none"
                onChangeText={email => setEmail(email)}
              />
              <View style={{marginTop: responsiveHeight(10 / percentToPx)}}>
                <GenericTextField
                  value={password}
                  className="relative"
                  placeholder="Password"
                  secureTextEntry={secureTextEntry}
                  onChangeText={password => setPassword(password)}
                />
                <View
                  className="absolute"
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: responsiveHeight(8 / percentToPx),
                  }}>
                  {secureTextEntry ? (
                    <EyeIcon
                      size={25}
                      color="#1C75BC"
                      onPress={() => setSecureTextEntry(false)}
                    />
                  ) : (
                    <EyeSlashIcon
                      size={25}
                      color="#1C75BC"
                      onPress={() => setSecureTextEntry(true)}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
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

          <HeaderStepCount
            step={step}
            onBackPress={() => {
              setStep(step - 1);
              navigation.canGoBack() && navigation.goBack();
            }}
          />
        </View>
      </StaticContainerReg>
    </Layout>
  );
};

export default RegisterScreen;
