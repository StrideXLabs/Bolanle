import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';
import linearBg from '../../assets/images/bg-1.png';
import logo from '../../assets/images/logo.png';
import Button from '../../components/Button';

const WelcomeScreen = () => {
  return (
    <View className="h-screen bg-[#F94109]">
      <ImageBackground
        className="h-full"
        resizeMode="cover"
        source={linearBg as ImageSourcePropType}>
        <View className="h-full flex justify-center items-center flex-col">
          <View className="h-3/5 mt-20 items-center justify-center">
            <Image
              source={logo as ImageSourcePropType}
              className="w-[198px]"
              resizeMode="contain"
            />
          </View>
          <View className="-mt-24 flex-grow justify-self-end items-center">
            <Text className="px-8 text-center text-white text-[32px] font-bold mb-1">
              Your Digital Business Card at Your Fingertips!
            </Text>
            <View className="mt-5">
              <Button className="mb-5" callback={() => {}} text="Create New" />
              <Button
                text="Log in"
                callback={() => {}}
                showBackgroundColor={false}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
