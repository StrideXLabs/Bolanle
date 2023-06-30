import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import editIcon from '../../assets/images/edit.png';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

import email from '../../assets/images/email.png';
import location from '../../assets/images/location.png';
import phone from '../../assets/images/phone.png';
import web from '../../assets/images/web.png';

type Props = {
  editable: boolean;
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['contactDetails']) => void;
};

const ContactDetails = ({contactDetails, onEditPress, editable}: Props) => {
  return (
    <>
      <View className="flex flex-row items-center justify-between mt-[21px] mb-[10px]">
        <Text style={textStyles.robotoBold} className="text-accent text-[20px]">
          Contact Details
        </Text>
        {editable && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onEditPress(contactDetails)}>
            <Image
              resizeMode="contain"
              className="w-[16.5px] h-[16.5px]"
              source={editIcon as ImageSourcePropType}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View className="flex flex-row items-center gap-2 mb-[12px]">
          <View className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] p-2">
            <Image
              resizeMode="center"
              className="w-full h-full"
              source={email as ImageSourcePropType}
            />
          </View>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {contactDetails.email}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2 mb-[12px]">
          <View className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] p-2">
            <Image
              resizeMode="center"
              className="w-full h-full"
              source={phone as ImageSourcePropType}
            />
          </View>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {contactDetails.mobile}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2 mb-[12px]">
          <View className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] p-2">
            <Image
              resizeMode="cover"
              className="w-full h-full mr-[1.5px]"
              source={web as ImageSourcePropType}
            />
          </View>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {contactDetails.websiteUrl}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2 mb-[12px]">
          <View className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] p-2">
            <Image
              resizeMode="center"
              className="w-full h-full"
              source={location as ImageSourcePropType}
            />
          </View>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {contactDetails.companyAddress}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ContactDetails;
