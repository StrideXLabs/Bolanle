import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

const Layout = ({
  children,
  viewStyle = {},
  barColor = '#ffffff',
  barStyle = 'dark-content',
}: {
  barColor?: ColorValue;
  barStyle?: StatusBarStyle;
  children: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <SafeAreaView className="h-screen bg-white">
      <StatusBar backgroundColor={barColor} barStyle={barStyle} />
      <View className="h-screen bg-white" style={viewStyle}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;
