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
        style={[
          textStyles.bebasNeueBold,
          {fontSize: responsiveFontSize(32 / percentToPx)},
        ]}
        className="text-dark-blue mb-1">
        {heading}
      </Text>
      <View className="w-full h-[2px] bg-dark-blue rounded-sm" />
      <Text
        style={[
          textStyles.robotoRegular,
          {fontSize: responsiveFontSize(12 / percentToPx)},
        ]}
        className="text-dark-blue mt-1">
        {subtitle}
      </Text>
    </>
  );
};

export default HeaderWithText;
