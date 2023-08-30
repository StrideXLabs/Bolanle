import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
} from 'react-native';
import React from 'react';

type GenericButtonProps = {
  title: string;
  handlePress: () => void;
  disabled?: boolean;
  loading?: boolean;
} & TouchableOpacityProps &
  TextProps;

const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  handlePress,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : handlePress}
      className={`w-full justify-center items-center py-4 rounded-2xl ${
        disabled ? 'bg-grey' : 'bg-primary-blue'
      }`}>
      {!loading ? (
        <Text className="text-center text-white font-semibold">{title}</Text>
      ) : (
        <Text>Loading.......</Text>
      )}
    </TouchableOpacity>
  );
};

export default GenericButton;
