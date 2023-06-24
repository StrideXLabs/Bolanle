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
      cursorColor="#334155"
      onChangeText={onChangeText}
      enablesReturnKeyAutomatically
      placeholderTextColor="#C9C9C9"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      className={`m-0 w-full text-dark-blue rounded-lg px-4 transition-all ${
        isFocused
          ? 'border-dark-blue border-[2px]'
          : 'border-off-white-2 border-[1px]'
      } ${className}`}
      {...props}
    />
  );
};

export default TextField;
