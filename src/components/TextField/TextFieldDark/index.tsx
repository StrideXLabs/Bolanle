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
      cursorColor="#334155"
      onChangeText={onChangeText}
      enablesReturnKeyAutomatically
      placeholderTextColor="#C9C9C9"
      className={`m-0 w-full text-dark-blue rounded-lg px-4 transition-all border-dark-blue border-[2px] ${className}`}
      {...props}
    />
  );
};

export default TextField;
