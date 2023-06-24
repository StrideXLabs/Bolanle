import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface TextFieldProps extends TextInputProps {
  value: string;
  className?: string;
  onChangeText: (text: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      focusable
      value={value}
      cursorColor="#F7F6F0"
      onChangeText={onChangeText}
      enablesReturnKeyAutomatically
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      className={`m-0 w-full rounded-lg px-4 transition-all ${
        isFocused
          ? 'border-[#F7F6F0] border-[2px]'
          : 'border-off-white-4 border-[1px]'
      } ${className}`}
      {...props}
    />
  );
};

export default TextField;
