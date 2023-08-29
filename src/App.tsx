import React from 'react';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation/RootNavigation';
import StaticContainer from './containers/StaticContainer';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RootNavigation />
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;
