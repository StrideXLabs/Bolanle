import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import Layout from '../../components/Layout';
import TextField from '../../components/TextField/TextFieldDark';
import {percentToPx} from '../../constants';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../hooks/useBusinessCard/constants';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import dashboardService from '../../services/dashboard.service';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams,
  'PersonalInformationScreen'
>;

const PersonalInformation = ({
  navigation,
  route: {params},
}: PersonalInformationProps) => {
  const {status, cardId} = params;
  const [updating, setUpdating] = useState(false);
  const {
    step,
    setStep,
    setSocialLinks,
    setSocialItems,
    setFromDashBoard,
    setContactDetails,
    personalInformation,
    setPersonalInformation,
  } = useCreateBusinessCard();

  const handleUpdateDetails = async () => {
    try {
      if (!cardId) return;
      setUpdating(true);
      const response = await dashboardService.editCardDetails(cardId, {
        personalInfo: personalInformation,
      });

      setUpdating(false);
      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Information updated.'});
      setPersonalInformation(initialPersonalInformation);
      navigation.replace('EditCardScreen', {
        editable: true,
        card: response.data!,
      });
    } catch (error) {
      setUpdating(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  const handleBackPress = async () => {
    await Promise.all([
      setSocialLinks([]),
      setSocialItems([]),
      setFromDashBoard(false),
      setContactDetails(initialContactDetails),
      setPersonalInformation(initialPersonalInformation),
    ]);
    setStep(step === 0 ? 0 : step - 1);
    navigation.canGoBack() && navigation.goBack();
  };

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
    navigation.push('ContactDetailsScreen', {status, cardId});
  };

  return (
    <Layout>
      <View
        style={{
          paddingVertical: responsiveHeight(32 / percentToPx),
          paddingHorizontal: responsiveHeight(40 / percentToPx),
        }}>
        <KeyboardAvoidingView contentContainerStyle={{height: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}>
            <HeaderStepCount step={step} onBackPress={handleBackPress} />
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
                <TextField
                  label="Full Name"
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
                <TextField
                  label="Designation"
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
                <TextField
                  label="Department"
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
              <View>
                <TextField
                  label="Company"
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
            <View
              style={{marginTop: responsiveHeight(78 / percentToPx)}}
              className="w-full">
              <Button
                showLoading={updating}
                text={status === 'EDITING' ? 'Save' : 'Next'}
                callback={
                  status === 'EDITING' ? handleUpdateDetails : handleNextClick
                }
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Layout>
  );
};

export default PersonalInformation;
