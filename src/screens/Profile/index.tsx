import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import chevronRightIcon from '../../assets/images/chevron-right.png';
import emailIcon from '../../assets/images/email-dark.png';
import deleteIcon from '../../assets/images/trash.png';
import userIcon from '../../assets/images/user.png';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useAuth} from '../../hooks/useAuth';
import {flushStorage} from '../../lib/storage';

const ProfileScreen = () => {
  const {user, setAuthState} = useAuth();

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({
      user: null,
      token: null,
      authed: false,
      redirectToLogin: true,
    });
  };

  return (
    <View
      className="bg-white flex justify-between"
      style={{
        height: '100%',
        paddingLeft: responsiveHeight(36 / percentToPx),
        paddingRight: responsiveHeight(40 / percentToPx),
        paddingVertical: responsiveHeight(20 / percentToPx),
      }}>
      <View>
        <Text
          style={textStyles.bebasNeueBold}
          className="text-dark-blue text-4xl">
          PROFILE
        </Text>
        <View style={{marginTop: responsiveHeight(66 / percentToPx)}}>
          <View>
            <Text
              style={textStyles.robotoRegular}
              className="text-dark-blue text-base">
              Name
            </Text>
            <View className="flex items-center flex-row mt-6">
              <Image
                className="w-[15px] h-[15px]"
                source={userIcon as ImageSourcePropType}
              />
              <Text
                style={textStyles.robotoRegular}
                className="text-dark-blue ml-4">
                John Doe
              </Text>
            </View>
            <View className="h-[1px] w-full bg-off-white-2 mt-3" />
          </View>
          <View className="mt-[10px]">
            <Text
              style={textStyles.robotoRegular}
              className="text-dark-blue text-base">
              Registered Email
            </Text>
            <View className="flex flex-row items-center mt-6">
              <Image
                resizeMode="contain"
                className="w-[20px] h-[16px]"
                source={emailIcon as ImageSourcePropType}
              />
              <Text
                style={textStyles.robotoRegular}
                className="text-dark-blue ml-3">
                {user?.email}
              </Text>
            </View>
            <View className="h-[1px] w-full bg-off-white-2 mt-3" />
          </View>
          <View className="mt-[10px]">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex flex-row mt-6 items-center justify-between">
              <Text
                style={textStyles.robotoRegular}
                className="text-dark-blue text-base">
                Logout
              </Text>
              <Image
                resizeMode="contain"
                className="w-[10px] h-[12px]"
                source={chevronRightIcon as ImageSourcePropType}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        className="flex flex-row justify-center items-center border-[1px] border-accent rounded-lg"
        style={{
          paddingVertical: responsiveHeight(10 / percentToPx),
        }}>
        <>
          <Image
            resizeMode="center"
            source={deleteIcon as ImageSourcePropType}
            style={{
              width: responsiveWidth(24 / percentToPx),
              height: responsiveHeight(16 / percentToPx),
              marginRight: responsiveHeight(10 / percentToPx),
            }}
          />
          <Text className="text-accent" style={textStyles.robotoMedium}>
            Delete Account
          </Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
