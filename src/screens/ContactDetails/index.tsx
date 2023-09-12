import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View, Text} from 'react-native';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import Layout from '../../components/Layout';
import TextField from '../../components/TextField/TextFieldDark';
import {emailRegex, percentToPx} from '../../constants';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import {initialContactDetails} from '../../hooks/useBusinessCard/constants';
import {IContactDetails} from '../../hooks/useBusinessCard/interface';
import {getFileName} from '../../lib/getFileName';
import isValidURL from '../../lib/isValidUrl';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import dashboardService from '../../services/dashboard.service';
import Upload from './Upload';
import StaticContainerReg from '../../containers/StaticContainerReg';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';

export type ContactDetailsProps = NativeStackScreenProps<
  AppStackParams,
  'ContactDetailsScreen'
>;

const ContactDetails = ({
  navigation,
  route: {
    params: {status, cardId},
  },
}: ContactDetailsProps) => {
  const [updating, setUpdating] = useState(false);
  const {step, setStep, contactDetails, setContactDetails, fromDashBoard} =
    useCreateBusinessCard();

  const validateData = () => {
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
      return false;
    }

    if (!emailRegex.test(contactDetails.email)) {
      Toast.error({primaryText: 'Email must be a valid.'});
      return false;
    }

    if (!isValidURL(contactDetails.websiteUrl)) {
      Toast.error({primaryText: 'Website URL must be valid URL.'});
      return false;
    }

    return true;
  };

  const handleUpdateDetails = async () => {
    try {
      if (!validateData()) return;
      if (!cardId) return;

      setUpdating(true);
      const formData = new FormData();

      const tempData = {
        email: contactDetails.email,
        mobile: contactDetails.mobile,
        websiteUrl: contactDetails.websiteUrl,
        companyAddress: contactDetails.companyAddress,
      } as IContactDetails;

      formData.append('contactDetails', JSON.stringify(tempData));
      if (
        contactDetails.companyLogo &&
        typeof contactDetails.companyLogo !== 'string'
      ) {
        formData.append('companyLogo', {
          uri: (contactDetails.companyLogo as PickerImage).path,
          type: (contactDetails.companyLogo as PickerImage).mime,
          name:
            (contactDetails.companyLogo as PickerImage).filename ||
            getFileName((contactDetails.companyLogo as PickerImage).path),
        });
      }

      if (
        contactDetails.profilePicture &&
        typeof contactDetails.profilePicture !== 'string'
      ) {
        formData.append('profileImage', {
          uri: (contactDetails.profilePicture as PickerImage).path,
          type: (contactDetails.profilePicture as PickerImage).mime,
          name:
            (contactDetails.profilePicture as PickerImage).filename ||
            getFileName((contactDetails.profilePicture as PickerImage).path),
        });
      }

      const response = await dashboardService.editCardDetails(
        cardId,
        {contactDetails: formData},
        true,
      );

      setUpdating(false);
      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Information updated.'});
      setContactDetails(initialContactDetails);
      navigation.pop();
      navigation.replace('EditCardScreen', {
        editable: true,
        card: response.data!,
      });
    } catch (error) {
      setUpdating(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  const handleNextClick = () => {
    if (!validateData()) return;
    setStep(step + 1);
    navigation.push('SocialLinksScreen', {status, cardId});
  };

  useEffect(() => {
    const goBack = () => {
      (status === 'EDITING' || fromDashBoard) &&
        setContactDetails(initialContactDetails);
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, [fromDashBoard, status]);

  return (
    <Layout>
      <StaticContainerReg
        isBack
        isHeader
        title="Contact Details"
        onBackPress={() => {
          if (status === 'EDITING') {
            setContactDetails(initialContactDetails);
          }

          setStep(step === 0 ? 0 : step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}>
        <ScrollView
          className="h-screen w-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <View
              style={{
                marginTop: responsiveHeight(20 / percentToPx),
                marginBottom: responsiveHeight(25 / percentToPx),
              }}>
              <View className="w-full">
                <Text className="text-lg font-3 text-black">
                  Step 2: Enter your contact details
                </Text>
              </View>
            </View>
            <View style={{gap: responsiveHeight(17 / percentToPx)}}>
              <GenericTextField
                keyboardType="email-address"
                onChangeText={text => {
                  setContactDetails({
                    ...contactDetails,
                    email: text,
                  });
                }}
                autoCapitalize="none"
                value={contactDetails.email}
                placeholder="Enter your Business Email"
              />
              <GenericTextField
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
              <GenericTextField
                keyboardType="url"
                autoCapitalize="none"
                onChangeText={text => {
                  setContactDetails({
                    ...contactDetails,
                    websiteUrl: text,
                  });
                }}
                value={contactDetails.websiteUrl}
                placeholder="Enter your company website url"
              />
              <GenericTextField
                multiline
                textAlignVertical="top"
                onChangeText={text => {
                  setContactDetails({...contactDetails, companyAddress: text});
                }}
                value={contactDetails.companyAddress}
                placeholder="Enter your company address"
              />
            </View>
            <Upload status={status} cardId={cardId!} />
            <View style={{marginTop: responsiveHeight(35 / percentToPx)}}>
              <Button
                disabled={updating}
                showLoading={updating}
                callback={
                  status === 'EDITING' ? handleUpdateDetails : handleNextClick
                }
                text={status === 'EDITING' ? 'Save' : 'Next'}
                className="w-full"
              />
            </View>
          </View>

          <HeaderStepCount step={step} showDotes={status !== 'EDITING'} />
        </ScrollView>
      </StaticContainerReg>
    </Layout>
  );
};

export default ContactDetails;
