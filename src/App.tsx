import React from 'react';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation/RootNavigation';

function App(): JSX.Element {
  return (
    <>
      <RootNavigation />
      <Toast />
    </>
  );
}

export default App;
