import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <>
      <StatusBar
        animated
        barStyle="dark-content"
        showHideTransition="slide"
        backgroundColor="#F5F5F5"
      />
      <RootNavigation />
      <Toast />
    </>
  );
}

export default App;
