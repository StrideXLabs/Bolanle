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
import {BASE_URL} from '../../constants';
import textStyles from '../../constants/fonts';
import {responsiveHeight} from 'react-native-responsive-dimensions';

interface IContactCardProps {
  contact: IContact;
  onPress: (contact: IContact) => void;
}

const ContactCard = ({contact, onPress}: IContactCardProps) => {
  const {contactDetails, personalInfo} = contact;

  return (
    <View className="px-5 py-5 w-full rounded-md border-[1px] border-[#E3E3E3]">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-2 items-center">
          <Image
            resizeMode="center"
            className="h-[60px] w-[60px] rounded-full"
            source={{
              uri: BASE_URL + `/${contactDetails?.profileImage}`,
            }}
          />
          <View>
            <Text
              className="text-[#334155] text-base"
              style={textStyles.robotoRegular}>
              {personalInfo?.name}
            </Text>
            <Text
              className="text-[#334155] text-[12px]"
              style={textStyles.robotoRegular}>
              {personalInfo?.designation}
            </Text>
            <Text
              className="text-[#636769] text-[12px]"
              style={textStyles.robotoRegular}>
              {personalInfo?.companyName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onPress(contact)}
          style={{padding: responsiveHeight(1)}}>
          <Image
            resizeMode="center"
            className="h-[20px] w-[20px]"
            source={menuIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactCard;
