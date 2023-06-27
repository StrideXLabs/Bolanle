import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import TextField from '../../components/TextField/TextFieldDark';
import {emailRegex, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import isValidURL from '../../lib/isValidUrl';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import Upload from './Upload';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export type ContactDetailsProps = NativeStackScreenProps<
  AppStackParams,
  'ContactDetailsScreen'
>;

const ContactDetails = ({navigation}: ContactDetailsProps) => {
  const {step, setStep, contactDetails, setContactDetails} =
    useCreateBusinessCard();

  const handleNextClick = () => {
    if (
      !contactDetails.email ||
      !contactDetails.mobile ||
      !contactDetails.websiteUrl ||
      !contactDetails.companyAddress ||
      !contactDetails.companyLogo ||
      !contactDetails.profilePicture
    ) {
      Toast.error({
        primaryText: 'All fields are required.',
        secondaryText: 'Please fill up all the details to continue.',
      });
      return;
    }

    if (!emailRegex.test(contactDetails.email)) {
      Toast.error({primaryText: 'Email must be a valid.'});
      return;
    }

    if (!isValidURL(contactDetails.websiteUrl)) {
      Toast.error({primaryText: 'Website URL must be valid URL.'});
      return;
    }

    setStep(step + 1);
    navigation.push('SocialLinksScreen');
  };

  return (
    <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
      <View
        className="h-screen bg-white"
        style={{
          paddingVertical: responsiveHeight(32 / percentToPx),
          paddingHorizontal: responsiveHeight(40 / percentToPx),
        }}>
        <HeaderStepCount
          step={step}
          onBackPress={() => {
            setStep(step === 0 ? 0 : step - 1);
            navigation.canGoBack() && navigation.goBack();
          }}
        />
        <View
          style={{
            marginTop: responsiveHeight(20 / percentToPx),
            marginBottom: responsiveHeight(22 / percentToPx),
          }}>
          <HeaderWithText
            heading="CONTACT DETAILS"
            subtitle="Please add the contact details to display on digital card."
          />
        </View>
        <View style={{gap: responsiveHeight(10 / percentToPx)}}>
          <TextField
            label="Email"
            keyboardType="email-address"
            onChangeText={text => {
              setContactDetails({
                ...contactDetails,
                email: text,
              });
            }}
            value={contactDetails.email}
            placeholder="Enter your email address"
          />
          <TextField
            label="Mobile"
            keyboardType="number-pad"
            onChangeText={text => {
              setContactDetails({
                ...contactDetails,
                mobile: text,
              });
            }}
            value={contactDetails.mobile}
            placeholder="Enter mobile number"
          />
          <TextField
            label="Website URL"
            keyboardType="url"
            onChangeText={text => {
              setContactDetails({
                ...contactDetails,
                websiteUrl: text,
              });
            }}
            value={contactDetails.websiteUrl}
            placeholder="Enter your company website url"
          />
          <TextField
            label="Company Address"
            multiline
            textAlignVertical="top"
            onChangeText={text => {
              setContactDetails({...contactDetails, companyAddress: text});
            }}
            value={contactDetails.companyAddress}
            placeholder="Enter your company address"
            style={{height: responsiveHeight(80 / percentToPx)}}
          />
        </View>
        <Upload />
        <View style={{marginTop: responsiveHeight(35 / percentToPx)}}>
          <Button callback={handleNextClick} text="Next" className="w-full" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactDetails;
