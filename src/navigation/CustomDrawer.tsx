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
  InstaIcon,
  TwitterIcon,
  aboutLogo,
  browserLogo,
  facebookIcon,
  feedbackLogo,
  guideLogo,
  licenceLogo,
  logoutLogo,
  newLogo,
  newLogoBlack,
  privacyLogo,
  ratingsLogo,
  youtubeLogo,
} from '../constants/icons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const CustomDrawer = (props: any) => {
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
            <Image
              source={browserLogo as any}
              className={`h-7 w-7`}
              resizeMode="contain"
            />
            <Image
              source={InstaIcon as any}
              className={`h-7 w-7`}
              resizeMode="contain"
            />
            <Image
              source={TwitterIcon as any}
              className={`h-7 w-7`}
              resizeMode="contain"
            />
            <Image
              source={youtubeLogo as any}
              className={`h-7 w-7`}
              resizeMode="contain"
            />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={aboutLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={feedbackLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={licenceLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={privacyLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={guideLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={ratingsLogo as ImageSourcePropType}
                />
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
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  resizeMode="contain"
                  className={'h-7 w-7 rounded-lg'}
                  source={logoutLogo as ImageSourcePropType}
                />
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
            onPress={() => {
              // props.navigation.navigate('Finance');
              console.log('Feedback');
            }}
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
