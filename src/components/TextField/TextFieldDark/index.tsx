import React, {useState} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';

interface TextFieldProps extends TextInputProps {
  label: string;
  value: string;
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
            isFocused ? textStyles.robotoBold : textStyles.robotoRegular,
            {
              fontSize: responsiveFontSize(15 / percentToPx),
              marginBottom: responsiveHeight(5 / percentToPx),
            },
          ]}
          className="text-dark-blue">
          {label}
        </Text>
      )}
      <TextInput
        focusable
        value={value}
        cursorColor="#334155"
        onChangeText={onChangeText}
        enablesReturnKeyAutomatically
        placeholderTextColor="#C9C9C9"
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`w-full text-dark-blue transition-all ${
          isFocused
            ? 'border-dark-blue border-[2px]'
            : 'border-off-white-2 border-[1px]'
        } ${className}`}
        style={[
          {
            paddingLeft: responsiveHeight(1.7),
            height: responsiveHeight(40 / percentToPx),
            borderRadius: responsiveHeight(8 / percentToPx),
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
};

export default TextField;
