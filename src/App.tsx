import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation/RootNavigation';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <RootNavigation />
      <Toast />
    </>
  );
}

export default App;
