import {HttpError} from 'http-errors';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import chevronRightIcon from '../../assets/images/chevron-right.png';
import emailIcon from '../../assets/images/email-dark.png';
import deleteIcon from '../../assets/images/trash.png';
import userIcon from '../../assets/images/profile.png';
import {accentColor, emailRegex, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {initialAuthState, useAuth} from '../../hooks/useAuth';
import {flushStorage} from '../../lib/storage';
import Toast from '../../lib/toast';
import authService from '../../services/auth.service';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const ProfileScreen = () => {
  const {user, setAuthState} = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin: true});
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      const res = await authService.deleteAccount();

      if (!res.success) {
        setDeleting(false);
        Toast.error({primaryText: res.message});
        return;
      }

      setDeleting(false);
      Toast.success({primaryText: res.message});
      await handleLogout();
    } catch (error) {
      setDeleting(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  const handleEmail = async () => {
    try {
      const url = `mailto:business@bolanlemedia.com`;

      await Linking.openURL(url);
    } catch (error) {
      Toast.error({primaryText: 'Error sending email.'});
    }
  };

  return (
    <Layout>
      <View
        className="w-full"
        style={{
          paddingVertical: responsiveHeight(50 / percentToPx),
          paddingHorizontal: responsiveHeight(20 / percentToPx),
        }}>
        <View className="bg-secondary-blue rounded-3xl p-5">
          <Text
            className="text-black text-3xl font-2 text-center"
            style={{
              marginTop: responsiveHeight(10 / percentToPx),
            }}>
            My Profile
          </Text>
          <View style={{marginVertical: responsiveHeight(20 / percentToPx)}}>
            <View>
              <Text className="text-black text-base font-2">Name</Text>
              <View className="flex items-center flex-row mt-6">
                <Image
                  className="w-4 h-4"
                  source={userIcon as ImageSourcePropType}
                />
                <Text className="text-dark-blue ml-4 font-1">
                  {user?.name || 'NA'}
                </Text>
              </View>
              <View className="h-[1px] w-full bg-off-white-2 mt-3" />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(18 / percentToPx),
              }}>
              <Text className="text-black text-base font-2">
                Registered Email
              </Text>
              <View className="flex flex-row items-center mt-6">
                <Image
                  resizeMode="contain"
                  className="w-4 h-5"
                  source={emailIcon as ImageSourcePropType}
                />
                <Text className="text-dark-blue ml-4 font-1">
                  {user?.email || ''}
                </Text>
              </View>
              <View className="h-[1px] w-full bg-off-white-2 mt-3" />
            </View>
            <View className="mt-[10px]">
              <TouchableOpacity
                onPress={handleEmail}
                className="flex flex-row mt-6 items-center justify-between">
                <Text className="text-black text-base font-1">
                  Help & Support
                </Text>
                <Image
                  resizeMode="contain"
                  className="w-[10px] h-[12px]"
                  source={chevronRightIcon as ImageSourcePropType}
                />
              </TouchableOpacity>
            </View>
            <View className="mt-[10px]">
              <TouchableOpacity
                onPress={handleLogout}
                className="flex flex-row mt-6 items-center justify-between">
                <Text className="text-black text-base font-1">Logout</Text>
                <Image
                  resizeMode="contain"
                  className="w-[10px] h-[12px]"
                  source={chevronRightIcon as ImageSourcePropType}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={handleDeleteAccount}
          className="flex flex-row justify-center items-center border-[1px] border-accent"
          style={{
            borderRadius: 30,
            paddingVertical: responsiveHeight(10 / percentToPx),
          }}>
          {deleting ? (
            <ActivityIndicator size={25} color={accentColor} />
          ) : (
            <>
              <Image
                resizeMode="contain"
                source={deleteIcon as ImageSourcePropType}
                style={{
                  width: responsiveWidth(24 / percentToPx),
                  aspectRatio: 1,
                  marginRight: responsiveHeight(10 / percentToPx),
                }}
              />
              <Text className="text-accent" style={textStyles.robotoMedium}>
                Delete Account
              </Text>
            </>
          )}
        </TouchableOpacity> */}
        <View
          style={{
            marginTop: responsiveHeight(20 / percentToPx),
          }}>
          <Button
            callback={handleDeleteAccount}
            text="Delete Account"
            deleteButton
            showLoading={deleting}
          />
        </View>
      </View>
    </Layout>
  );
};

export default ProfileScreen;
