import React from 'react';
import {Text, View} from 'react-native';
import textStyles from '../../../constants/fonts';

export interface HeaderWithTextProps {
  heading: string;
  subtitle: string;
}

const HeaderWithText = ({heading, subtitle}: HeaderWithTextProps) => {
  return (
    <View>
      <Text
        style={textStyles.bebasNeueBold}
        className="text-dark-blue text-4xl mb-1">
        {heading}
      </Text>
      <View className="w-full h-[2px] bg-dark-blue rounded-sm" />
      <Text
        style={textStyles.robotoMedium}
        className="text-dark-blue text-[16px] mt-1">
        {subtitle}
      </Text>
    </View>
  );
};

export default HeaderWithText;
