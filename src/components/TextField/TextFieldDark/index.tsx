import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';

interface TextFieldProps extends TextInputProps {
  value: string;
  className?: string;
  onChangeText: (text: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  className = '',
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
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
  );
};

export default TextField;
