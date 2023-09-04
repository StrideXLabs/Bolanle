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
  gradient?: boolean;
  icon?: JSX.Element;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  onChangeText,
  className = '',
  style = {},
  gradient,
  icon,
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
        placeholderTextColor="#808080"
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`relative font-1 w-full text-dark-blue transition-all ${
          isFocused
            ? 'border-[#F7F6F0] border-[2px]'
            : 'border-off-white-1 border-[1px]'
        } ${className}
        ${gradient ? 'bg-secondary-blue' : ''}
        ${icon ? 'pl-10' : ''}
        `}
        style={[
          {
            paddingHorizontal: responsiveHeight(1),
            paddingVertical: responsiveHeight(1),
            fontSize: responsiveFontSize(14 / percentToPx),
            height: responsiveHeight(42 / percentToPx),
            borderRadius: responsiveHeight(20 / percentToPx),
          },
          style,
        ]}
        {...props}
      />
      {icon && <View className="absolute left-3 top-[12px]">{icon}</View>}
    </View>
  );
};

export default TextField;
