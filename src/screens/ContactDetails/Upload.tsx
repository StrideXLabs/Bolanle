import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {PhotoIcon, PlusIcon, TrashIcon} from 'react-native-heroicons/outline';
import {openPicker} from 'react-native-image-crop-picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import trash from '../../assets/images/trash.png';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';
import {ScreenStatus} from '../../navigation/AppNavigation';

const Upload = ({status, cardId}: {status: ScreenStatus; cardId: string}) => {
  const {setContactDetails, contactDetails} = useCreateBusinessCard();

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
        setContactDetails({...contactDetails, companyLogo: result});
      else setContactDetails({...contactDetails, profilePicture: result});
    } catch (error) {
      if ((error as any)?.code === 'E_PICKER_CANCELLED') return;
      Toast.error({primaryText: 'Error selecting image. Please try again.'});
    }
  };

  return (
    <View
      className="flex flex-row justify-between items-center"
      style={{marginTop: responsiveHeight(24 / percentToPx)}}>
      <View>
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
                width: responsiveWidth(37),
                height: responsiveWidth(34),
              }}
              className="rounded-xl bg-white flex justify-center items-center">
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
                <>
                  <PhotoIcon size={25} color="gray" />
                  <TouchableOpacity
                    className="bg-secondary-blue p-2 rounded-lg mt-2"
                    onPress={e => {
                      e.stopPropagation();
                      handleAddImage('Logo');
                    }}>
                    <Text
                      style={[{fontSize: responsiveFontSize(11 / percentToPx)}]}
                      className="text-sm text-primary-blue font-1">
                      Company Logo
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {contactDetails.companyLogo && (
              <Pressable
                style={{
                  top: 3,
                  right: 3,
                  width: 34,
                  height: 34,
                  padding: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                className="absolute">
                <TouchableOpacity
                  className="bg-accent p-1 rounded-md w-full h-full"
                  onPress={e => {
                    e.stopPropagation();
                    setContactDetails({...contactDetails, companyLogo: null});
                  }}>
                  <TrashIcon size={18} color="white" />
                </TouchableOpacity>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={e => {
            e.stopPropagation();
            handleAddImage('Profile');
          }}>
          <View
            style={{
              width: responsiveWidth(37),
              height: responsiveWidth(34),
              marginTop: responsiveHeight(10 / percentToPx),
            }}
            className="rounded-xl bg-white flex justify-center items-center">
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
              <>
                <PhotoIcon size={25} color="gray" />
                <TouchableOpacity
                  className="bg-secondary-blue p-2 rounded-lg mt-2"
                  onPress={e => {
                    e.stopPropagation();
                    handleAddImage('Profile');
                  }}>
                  <Text
                    style={[{fontSize: responsiveFontSize(11 / percentToPx)}]}
                    className="text-sm text-primary-blue font-1">
                    Profile Image
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {contactDetails.profilePicture && (
              <Pressable
                style={{
                  top: 3,
                  right: 3,
                  width: 34,
                  height: 34,
                  padding: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                className="absolute">
                <TouchableOpacity
                  className="bg-accent p-1 rounded-md w-full h-full"
                  onPress={e => {
                    e.stopPropagation();
                    setContactDetails({
                      ...contactDetails,
                      profilePicture: null,
                    });
                  }}>
                  <TrashIcon size={18} color="white" />
                </TouchableOpacity>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Upload;
