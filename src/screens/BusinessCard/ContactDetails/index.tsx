import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import {emailRegex} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import isValidURL from '../../../lib/isValidUrl';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';
import Upload from './Upload';

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
    <ScrollView>
      <View className="px-[40px] py-[53px]">
        <HeaderStepCount
          step={step}
          onBackPress={() => {
            setStep(step === 0 ? 0 : step - 1);
            navigation.canGoBack() && navigation.goBack();
          }}
        />
        <Text>contactDetails</Text>
        <View className="mt-9 mb-[30px]">
          <HeaderWithText
            heading="CONTACT DETAILS"
            subtitle="Please add the contact details to display on digital card."
          />
        </View>
        <View className="flex gap-[10px]">
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Email
            </Text>
            <TextField
              onChangeText={text => {
                setContactDetails({
                  ...contactDetails,
                  email: text,
                });
              }}
              value={contactDetails.email}
              placeholder="Enter your email address"
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Mobile
            </Text>
            <TextField
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
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Website URL
            </Text>
            <TextField
              onChangeText={text => {
                setContactDetails({
                  ...contactDetails,
                  websiteUrl: text,
                });
              }}
              value={contactDetails.websiteUrl}
              placeholder="Enter your company website url"
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Company Address
            </Text>
            <TextField
              multiline
              className="h-[80px]"
              textAlignVertical="top"
              onChangeText={text => {
                setContactDetails({...contactDetails, companyAddress: text});
              }}
              value={contactDetails.companyAddress}
              placeholder="Enter your company address"
            />
          </View>
        </View>
        <Upload />
        <View className="w-full flex-grow mt-10 ml-1">
          <Button callback={handleNextClick} text="Next" className="w-full" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactDetails;
