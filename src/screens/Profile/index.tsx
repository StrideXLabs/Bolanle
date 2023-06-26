import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import chevronRightIcon from '../../assets/images/chevron-right.png';
import emailIcon from '../../assets/images/email-dark.png';
import userIcon from '../../assets/images/user.png';
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
    <View className="px-10 py-5 bg-white h-screen">
      <Text
        style={textStyles.bebasNeueBold}
        className="text-dark-blue text-4xl">
        PROFILE
      </Text>
      <View className="mt-[66px]">
        <View>
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
        </View>
        <View className="mt-[10px]">
          <View>
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
  );
};

export default ProfileScreen;
