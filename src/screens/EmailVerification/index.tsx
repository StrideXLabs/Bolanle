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
import StaticContainerReg from '../../containers/StaticContainerReg';

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
      <StaticContainerReg
        isBack
        isHeader
        title="Confirmation"
        onBackPress={() => {
          navigation.replace('LoginScreen');
        }}>
        <ScrollView
          className="h-screen w-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <View
              className="w-full"
              style={{
                paddingVertical: responsiveHeight(17 / percentToPx),
                paddingHorizontal: responsiveHeight(4 / percentToPx),
              }}>
              <View className="flex flex-col">
                <Text className="font-2 text-2xl text-center text-black">
                  EMAIL CONFIRMATION
                </Text>
                <Text className="font-1 text-md mt-4 text-center">
                  {isEmailVerified
                    ? 'Your email is verified and your are all set to use your account.'
                    : 'Please verify your email by clicking on the verification link sent on your email address. If you did not recieve it, kindly check your Spam/Junk folder.'}
                </Text>
              </View>
              <View
                className="flex justify-center items-center"
                style={{
                  marginTop: responsiveHeight(20 / percentToPx),
                }}>
                <Image
                  resizeMode="contain"
                  source={emailLarge as ImageSourcePropType}
                  style={{
                    height: responsiveHeight(100 / percentToPx),
                    aspectRatio: 1,
                  }}
                />
                <View
                  className="flex flex-row items-center justify-center"
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
                      height: responsiveHeight(35 / percentToPx),
                      marginRight: responsiveHeight(6 / percentToPx),
                      marginBottom: responsiveHeight(2 / percentToPx),
                    }}
                  />
                  <Text
                    style={{fontSize: responsiveFontSize(16 / percentToPx)}}
                    className="font-1">
                    {isEmailVerified
                      ? 'Email verification completed'
                      : 'Waiting for email verification'}
                  </Text>
                </View>
                {!isEmailVerified && (
                  <View className="flex flex-col items-center">
                    <Text
                      className="font-1"
                      style={{marginRight: responsiveHeight(3 / percentToPx)}}>
                      Haven't received the email yet?
                    </Text>
                    <Pressable onPress={handleResend}>
                      <Text
                        style={[
                          {fontSize: responsiveFontSize(14 / percentToPx)},
                        ]}
                        className="font-3">
                        Resend Email
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
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
                  style={[{marginTop: responsiveHeight(12 / percentToPx)}]}
                  className="text-center font-2">
                  {authenticating
                    ? 'Completing your Sign In Process...'
                    : 'Resending email...'}
                </Text>
              </View>
            </View>
          ))}
      </StaticContainerReg>
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
