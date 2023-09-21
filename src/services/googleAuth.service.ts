import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from '../lib/toast';

// GoogleSignin.configure({
//   scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId:
//     '140121067502-pj9gp0vv85aq11hon9bco500umdsfr58.apps.googleusercontent.com',
//   androidClientId:
//     '222038428703-56sugje3nvqenb7kuahmqi21vhpb3enj.apps.googleusercontent.com',
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   // hostedDomain: '', // specifies a hosted domain restriction
//   // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   // accountName: '', // [Android] specifies an account name on the device that should be used
//   // //   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });
export const googleConfig = {
  scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '140121067502-pj9gp0vv85aq11hon9bco500umdsfr58.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  androidClientId:
    '140121067502-ou1bmqmmubn8qju3oq57on6u82os4q66.apps.googleusercontent.com',
  offlineAccess: true,
};

let res = {};

export const googleSignIn = async () => {
  try {
    GoogleSignin.configure(googleConfig);

    await GoogleSignin.hasPlayServices();

    await GoogleSignin.signOut();

    const userInfo = await GoogleSignin.signIn();

    // Toast.success({primaryText: 'Login Success'});

    return userInfo;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Toast.error({primaryText: 'Login flow Cancelled'});
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Toast.error({
        primaryText: 'operation (e.g. sign in) is in progress already',
      });
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Toast.error({primaryText: 'play services not available or outdated'});
    } else {
      console.log('error2', error);
      Toast.error({primaryText: 'Something went wrong', secondaryText: error});
    }
  }
  return res;
};
