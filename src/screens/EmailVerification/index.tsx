import {NativeStackScreenProps} from '@react-navigation/native-stack';
import decodeJWT from 'jwt-decode';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
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
import {AuthStateKey, accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useAuth} from '../../hooks/useAuth';
import {IAuthState, IUser} from '../../hooks/useAuth/interface';
import {useCredentials} from '../../hooks/useCredentials';
import {setDataToAsyncStorage} from '../../lib/storage';
import Toast from '../../lib/toast';
import {AuthStackParams} from '../../navigation/AuthNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import authService from '../../services/auth.service';

export type EmailVerificationScreenProps = NativeStackScreenProps<
  AuthStackParams & BottomTabNavigatorParams,
  'EmailVerificationScreen'
>;

const EmailVerificationScreen = ({
  navigation,
  route: {
    params: {verificationToken},
  },
}: EmailVerificationScreenProps) => {
  const [resending, setResending] = useState(false);
  const {email, setEmail, setPassword} = useCredentials();
  const setAuthState = useAuth(state => state.setAuthState);
  const [authenticating, setAuthenticating] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const tokenRef = useRef<string | null>(null);
  const authTimerRef = useRef<number | null>(null);
  const resendTimerRef = useRef<number | null>(0);
  const verifyTimerRef = useRef<number | null>(null);
  const verificationTokenRef = useRef<string | null>(verificationToken || null);

  const handleResend = async () => {
    try {
      setResending(true);
      const response = await authService.resendVerificationMail(
        verificationTokenRef.current || '',
        email,
      );

      if (!response.success) {
        setResending(false);
        return Toast.error({primaryText: response.message});
      }

      setResending(false);
      Toast.success({primaryText: 'Verification mail sent.'});
      verificationTokenRef.current = response.data?.verificationToken || '';
      resendTimerRef.current = setTimeout(handleVerification, 300);
    } catch (error) {
      setResending(false);
      Toast.error({primaryText: 'Something went wrong.'});
    }
  };

  const handleVerification = async () => {
    try {
      const response = await authService.verify(
        verificationTokenRef.current || '',
      );

      if (!response.success) return;

      tokenRef.current = response.data?.token || '';
      verifyTimerRef.current = setTimeout(handleSignIn, 300);
      setIsEmailVerified(true);
    } catch (error) {
      Toast.error({primaryText: 'Something went wrong.'});
    }
  };

  const handleSignIn = async () => {
    setAuthenticating(true);
    const token = tokenRef.current || '';
    const decodedUser = decodeJWT(token) as {[key: string]: string | number};
    const user = {
      id: decodedUser._id,
      name: decodedUser.name,
      email: decodedUser.email,
      expires: decodedUser.exp,
    } as IUser;

    await setDataToAsyncStorage<IAuthState>(AuthStateKey, {
      user,
      token,
      authed: true,
    });

    setEmail('');
    setPassword('');

    authTimerRef.current = setTimeout(() => {
      setAuthenticating(false);
      setAuthState({authed: true, token, user});
    }, 500);
  };

  useEffect(() => {
    if (isEmailVerified) return;

    const id =
      !isEmailVerified && !resending && verificationTokenRef.current
        ? setInterval(handleVerification, 500)
        : null;

    return () => {
      id && clearInterval(id);
    };
  }, [isEmailVerified]);

  useEffect(() => {
    if (isEmailVerified) return;

    if (
      email &&
      !resending &&
      !isEmailVerified &&
      !verificationTokenRef.current
    )
      handleResend();
  }, [isEmailVerified]);

  useEffect(() => {
    return () => {
      authTimerRef.current && clearTimeout(authTimerRef.current);
      verifyTimerRef.current && clearTimeout(verifyTimerRef.current);
    };
  }, []);

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
                <Pressable onPress={handleResend}>
                  <Text
                    style={[
                      textStyles.robotoBold,
                      {fontSize: responsiveFontSize(12 / percentToPx)},
                    ]}>
                    Resend Email
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {authenticating ||
        (resending && (
          <View
            className="absolute h-full w-full"
            style={styles.modalBackGround}>
            <View style={styles.modalContainer}>
              <ActivityIndicator color={accentColor} size="large" />
              <Text
                style={[
                  textStyles.robotoMedium,
                  {marginTop: responsiveHeight(12 / percentToPx)},
                ]}
                className="text-center">
                {authenticating
                  ? 'Completing your Sign In Process...'
                  : 'Resending email...'}
              </Text>
            </View>
          </View>
        ))}
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
