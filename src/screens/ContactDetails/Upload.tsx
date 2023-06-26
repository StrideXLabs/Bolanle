import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {PlusIcon} from 'react-native-heroicons/outline';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

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
    <View className="ml-1 mt-[10px] flex flex-row justify-between items-center">
      <View>
        <Text
          style={textStyles.robotoRegular}
          className="text-base text-dark-blue">
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
            }}
            className="border-[1px] border-off-white-2 mt-2 rounded-md bg-off-white-3 flex justify-center items-center">
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
              className="absolute top-4 right-2"
              onPress={e => {
                e.stopPropagation();
                setContactDetails({...contactDetails, companyLogo: null});
              }}>
              <View className="bg-[#FFD9D9] p-1 rounded-md">
                <TrashIcon size={18} color="#F1592A" />
              </View>
            </Pressable>
          )}
        </Pressable>
      </View>
      <View>
        <Text
          style={textStyles.robotoRegular}
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
            }}
            className="border-[1px] border-off-white-2 mt-2 rounded-md bg-off-white-3 flex justify-center items-center">
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
                className="absolute top-2 right-2"
                onPress={e => {
                  e.stopPropagation();
                  setContactDetails({...contactDetails, profilePicture: null});
                }}>
                <View className="bg-[#FFD9D9] p-1 rounded-md">
                  <TrashIcon size={18} color="#F1592A" />
                </View>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Upload;
