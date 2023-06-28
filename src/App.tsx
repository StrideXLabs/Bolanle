import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation/RootNavigation';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <RootNavigation />
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;
