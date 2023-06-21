import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import textStyles from '../../../constants/fonts';
import {AppStackParams} from '../../../navigation/AppNavigation';
import {useCreateBusinessCard} from '../../../store/createBusinessCard';
import {PlusIcon} from 'react-native-heroicons/outline';
import Upload from './Upload';

export type ContactDetailsProps = NativeStackScreenProps<
  AppStackParams,
  'ContactDetails'
>;

const ContactDetails = ({navigation}: ContactDetailsProps) => {
  const {step, setStep, personalInformation, setPersonalInformation} =
    useCreateBusinessCard();

  return (
    <View className="px-[40px] py-[53px]">
      <HeaderStepCount
        step={step}
        onBackPress={() => {
          setStep(step === 0 ? 0 : step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <Text>PersonalInformation</Text>
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
              setPersonalInformation({...personalInformation, fullName: text});
            }}
            value={personalInformation.fullName}
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
            onChangeText={text => {
              setPersonalInformation({
                ...personalInformation,
                designation: text,
              });
            }}
            value={personalInformation.designation}
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
              setPersonalInformation({
                ...personalInformation,
                department: text,
              });
            }}
            value={personalInformation.department}
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
              setPersonalInformation({...personalInformation, company: text});
            }}
            value={personalInformation.company}
            placeholder="Enter your company address"
          />
        </View>
      </View>
      <Upload />
      <View className="w-full flex-grow mt-10 ml-1">
        <Button
          callback={() => {
            setStep(step + 1);
            // navigation.push('ContactDetails');
          }}
          text="Next"
          className="w-full"
        />
      </View>
    </View>
  );
};

export default ContactDetails;
