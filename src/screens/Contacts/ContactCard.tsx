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
}

const ContactCard = ({contact, onPress}: IContactCardProps) => {
  const {
    contact: {contactDetails, personalInfo, ...rest},
  } = contact as any;

  return (
    <View
      className="w-full border-[1px] border-[#E3E3E3]"
      style={{
        borderRadius: 25,
        paddingHorizontal: responsiveHeight(10 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-2 items-center">
          <Image
            resizeMode="stretch"
            className="h-[60px] w-[60px] rounded-full"
            source={{
              uri: BASE_URL + `/${rest._id}/${contactDetails?.profileImage}`,
              cache: 'reload',
            }}
          />
          <View className="flex flex-wrap">
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
          onPress={() => onPress({contactDetails, personalInfo, ...rest})}
          style={{padding: responsiveHeight(1)}}>
          <Image
            resizeMode="contain"
            className="h-[20px] w-[20px]"
            source={menuIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactCard;
