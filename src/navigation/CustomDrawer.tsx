import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useAuth, initialAuthState} from '../hooks/useAuth';

//icons
import FacebookIcon from '../assets/svgs/facebook.svg';
import InstaIcon from '../assets/svgs/insta.svg';
import YoutubeIcon from '../assets/svgs/Youtube.svg';
import X from '../assets/svgs/X.svg';
import AboutLogo from '../assets/svgs/About.svg';
import FeedbackLogo from '../assets/svgs/Feedback.svg';
import LicenceLogo from '../assets/svgs/licence.svg';
import PrivacyLogo from '../assets/svgs/privacy.svg';
import GuideLogo from '../assets/svgs/userGuide.svg';
import RatingsLogo from '../assets/svgs/ratings.svg';
import LogoutLogo from '../assets/svgs/signOut.svg';
import {newLogoBlack} from '../constants/icons';
import {flushStorage} from '../lib/storage';

export const CustomDrawer = (props: any) => {
  const {setAuthState} = useAuth();

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin: true});
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <View className="flex items-center space-y-1 -mt-3">
            <Text className="font-2 text-xl text-black">Settings</Text>
            <Text className="font-0 text-xs text-black">
              Manage your app preferences
            </Text>
          </View>

          <View
            className="flex flex-row justify-center gap-5"
            style={{
              marginTop: responsiveHeight(0.03),
            }}>
            <FacebookIcon width={26} height={26} />
            <InstaIcon width={26} height={26} />
            <X width={26} height={26} />
            <YoutubeIcon width={26} height={26} />
          </View>
        </View>

        <View className="border-b border-gray-300 mx-3 my-3" />

        <View>
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <AboutLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    About
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    Find more about the app
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Settings');
              console.log('About');
            }}
          />
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <FeedbackLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Feedback
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    Help us improve our app
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
          />
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <LicenceLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Licence
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    View our licence
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
          />
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <PrivacyLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Privacy Policy
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    View our privacy policy
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
          />
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <GuideLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    User guide
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    Find more about the app
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
          />
          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <RatingsLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Ratings
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    Rate us on the app store
                  </Text>
                </View>
              </View>
            )}
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
          />

          <View className="border-b border-gray-300 mx-3 my-3" />

          <DrawerItem
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(1),
            }}
            label={() => (
              <View className="flex flex-row space-x-3 items-center">
                <LogoutLogo width={28} height={28} />
                <View className="flex flex-col">
                  <Text
                    className="font-2 text-black"
                    style={{
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Logout
                  </Text>
                  <Text
                    className="font-1 -mt-1"
                    style={{
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    Logout from the app
                  </Text>
                </View>
              </View>
            )}
            onPress={handleLogout}
          />

          <View
            className="flex flex-row items-center justify-center space-x-1"
            style={{
              marginTop: responsiveHeight(3.3),
            }}>
            <Image
              source={newLogoBlack as ImageSourcePropType}
              resizeMode="contain"
              style={{
                width: responsiveWidth(8),
                height: responsiveWidth(8),
              }}
            />
            <Text className="font-6 text-black text-sm tracking-wide">
              HELLO{'\n'}BOLANLE
            </Text>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

//export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(5),
  },
});
