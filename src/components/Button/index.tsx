import React from 'react';
import {Pressable, Text, View} from 'react-native';

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
          showBackgroundColor ? 'bg-[#F1592A]' : 'bg-slate-50'
        } w-[330px] flex justify-center items-center p-4 rounded-lg ${className}`}>
        <Text
          className={`font-extrabold text-base ${
            showBackgroundColor ? 'text-white' : 'text-[#F1592A]'
          }`}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
