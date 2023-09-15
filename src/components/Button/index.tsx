import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {accentColor, percentToPx} from '../../constants';

export interface IButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  callback: () => void;
  showLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  showBackgroundColor?: boolean;
  textStyle?: StyleProp<TextStyle>;
  deleteButton?: boolean;
}

const Button = ({
  text,
  callback,
  style = {},
  className = '',
  textStyle = {},
  disabled = false,
  showLoading = false,
  showBackgroundColor = true,
  deleteButton = false,
}: IButtonProps) => {
  return (
    <Pressable
      onPress={callback}
      disabled={disabled}
      className="active:scale-95 transition-all disabled:opacity-75"
      style={{opacity: showLoading ? 0.85 : 1}}>
      <View
        style={[
          {
            borderRadius: 14,

            borderWidth: showBackgroundColor ? 0 : 1,
            padding: responsiveHeight(9 / percentToPx),
            borderColor: showBackgroundColor ? 'none' : accentColor,
          },
          style,
        ]}
        className={`${
          showBackgroundColor ? 'bg-primary-blue' : 'bg-slate-50'
        } flex justify-center items-center ${className}
        ${deleteButton ? 'bg-red-600' : ''}
        `}>
        <Text
          style={[{fontSize: responsiveFontSize(15 / percentToPx)}, textStyle]}
          className={`font-3 ${
            showBackgroundColor ? 'text-white' : 'text-accent'
          }`}>
          {showLoading ? (
            <ActivityIndicator
              color={showBackgroundColor ? '#F7F6F0' : accentColor}
            />
          ) : (
            text
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
