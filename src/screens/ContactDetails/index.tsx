import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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
import isValidURL from '../../lib/isValidUrl';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import dashboardService from '../../services/dashboard.service';
import Upload from './Upload';
import {getFileName} from '../../lib/getFileName';
import {IContactDetails} from '../../hooks/useBusinessCard/interface';

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
  const {step, setStep, contactDetails, setContactDetails} =
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
  };

  const handleUpdateDetails = async () => {
    try {
      validateData();
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
    validateData();
    setStep(step + 1);
    navigation.push('SocialLinksScreen', {status, cardId});
  };

  return (
    <Layout>
      <ScrollView className="h-screen" showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: responsiveHeight(32 / percentToPx),
            paddingHorizontal: responsiveHeight(40 / percentToPx),
          }}>
          <HeaderStepCount
            step={step}
            showDotes={status !== 'EDITING'}
            onBackPress={() => {
              if (status === 'EDITING')
                setContactDetails(initialContactDetails);

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
          <Upload status={status} cardId={cardId!} />
          <View style={{marginTop: responsiveHeight(35 / percentToPx)}}>
            <Button
              showLoading={updating}
              callback={
                status === 'EDITING' ? handleUpdateDetails : handleNextClick
              }
              text={status === 'EDITING' ? 'Save' : 'Next'}
              className="w-full"
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ContactDetails;
