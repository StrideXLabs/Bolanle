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
import textStyles from '../../constants/fonts';

export interface IButtonProps {
  text: string;
  className?: string;
  callback: () => void;
  showLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  showBackgroundColor?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  text,
  callback,
  style = {},
  className = '',
  textStyle = {},
  showLoading = false,
  showBackgroundColor = true,
}: IButtonProps) => {
  return (
    <Pressable
      onPress={callback}
      disabled={showLoading}
      className="active:scale-95 transition-all"
      style={{opacity: showLoading ? 0.85 : 1}}>
      <View
        style={[{padding: responsiveHeight(13 / percentToPx)}, style]}
        className={`${
          showBackgroundColor ? 'bg-accent' : 'bg-slate-50'
        } flex justify-center items-center rounded-lg ${className}`}>
        <Text
          style={[
            textStyles.robotoBold,
            {fontSize: responsiveFontSize(16 / percentToPx)},
            textStyle,
          ]}
          className={`font-extrabold ${
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
