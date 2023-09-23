import {
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {BackIcon} from '../../../constants/icons';

type RegHeaderProps = {
  isBack: boolean;
  title?: string;
  onBackPress?: () => void;
};

const RegistrationHeader: React.FC<RegHeaderProps> = ({
  isBack,
  title,
  onBackPress,
}) => {
  const navigation = useNavigation();

  return (
    <View className={`h-[70px] w-full flex-row items-center`}>
      {isBack && (
        <TouchableOpacity
          onPress={onBackPress}
          className={` h-[35px] w-[35px] justify-center items-center mr-[15px]`}>
          <Image
            source={BackIcon as ImageSourcePropType}
            className={`h-[35px] w-[35px] `}
          />
        </TouchableOpacity>
      )}
      {title && (
        <Text
          className={`text-[25px] font-semibold text-black font-2 mt-[6px]`}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default RegistrationHeader;
