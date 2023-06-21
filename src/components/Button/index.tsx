import React from 'react';
import {Pressable, Text, View} from 'react-native';
import textStyles from '../../constants/fonts';

export interface IButtonProps {
  text: string;
  callback: () => void;
  showBackgroundColor?: boolean;
  className?: string;
}

const Button = ({
  text,
  callback,
  className = '',
  showBackgroundColor = true,
}: IButtonProps) => {
  return (
    <Pressable onPress={callback} className="active:scale-95 transition-all">
      <View
        className={`${
          showBackgroundColor ? 'bg-accent' : 'bg-slate-50'
        } w-[330px] flex justify-center items-center p-4 rounded-lg ${className}`}>
        <Text
          style={textStyles.robotoBold}
          className={`font-extrabold text-base ${
            showBackgroundColor ? 'text-white' : 'text-accent'
          }`}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
