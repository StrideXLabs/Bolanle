import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import textStyles from '../../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

type ShareButtonProps = {
  text: string;
  startIcon: string;
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyles?: StyleProp<ImageStyle>;
};

const ShareButton = ({
  text,
  onPress,
  startIcon,
  styles = {},
  textStyle = {},
  iconStyles = {},
}: ShareButtonProps) => {
  return (
    <Pressable
      style={[
        styles,
        {padding: responsiveHeight(1.3), paddingLeft: responsiveHeight(1.5)},
      ]}
      onPress={onPress}
      className="bg-accent flex flex-row items-center">
      <Image
        resizeMode="contain"
        source={startIcon as ImageSourcePropType}
        style={[
          {
            marginRight: responsiveHeight(1.2),
            width: responsiveWidth(33 / percentToPx),
            aspectRatio: 1,
          },
          iconStyles,
        ]}
      />
      <Text
        style={[textStyle, {fontSize: responsiveFontSize(15 / percentToPx)}]}
        className="text-white font-2">
        {text}
      </Text>
    </Pressable>
  );
};

export default ShareButton;
