import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import {
  AddButtonIcon,
  CompanyIconGray,
  IntegrationIcon,
  QrCodeIcon,
  ShareIcon,
} from '../../constants/icons';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import LocationDetails from './LocationDetails';
import SocialLinks from './SocialLinks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../navigation/AppNavigation';

type EditProfileProps = NativeStackScreenProps<
  AppStackParams,
  'PersonalInfoScreen'
>;

const EditProfileDetails = ({navigation}: EditProfileProps) => {
  return (
    <View
      style={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <View className="flex flex-row justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Image
            resizeMode="contain"
            className="w-16 h-16 rounded-md"
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              cache: 'reload',
            }}
          />
          <View className="flex flex-row space-x-2">
            <TouchableOpacity>
              <Image
                source={QrCodeIcon as any}
                className={`h-8 w-8`}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={CompanyIconGray as any}
                className={`h-8 w-8`}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row gap-1 items-center">
          <TouchableOpacity>
            <Image
              source={ShareIcon as any}
              className={`h-8 w-8`}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={IntegrationIcon as any}
              className={`h-8 w-8`}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PersonalInfoScreen', {
                cardId: null,
                status: 'CREATING',
              });
            }}>
            <Image
              source={AddButtonIcon as any}
              className={`h-8 w-8`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Details */}
      <PersonalDetails />

      {/* Contact Details */}
      <ContactDetails />

      {/* Location Details */}
      <LocationDetails />

      {/* Social Links */}
      <SocialLinks />
    </View>
  );
};

export default EditProfileDetails;
