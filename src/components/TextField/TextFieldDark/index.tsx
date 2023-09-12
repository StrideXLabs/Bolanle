import React, {useState} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';

interface TextFieldProps extends TextInputProps {
  value: string;
  label?: string;
  className?: string;
  onChangeText: (text: string) => void;
  gradient?: boolean;
  icon?: JSX.Element;
  bottomBorder?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  onChangeText,
  className = '',
  style = {},
  gradient,
  icon,
  bottomBorder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label && (
        <Text
          style={[
            {
              fontSize: bottomBorder
                ? responsiveFontSize(12 / percentToPx)
                : responsiveFontSize(15 / percentToPx),
              marginBottom: bottomBorder
                ? 0
                : responsiveHeight(5 / percentToPx),
              marginLeft: bottomBorder ? responsiveWidth(20 / percentToPx) : 0,
            },
          ]}
          className={`text-dark-blue
          ${isFocused ? 'font-4' : 'font-1'}
          `}>
          {label}
        </Text>
      )}
      <TextInput
        focusable
        value={value}
        cursorColor="#334155"
        onChangeText={onChangeText}
        enablesReturnKeyAutomatically
        placeholderTextColor="#808080"
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`relative font-1 w-full text-dark-blue transition-all ${
          isFocused && !bottomBorder
            ? 'border-dark-blue border-[1px]'
            : isFocused && bottomBorder
            ? 'border-b-[1px] border-dark-blue'
            : bottomBorder
            ? 'border-b-[1px] border-gray-400'
            : 'border-off-white-2 border-[1px]'
        } ${className}
        ${gradient ? 'bg-secondary-blue' : ''}
        ${icon ? 'pl-10' : ''}
        ${bottomBorder ? 'border-b-[1px]' : ''}
        ${bottomBorder ? 'mb-6' : ''}
        `}
        style={[
          {
            paddingHorizontal: responsiveHeight(1.4),
            paddingVertical: responsiveHeight(1),
            fontSize: responsiveFontSize(14 / percentToPx),
            height: responsiveHeight(40 / percentToPx),
            borderRadius: responsiveHeight(20 / percentToPx),
          },
          style,
        ]}
        {...props}
      />
      {icon && <View className="absolute left-3 top-[10px]">{icon}</View>}
    </View>
  );
};

export default TextField;
