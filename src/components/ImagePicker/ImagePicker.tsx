import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Text,
} from 'react-native';
import React from 'react';
import {CloseIcon, Photo} from '../../constants/icons';
import {Image as PickerImage} from 'react-native-image-crop-picker';

type ImagePickerProps = {
  label: string;
  handleButtonPress: (name: 'Profile' | 'Logo') => void;
  pickedImage?: PickerImage;
  handleRemoveClick: (name: 'Profile' | 'Logo') => void;
};

const labelToTypeMap: Record<string, 'Profile' | 'Logo'> = {
  'Profile Photo': 'Profile',
  'Company Logo': 'Logo',
};

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  handleButtonPress,
  pickedImage,
  handleRemoveClick,
}) => {
  return (
    <View className="justify-center items-center bg-white w-[150px] h-[150px] rounded-2xl my-10 relative">
      {pickedImage && (
        <TouchableOpacity
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full"
          onPress={() => handleRemoveClick(labelToTypeMap[label])}>
          <Image
            source={CloseIcon as ImageSourcePropType}
            className="w-5 h-5"
          />
        </TouchableOpacity>
      )}
      <Image
        source={Photo as ImageSourcePropType}
        className="absolute top-10"
      />
      {pickedImage && (
        <Image
          source={{uri: pickedImage.path}}
          className="w-full h-full rounded-2xl absolute"
        />
      )}
      {!pickedImage && (
        <TouchableOpacity
          className={
            'mt-8 py-2 px-6 bg-secondary-blue rounded-xl absolute top-[70px]'
          }
          onPress={() => handleButtonPress(labelToTypeMap[label])}>
          <Text className="text-sm text-primary-blue">{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePicker;
