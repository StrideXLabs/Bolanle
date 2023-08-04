import React from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { openPicker } from 'react-native-image-crop-picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import trash from '../../assets/images/trash.png';
import { BASE_URL, percentToPx } from '../../constants';
import textStyles from '../../constants/fonts';
import { useCreateBusinessCard } from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';
import { ScreenStatus } from '../../navigation/AppNavigation';

const Upload = ({ status, cardId }: { status: ScreenStatus; cardId: string }) => {
  const { setContactDetails, contactDetails } = useCreateBusinessCard();

  const handleAddImage = async (type: 'Profile' | 'Logo') => {
    try {
      const result = await openPicker({
        maxFiles: 1,
        cropping: true,
        mediaType: 'photo',
        waitAnimationEnd: true,
        compressImageQuality: 0.7,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
        avoidEmptySpaceAroundImage: true,
      });

      if (type === 'Logo')
        setContactDetails({ ...contactDetails, companyLogo: result });
      else setContactDetails({ ...contactDetails, profilePicture: result });
    } catch (error) {
      if ((error as any)?.code === 'E_PICKER_CANCELLED') return;
      Toast.error({ primaryText: 'Error selecting image. Please try again.' });
    }
  };

  return (
    <View
      className="flex flex-row justify-between items-center"
      style={{ marginTop: responsiveHeight(10 / percentToPx) }}>
      <View>
        <Text
          style={[
            textStyles.robotoRegular,
            { fontSize: responsiveFontSize(16 / percentToPx) },
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
              position: 'relative',
              marginTop: responsiveHeight(10 / percentToPx),
            }}>
            <View
              style={{
                width: responsiveWidth(30),
                aspectRatio: 1,
              }}
              className="border-[1px] border-off-white-2 rounded-md bg-off-white-3 flex justify-center items-center">
              {contactDetails.companyLogo ? (
                <Image
                  resizeMode="contain"
                  className="w-full h-full rounded-md"
                  source={{
                    uri:
                      status === 'EDITING' &&
                        typeof contactDetails.companyLogo === 'string'
                        ? `${BASE_URL}/${cardId}/${contactDetails.companyLogo}` +
                        `?time=${Date.now()}`
                        : (contactDetails.companyLogo as any).path,

                    cache: 'reload',
                  }}
                />
              ) : (
                <PlusIcon size={25} color="black" />
              )}
            </View>
            {contactDetails.companyLogo && (
              <Pressable
                style={{
                  top: 3,
                  right: 3,
                  width: 24,
                  height: 24,
                  padding: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                className="absolute bg-[#134b5833] rounded-[4px]"
                onPress={e => {
                  e.stopPropagation();
                  setContactDetails({ ...contactDetails, companyLogo: null });
                }}>
                <Image
                  resizeMode="contain"
                  className="w-full h-full"
                  source={trash as ImageSourcePropType}
                />
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
      <View>
        <Text
          style={[
            textStyles.robotoRegular,
            { fontSize: responsiveFontSize(16 / percentToPx) },
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
              width: responsiveWidth(30),
              aspectRatio: 1,
              marginTop: responsiveHeight(10 / percentToPx),
            }}
            className="border-[1px] border-off-white-2 rounded-md bg-off-white-3 flex justify-center items-center">
            {contactDetails.profilePicture ? (
              <Image
                resizeMode="contain"
                className="w-full h-full rounded-md"
                source={{
                  uri:
                    status === 'EDITING' &&
                      typeof contactDetails.profilePicture === 'string'
                      ? `${BASE_URL}/${cardId}/${contactDetails.profilePicture}` +
                      `?time=${Date.now()}`
                      : (contactDetails.profilePicture as any).path,
                  cache: 'reload',
                }}
              />
            ) : (
              <PlusIcon size={25} color="black" />
            )}
            {contactDetails.profilePicture && (
              <Pressable
                style={{
                  top: 3,
                  right: 3,
                  width: 24,
                  height: 24,
                  padding: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                className="absolute bg-[#134b5833] rounded-[4px]"
                onPress={e => {
                  e.stopPropagation();
                  setContactDetails({ ...contactDetails, profilePicture: null });
                }}>
                <Image
                  resizeMode="contain"
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
