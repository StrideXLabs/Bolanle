import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import editIcon from '../../assets/images/edit.png';
import email from '../../assets/images/email.png';
import location from '../../assets/images/location.png';
import phone from '../../assets/images/phone.png';
import web from '../../assets/images/web.png';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

type Props = {
  editable: boolean;
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['contactDetails']) => void;
};

const ContactDetails = ({contactDetails, onEditPress, editable}: Props) => {
  return (
    <>
      <View
        className="flex flex-row items-center justify-between"
        style={{
          marginTop: responsiveHeight(17 / percentToPx),
          marginBottom: responsiveHeight(13 / percentToPx),
        }}>
        <Text
          style={[
            textStyles.robotoBold,
            {fontSize: responsiveFontSize(18 / percentToPx)},
          ]}
          className="text-accent">
          Contact Details
        </Text>
        {editable && (
          <TouchableOpacity
            activeOpacity={0.8}
            className="p-1"
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
          <Text
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(13 / percentToPx)},
            ]}
            className="text-dark-blue">
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
          <Text
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(13 / percentToPx)},
            ]}
            className="text-dark-blue">
            {contactDetails.mobile}
          </Text>
        </View>
        <View className="flex flex-row flex-wrap items-center gap-2 mb-[12px]">
          <View className="flex justify-center items-center bg-accent rounded-full w-[30px] h-[30px] p-2">
            <Image
              resizeMode="cover"
              className="w-full h-full mr-[1.5px]"
              source={web as ImageSourcePropType}
            />
          </View>
          <Text
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(13 / percentToPx)},
            ]}
            className="text-dark-blue">
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
          <Text
            style={[
              textStyles.robotoRegular,
              {
                fontSize: responsiveFontSize(13 / percentToPx),
                paddingRight: responsiveHeight(2),
              },
            ]}
            className="text-dark-blue">
            {contactDetails.companyAddress}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ContactDetails;
