import React, {useState} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';

interface TextFieldProps extends TextInputProps {
  value: string;
  label?: string;
  className?: string;
  onChangeText: (text: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  onChangeText,
  className = '',
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label && (
        <Text
          style={[
            {
              fontSize: responsiveFontSize(16 / percentToPx),
              marginBottom: responsiveHeight(8 / percentToPx),
            },
            isFocused ? textStyles.robotoBold : textStyles.robotoRegular,
          ]}
          className="text-off-white-1">
          {label}
        </Text>
      )}
      <TextInput
        focusable
        value={value}
        cursorColor="#F7F6F0"
        onChangeText={onChangeText}
        enablesReturnKeyAutomatically
        placeholderTextColor="#F7F6F0"
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`font-bold w-full transition-all ${
          isFocused
            ? 'border-[#F7F6F0] border-[2px]'
            : 'border-off-white-4 border-[1px]'
        } ${className}`}
        style={[
          {
            color: 'white',
            paddingLeft: responsiveHeight(1.7),
            height: responsiveHeight(40 / percentToPx),
            borderRadius: responsiveHeight(20 / percentToPx),
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
};

export default TextField;
