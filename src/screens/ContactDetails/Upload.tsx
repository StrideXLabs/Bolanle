import React from 'react';
import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {PlusIcon} from 'react-native-heroicons/outline';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import trash from '../../assets/images/trash.png';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';

const Upload = () => {
  const {setContactDetails, contactDetails} = useCreateBusinessCard();

  const handleAddImage = async (type: 'Profile' | 'Logo') => {
    try {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        presentationStyle: 'formSheet',
      });

      if (result.didCancel) return;
      const file = result.assets?.[0] as Asset;

      if (type === 'Logo')
        setContactDetails({...contactDetails, companyLogo: file});
      else setContactDetails({...contactDetails, profilePicture: file});
    } catch (error) {
      Toast.error({primaryText: 'Error selecting image. Please try again.'});
    }
  };

  return (
    <View
      className="flex flex-row justify-between items-center"
      style={{marginTop: responsiveHeight(10 / percentToPx)}}>
      <View>
        <Text
          style={[
            textStyles.robotoRegular,
            {fontSize: responsiveFontSize(16 / percentToPx)},
          ]}
          className="text-dark-blue">
          Company Logo
        </Text>
        <Pressable
          onPress={e => {
            e.stopPropagation();
            handleAddImage('Logo');
          }}>
          <View
            style={{
              width: responsiveWidth(28),
              height: responsiveHeight(90 / percentToPx),
              marginTop: responsiveHeight(10 / percentToPx),
            }}
            className="border-[1px] border-off-white-2 rounded-md bg-off-white-3 flex justify-center items-center">
            {contactDetails.companyLogo ? (
              <Image
                resizeMode="cover"
                className="w-full h-full rounded-md"
                source={{uri: contactDetails.companyLogo.uri}}
              />
            ) : (
              <PlusIcon size={25} color="black" />
            )}
          </View>
          {contactDetails.companyLogo && (
            <Pressable
              style={{
                top: 16,
                right: 3,
                width: 24,
                height: 24,
                padding: 4,
              }}
              className="absolute bg-[#FFD9D9] rounded-md"
              onPress={e => {
                e.stopPropagation();
                setContactDetails({...contactDetails, companyLogo: null});
              }}>
              <Image
                resizeMode="center"
                className="w-full h-full"
                source={trash as ImageSourcePropType}
              />
            </Pressable>
          )}
        </Pressable>
      </View>

      <View>
        <Text
          style={[
            textStyles.robotoRegular,
            {fontSize: responsiveFontSize(16 / percentToPx)},
          ]}
          className="text-base text-dark-blue">
          Profile Image
        </Text>
        <Pressable
          onPress={e => {
            e.stopPropagation();
            handleAddImage('Profile');
          }}>
          <View
            style={{
              width: responsiveWidth(28),
              height: responsiveHeight(90 / percentToPx),
              marginTop: responsiveHeight(10 / percentToPx),
            }}
            className="border-[1px] border-off-white-2 rounded-md bg-off-white-3 flex justify-center items-center">
            {contactDetails.profilePicture ? (
              <Image
                resizeMode="cover"
                className="w-full h-full rounded-md"
                source={{uri: contactDetails.profilePicture.uri}}
              />
            ) : (
              <PlusIcon size={25} color="black" />
            )}
            {contactDetails.profilePicture && (
              <Pressable
                style={{
                  top: 2,
                  right: 3,
                  width: 24,
                  height: 24,
                  padding: 4,
                }}
                className="absolute bg-[#FFD9D9] rounded-md"
                onPress={e => {
                  e.stopPropagation();
                  setContactDetails({...contactDetails, profilePicture: null});
                }}>
                <Image
                  resizeMode="center"
                  className="w-full h-full"
                  source={trash as ImageSourcePropType}
                />
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Upload;
