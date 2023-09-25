import React from 'react';
import {Image, ImageSourcePropType, Text, ScrollView, View} from 'react-native';
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
import TextField from '../../components/TextField/TextFieldDark';
import Button from '../../components/Button';

type Props = {
  editable: boolean;
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['contactDetails']) => void;
};

const ContactDetails = ({contactDetails, onEditPress, editable}: Props) => {
  return (
    <>
      <View
        style={{
          paddingHorizontal: responsiveHeight(20 / percentToPx),
          paddingVertical: responsiveHeight(14 / percentToPx),
        }}>
        <Text className="font-2 text-black text-2xl">Contact Details</Text>
        <View
          className="bg-secondary-blue p-4 rounded-2xl"
          style={{
            marginTop: responsiveHeight(14 / percentToPx),
          }}>
          <TextField
            placeholder=""
            value={contactDetails.email}
            bottomBorder
            editable={false}
            socialIcon={
              <View className="flex justify-center items-center bg-accent rounded-full w-8 h-8 p-2">
                <Image
                  resizeMode="contain"
                  className="w-full h-full"
                  source={email as ImageSourcePropType}
                />
              </View>
            }
          />
          <TextField
            placeholder=""
            value={contactDetails.mobile}
            bottomBorder
            editable={false}
            socialIcon={
              <View className="flex justify-center items-center bg-accent rounded-full w-8 h-8 p-2">
                <Image
                  resizeMode="contain"
                  className="w-full h-full"
                  source={phone as ImageSourcePropType}
                />
              </View>
            }
          />
          <TextField
            placeholder=""
            value={contactDetails.websiteUrl}
            bottomBorder
            editable={false}
            socialIcon={
              <View className="flex justify-center items-center bg-accent rounded-full w-8 h-8 p-2">
                <Image
                  resizeMode="contain"
                  className="w-full h-full"
                  source={web as ImageSourcePropType}
                />
              </View>
            }
          />
          <TextField
            placeholder=""
            value={contactDetails.companyAddress}
            bottomBorder
            editable={false}
            socialIcon={
              <View className="flex justify-center items-center bg-accent rounded-full w-8 h-8 p-2">
                <Image
                  resizeMode="contain"
                  className="w-full h-full"
                  source={location as ImageSourcePropType}
                />
              </View>
            }
          />

          <View className="px-2">
            {editable && (
              <Button
                text="Edit Details"
                callback={() => onEditPress(contactDetails)}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default ContactDetails;
