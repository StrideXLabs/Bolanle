import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import textStyles from '../../../constants/fonts';
import {useCreateBusinessCard} from '../../../store/createBusinessCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../../navigation/AppNavigation';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams,
  'PersonalInformationScreen'
>;

const PersonalInformation = ({navigation}: PersonalInformationProps) => {
  const {step, setStep, personalInformation, setPersonalInformation} =
    useCreateBusinessCard();

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
        <Text>PersonalInformation</Text>
        <View className="mt-9 mb-[30px]">
          <HeaderWithText
            heading="PERSONAL INFORMATION"
            subtitle="Please add your personal details to get started."
          />
        </View>
        <View className="flex gap-[10px]">
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Full Name
            </Text>
            <TextField
              onChangeText={text => {
                setPersonalInformation({
                  ...personalInformation,
                  fullName: text,
                });
              }}
              value={personalInformation.fullName}
              placeholder="Enter your full name"
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Designation
            </Text>
            <TextField
              onChangeText={text => {
                setPersonalInformation({
                  ...personalInformation,
                  designation: text,
                });
              }}
              value={personalInformation.designation}
              placeholder="Enter your designation"
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Department
            </Text>
            <TextField
              onChangeText={text => {
                setPersonalInformation({
                  ...personalInformation,
                  department: text,
                });
              }}
              value={personalInformation.department}
              placeholder="Enter your department"
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Company
            </Text>
            <TextField
              onChangeText={text => {
                setPersonalInformation({...personalInformation, company: text});
              }}
              value={personalInformation.company}
              placeholder="Enter your company name"
            />
          </View>
        </View>
        <View className="flex flex-row items-center flex-wrap ml-1 mt-[22px]">
          <Text className="text-dark-blue text-[14px]">
            By Continuing, you agree to the{' '}
          </Text>
          <Text className="text-dark-blue text-[14px] underline decoration-dark-blue">
            Privacy Policy
          </Text>
          <Text className="text-dark-blue text-[14px]"> & </Text>
          <Text className="text-dark-blue text-[14px] underline decoration-dark-blue">
            Terms
          </Text>
          <Text className="text-dark-blue text-[14px] underline decoration-dark-blue">
            of Service
          </Text>
        </View>
        <View className="w-full flex-grow mt-10 ml-1">
          <Button
            callback={() => {
              setStep(step + 1);
              navigation.push('ContactDetailsScreen');
            }}
            text="Next"
            className="w-full"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInformation;
