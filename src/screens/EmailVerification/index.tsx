import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import clockIcon from '../../assets/images/clock.png';
import doneIcon from '../../assets/images/done.png';
import emailLarge from '../../assets/images/email-large.png';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import Layout from '../../components/Layout';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {AuthStackParams} from '../../navigation/AuthNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';

export type EmailVerificationScreenProps = NativeStackScreenProps<
  AuthStackParams & BottomTabNavigatorParams,
  'EmailVerificationScreen'
>;

const EmailVerificationScreen = ({
  navigation,
  route: {
    params: {isVerified},
  },
}: EmailVerificationScreenProps) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(isVerified ?? false);

  const handleSignIn = async () => {
    setAuthenticating(true);
  };

  useEffect(() => {
    if (!isEmailVerified) return;

    const id = setTimeout(() => {
      handleSignIn();
    }, 300);

    return () => clearTimeout(id);
  }, [isEmailVerified]);

  return (
    <Layout>
      <ScrollView
        className="h-screen"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        <View
          style={{
            paddingVertical: responsiveHeight(32 / percentToPx),
            paddingHorizontal: responsiveHeight(40 / percentToPx),
          }}>
          <HeaderStepCount
            showDotes={false}
            onBackPress={() => {
              navigation.replace('LoginScreen');
            }}
          />
          <View
            style={{
              marginTop: responsiveHeight(20 / percentToPx),
              marginBottom: responsiveHeight(22 / percentToPx),
            }}>
            <HeaderWithText
              heading="EMAIL CONFIRMATION"
              subtitle={
                isEmailVerified
                  ? 'Your email is verified and your are all set to use your account.'
                  : 'Please verify your email by clicking on the verification link sent on your email address.'
              }
            />
          </View>
          <View
            className="flex justify-center items-center"
            style={{
              marginTop: responsiveHeight(120 / percentToPx),
            }}>
            <Image
              resizeMode="center"
              source={emailLarge as ImageSourcePropType}
              style={{
                width: responsiveWidth(230 / percentToPx),
                height: responsiveHeight(80 / percentToPx),
              }}
            />
            <View
              className="flex flex-row items-center"
              style={{
                marginTop: responsiveHeight(35 / percentToPx),
              }}>
              <Image
                resizeMode="contain"
                source={
                  (isEmailVerified
                    ? doneIcon
                    : clockIcon) as ImageSourcePropType
                }
                style={{
                  width: responsiveWidth(35 / percentToPx),
                  height: responsiveHeight(40 / percentToPx),
                  marginRight: responsiveHeight(3 / percentToPx),
                }}
              />
              <Text
                style={[
                  textStyles.robotoBold,
                  {fontSize: responsiveFontSize(20 / percentToPx)},
                ]}>
                {isEmailVerified
                  ? 'Email verification completed'
                  : 'Waiting for email verification'}
              </Text>
            </View>
            {!isEmailVerified && (
              <View className="flex flex-row items-center">
                <Text style={{marginRight: responsiveHeight(3 / percentToPx)}}>
                  Haven't received the email yet?
                </Text>
                <Text
                  style={[
                    textStyles.robotoBold,
                    {fontSize: responsiveFontSize(12 / percentToPx)},
                  ]}>
                  Resend Email
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {authenticating && (
        <View className="absolute h-full w-full" style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <ActivityIndicator color={accentColor} size="large" />
            <Text
              style={[
                textStyles.robotoMedium,
                {marginTop: responsiveHeight(12 / percentToPx)},
              ]}
              className="text-center">
              Completing your Sign In Process...
            </Text>
          </View>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(41, 44, 51, 0.6)',
  },
  modalContainer: {
    zIndex: 100,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: responsiveWidth(55),
    height: responsiveHeight(17),
    borderRadius: responsiveHeight(1),
    paddingVertical: responsiveHeight(13 / percentToPx),
    paddingHorizontal: responsiveHeight(15 / percentToPx),
  },
});

export default EmailVerificationScreen;
