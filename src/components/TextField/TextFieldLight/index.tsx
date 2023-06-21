import React from 'react';
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
  return (
    <TextInput
      focusable
      value={value}
      cursorColor="#F7F6F0"
      onChangeText={onChangeText}
      enablesReturnKeyAutomatically
      className={`m-0 w-full rounded-lg px-4 transition-all border-[#F7F6F0] border-[2px] ${className}`}
      {...props}
    />
  );
};

export default TextField;
