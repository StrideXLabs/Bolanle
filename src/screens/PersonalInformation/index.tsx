import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import TextField from '../../components/TextField/TextFieldDark';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams,
  'PersonalInformationScreen'
>;

const PersonalInformation = ({navigation}: PersonalInformationProps) => {
  const {step, setStep, personalInformation, setPersonalInformation} =
    useCreateBusinessCard();

  const handleNextClick = () => {
    if (
      !personalInformation.name ||
      !personalInformation.designation ||
      !personalInformation.department ||
      !personalInformation.companyName
    ) {
      Toast.error({
        position: 'bottom',
        primaryText: 'All fields are required.',
        secondaryText: 'Please fill up all the details to continue.',
      });
      return;
    }

    setStep(step + 1);
    navigation.push('ContactDetailsScreen');
  };

  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(32 / percentToPx),
        paddingHorizontal: responsiveHeight(40 / percentToPx),
      }}>
      <KeyboardAvoidingView contentContainerStyle={{height: '100%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}>
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
              heading="PERSONAL INFORMATION"
              subtitle="Please add your personal details to get started."
            />
          </View>
          <View className="flex">
            <View
              className="flex"
              style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
              <Text
                style={[
                  textStyles.robotoMedium,
                  {
                    marginBottom: responsiveHeight(5 / percentToPx),
                    fontSize: responsiveFontSize(16 / percentToPx),
                  },
                ]}
                className="font-bold text-dark-blue">
                Full Name
              </Text>
              <TextField
                onChangeText={text => {
                  setPersonalInformation({
                    ...personalInformation,
                    name: text,
                  });
                }}
                value={personalInformation.name}
                placeholder="Enter your full name"
              />
            </View>
            <View
              className="flex"
              style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
              <Text
                style={[
                  textStyles.robotoMedium,
                  {
                    marginBottom: responsiveHeight(5 / percentToPx),
                    fontSize: responsiveFontSize(16 / percentToPx),
                  },
                ]}
                className="font-bold text-dark-blue">
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
            <View
              className="flex"
              style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
              <Text
                style={[
                  textStyles.robotoMedium,
                  {
                    marginBottom: responsiveHeight(5 / percentToPx),
                    fontSize: responsiveFontSize(16 / percentToPx),
                  },
                ]}
                className="font-bold text-dark-blue">
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
            <View className="flex">
              <Text
                style={[
                  textStyles.robotoMedium,
                  {
                    marginBottom: responsiveHeight(5 / percentToPx),
                    fontSize: responsiveFontSize(16 / percentToPx),
                  },
                ]}
                className="font-bold text-dark-blue">
                Company
              </Text>
              <TextField
                onChangeText={text => {
                  setPersonalInformation({
                    ...personalInformation,
                    companyName: text,
                  });
                }}
                value={personalInformation.companyName}
                placeholder="Enter your company name"
              />
            </View>
          </View>
          {/* <View className="flex flex-row items-center flex-wrap ml-1 mt-[22px]">
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
        </View> */}
          <View
            style={{marginTop: responsiveHeight(78 / percentToPx)}}
            className="w-full">
            <Button text="Next" callback={handleNextClick} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PersonalInformation;
