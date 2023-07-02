import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';

const Layout = ({
  children,
  barColor = '#ffffff',
  barStyle = 'dark-content',
}: {
  barColor?: ColorValue;
  children: React.ReactNode;
  barStyle?: StatusBarStyle;
}) => {
  return (
    <SafeAreaView className="h-screen bg-white">
      <StatusBar backgroundColor={barColor} barStyle={barStyle} />
      <View className="h-screen bg-white">{children}</View>
    </SafeAreaView>
  );
};

export default Layout;
