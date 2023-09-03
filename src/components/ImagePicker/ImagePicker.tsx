import {
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Text,
} from 'react-native';
import React from 'react';
import {Photo} from '../../constants/icons';
import {Image as PickerImage} from 'react-native-image-crop-picker';

type ImagePickerProps = {
  label: string;
  handleButtonPress: (name: 'Profile' | 'Logo') => void;
  pickedImage?: PickerImage;
};

const labelToTypeMap: Record<string, 'Profile' | 'Logo'> = {
  'Profile Photo': 'Profile',
  'Company Logo': 'Logo',
};

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  handleButtonPress,
  pickedImage,
}) => {
  return (
    <View className="justify-center items-center bg-white w-[150px] h-[130px] rounded-2xl my-10 relative">
      <Image source={Photo as ImageSourcePropType} />
      {pickedImage && (
        <Image
          source={{uri: pickedImage.path}}
          className="w-full h-full rounded-2xl absolute"
        />
      )}
      <TouchableOpacity
        className={`mt-8 py-2 px-6 ${
          pickedImage ? 'bg-transparent' : 'bg-secondary-blue'
        }
        ${pickedImage ? 'border-2 border-primary-blue' : ''}
        rounded-xl`}
        onPress={() => handleButtonPress(labelToTypeMap[label])}>
        <Text className="text-sm text-primary-blue">{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
