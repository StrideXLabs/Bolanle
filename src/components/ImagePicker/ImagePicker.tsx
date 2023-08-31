import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Text,
} from 'react-native';
import React from 'react';
import {Photo} from '../../constants/icons';

type ImagePickerProps = {
  label: string;
  handleButtonPress: () => void;
};

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  handleButtonPress,
}) => {
  return (
    <View className="justify-center items-center bg-white w-[150px] h-[130px] rounded-2xl my-10">
      <Image source={Photo as ImageSourcePropType} />
      <TouchableOpacity
        className="mt-8 py-3 px-6 bg-secondary-blue rounded-xl"
        onPress={handleButtonPress}>
        <Text className="text-sm text-primary-blue">{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
