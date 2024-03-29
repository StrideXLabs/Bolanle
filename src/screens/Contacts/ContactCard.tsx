import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IContact} from '.';
import menuIcon from '../../assets/images/menu.png';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {responsiveHeight} from 'react-native-responsive-dimensions';

interface IContactCardProps {
  contact: IContact;
  onPress: (contact: IContact) => void;
  viewContact: (contact: IContact) => void;
}

const ContactCard = ({contact, viewContact, onPress}: IContactCardProps) => {
  const {contact: {contactDetails, personalInfo, ...rest} = {}} = contact || {};

  return (
    <View
      className="w-full bg-secondary-blue"
      style={{
        borderRadius: 20,
        paddingHorizontal: responsiveHeight(10 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-2 items-center">
          <TouchableOpacity
            onPress={() =>
              viewContact({contactDetails, personalInfo, ...rest})
            }>
            <Image
              resizeMode="stretch"
              className="h-[60px] w-[60px] rounded-full"
              source={{
                uri: BASE_URL + `/${rest._id}/${contactDetails?.profileImage}`,
                cache: 'reload',
              }}
            />
          </TouchableOpacity>
          <View className="flex flex-wrap">
            <TouchableOpacity
              onPress={() =>
                viewContact({contactDetails, personalInfo, ...rest})
              }>
              <Text className="text-black font-2 text-base">
                {personalInfo?.name}
              </Text>
            </TouchableOpacity>
            <Text className="text-black text-[12px] font-1">
              {personalInfo?.designation}
            </Text>
            {/* <Text className="text-black text-[12px] font-0">
              {personalInfo?.companyName}
            </Text> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onPress({contactDetails, personalInfo, ...rest})}
          style={{padding: responsiveHeight(1)}}>
          <Image
            resizeMode="contain"
            className="h-[20px] w-[20px]"
            source={menuIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      </View>

      <View
        className="flex flex-row flex-wrap"
        style={{
          marginLeft: responsiveHeight(64 / percentToPx),
        }}>
        <>
          <Text className="font-0">{personalInfo.companyName}</Text>
          <View className="border-r-2 border-gray-300 mx-[5px] my-1" />
          <Text className="font-0">{contactDetails.mobile}</Text>
          <View className="border-r-2 border-gray-300 mx-[5px] my-1" />
          <Text className="font-0">{contactDetails.email}</Text>
        </>
      </View>

      {contact.tags && contact.tags.length > 0 && (
        <View className="flex flex-row space-x-2 mt-[6px] flex-wrap">
          {contact.tags &&
            contact.tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={{backgroundColor: tag.color}}
                className="rounded-full px-2 py-1">
                <Text className="font-0 text-white">{tag.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

export default ContactCard;
