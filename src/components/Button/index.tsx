import React from 'react';
import {Pressable, Text, View, ActivityIndicator} from 'react-native';
import textStyles from '../../constants/fonts';

export interface IButtonProps {
  text: string;
  className?: string;
  showLoading?: boolean;
  callback: () => void;
  showBackgroundColor?: boolean;
}

const Button = ({
  text,
  callback,
  className = '',
  showLoading = false,
  showBackgroundColor = true,
}: IButtonProps) => {
  return (
    <Pressable
      onPress={callback}
      disabled={showLoading}
      className="active:scale-95 transition-all"
      style={{opacity: showLoading ? 0.85 : 1}}>
      <View
        className={`${
          showBackgroundColor ? 'bg-accent' : 'bg-slate-50'
        } w-[330px] flex justify-center items-center p-4 rounded-lg ${className}`}>
        <Text
          style={textStyles.robotoBold}
          className={`font-extrabold text-base ${
            showBackgroundColor ? 'text-white' : 'text-accent'
          }`}>
          {showLoading ? (
            <ActivityIndicator
              color={showBackgroundColor ? '#F7F6F0' : '#F1592A'}
            />
          ) : (
            text
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
