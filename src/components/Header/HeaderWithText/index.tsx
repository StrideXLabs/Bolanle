import React from 'react';
import {Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';

export interface HeaderWithTextProps {
  heading: string;
  subtitle: string;
}

const HeaderWithText = ({heading, subtitle}: HeaderWithTextProps) => {
  return (
    <>
      <Text
        style={[{fontSize: responsiveFontSize(32 / percentToPx)}]}
        className="text-black mb-1 font-3">
        {heading}
      </Text>
      <View className="w-full h-[2px] bg-black rounded-sm" />
      <Text
        style={[{fontSize: responsiveFontSize(12 / percentToPx)}]}
        className="text-black mt-1 font-1">
        {subtitle}
      </Text>
    </>
  );
};

export default HeaderWithText;
