import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

type GenericTextFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: JSX.Element;
  onIconPress?: () => void;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  style?: any;
};

const GenericTextField: React.FC<GenericTextFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  icon,
  onIconPress,
  multiline,
  textAlignVertical,
  style,
}) => {
  return (
    <View className="bg-white w-full flex-row justify-center items-center relative  rounded-xl">
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="flex-1 px-2 font-1"
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        style={style}
      />
      {icon && (
        <TouchableOpacity className="absolute right-2" onPress={onIconPress}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GenericTextField;
