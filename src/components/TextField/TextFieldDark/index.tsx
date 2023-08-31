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
        placeholderTextColor="#808080"
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className={`relative w-full text-dark-blue transition-all ${
          isFocused
            ? 'border-dark-blue border-[1px]'
            : 'border-off-white-2 border-[1px]'
        } ${className}
        ${gradient ? 'bg-secondary-blue' : ''}
        ${icon ? 'pl-10' : ''}
        `}
        style={[
          {
            paddingHorizontal: responsiveHeight(1.7),
            height: responsiveHeight(40 / percentToPx),
            borderRadius: responsiveHeight(20 / percentToPx),
          },
          style,
        ]}
        {...props}
      />
      {icon && <View className="absolute left-3 top-3">{icon}</View>}
    </View>
  );
};

export default TextField;
