import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import React from 'react';

import back from '../assets/images/back.png';
import {useNavigation} from '@react-navigation/native';

type StaticContainerProps = {
  isHeader: boolean;
  isBack: boolean;
  title?: string;
  children: React.ReactNode;
};

const StaticContainer: React.FC<StaticContainerProps> = ({
  isBack,
  title,
  children,
  isHeader,
}) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return isHeader ? (
    <View className={`flex-1 p-4  bg-white items-center`}>
      <View className={`h-[70px] w-full flex-row items-center`}>
        {isBack && (
          <TouchableOpacity
            onPress={handlePressBack}
            className={` h-[35px] w-[35px] justify-center items-center mr-[15px]`}>
            <Image
              source={back as ImageSourcePropType}
              className={`h-[35px] w-[35px] `}
            />
          </TouchableOpacity>
        )}
        {title && (
          <Text className={`text-[25px] font-semibold text-black`}>
            {title}
          </Text>
        )}
      </View>
      {children}
    </View>
  ) : null;
};

export default StaticContainer;
