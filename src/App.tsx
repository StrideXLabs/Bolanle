import React from 'react';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation/RootNavigation';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <RootNavigation />
      <Toast />
    </>
  );
}

export default App;
