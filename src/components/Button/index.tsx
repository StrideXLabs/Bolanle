import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';

export interface IButtonProps {
  text: string;
  className?: string;
  callback: () => void;
  showLoading?: boolean;
  showBackgroundColor?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  text,
  callback,
  style = {},
  className = '',
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
        style={[
          {
            // width: responsiveWidth(80),
            padding: responsiveHeight(13 / percentToPx),
          },
          style,
        ]}
        className={`${
          showBackgroundColor ? 'bg-accent' : 'bg-slate-50'
        } flex justify-center items-center rounded-lg ${className}`}>
        <Text
          style={[
            textStyles.robotoBold,
            {fontSize: responsiveFontSize(16 / percentToPx)},
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
