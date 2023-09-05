import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
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
      className={
        'w-full justify-center items-center py-3 rounded-2xl bg-primary-blue'
      }>
      {!loading ? (
        <Text className="text-center text-white font-semibold text-lg">
          {title}
        </Text>
      ) : (
        <ActivityIndicator size="small" color="#fff" animating={true} />
      )}
    </TouchableOpacity>
  );
};

export default GenericButton;
