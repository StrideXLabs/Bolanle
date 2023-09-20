import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
} from 'react-native';
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
import {LocationIcon} from '../../constants/icons';
import GetLocation from 'react-native-get-location';
import Check from '../../assets/svgs/Check.svg';

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

  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [isFetchedLocation, setIsFetchedLocation] = useState<boolean>(false);

  const validateData = () => {
    if (
      !contactDetails.email ||
      // !contactDetails.mobile ||
      // !contactDetails.websiteUrl ||
      // !contactDetails.companyAddress ||
      !contactDetails.companyLogo ||
      !contactDetails.profilePicture
    ) {
      Toast.error({
        primaryText: 'Some fields are required.',
        secondaryText: 'Please fill up those fields to continue.',
      });
      return false;
    }

    if (!emailRegex.test(contactDetails.email)) {
      Toast.error({primaryText: 'Email must be a valid.'});
      return false;
    }

    if (contactDetails.websiteUrl) {
      if (!isValidURL(contactDetails.websiteUrl)) {
        Toast.error({primaryText: 'Website URL must be valid URL.'});
        return false;
      }
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
        lat: contactDetails.lat,
        lng: contactDetails.lng,
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

  const handleSkipClick = () => {
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

  const handleGetLocationClick = () => {
    setIsFetchingLocation(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setIsFetchingLocation(false);
        setContactDetails({
          ...contactDetails,
          lat: location.latitude.toString(),
          lng: location.longitude.toString(),
        });
        setIsFetchedLocation(true);
      })
      .catch(error => {
        setIsFetchingLocation(false);
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    if (isFetchedLocation) {
      setTimeout(() => {
        setIsFetchedLocation(false);
      }, 3000);
    }
  }, [isFetchedLocation]);

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
                placeholder="Your Business Email"
              />
              <GenericTextField
                keyboardType="phone-pad"
                onChangeText={text => {
                  setContactDetails({
                    ...contactDetails,
                    mobile: text,
                  });
                }}
                value={contactDetails.mobile}
                placeholder="Your phone number (optional)"
              />
              <GenericTextField
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={text => {
                  setContactDetails({
                    ...contactDetails,
                    websiteUrl: text,
                  });
                }}
                value={contactDetails.websiteUrl}
                placeholder="Your company website url (optional)"
              />
              <GenericTextField
                // multiline
                textAlignVertical="top"
                onChangeText={text => {
                  setContactDetails({...contactDetails, companyAddress: text});
                }}
                value={contactDetails.companyAddress}
                placeholder="Your company address (optional)"
              />
              {/* <TouchableOpacity
                className={`flex-row w-full justify-center items-center bg-white py-3 rounded-xl ${
                  isFetchedLocation ? 'border-2 border-[#32CD32]' : ''
                }`}
                onPress={handleGetLocationClick}>
                {!isFetchedLocation && (
                  <Image
                    source={LocationIcon as ImageSourcePropType}
                    style={{width: 20, height: 20}}
                  />
                )}
                {isFetchingLocation ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Text className="text-primary-blue ml-2">
                    {isFetchedLocation
                      ? 'Live Location Fetched :)'
                      : 'Add Live Location'}
                  </Text>
                )}
              </TouchableOpacity> */}
              <TouchableOpacity
                className={`flex-row w-full justify-center items-center bg-white  py-3 rounded-xl ${
                  isFetchedLocation ? 'border-2 border-[#32CD32]' : ''
                } h-12`}
                onPress={handleGetLocationClick}>
                {!isFetchedLocation && !isFetchingLocation && (
                  <Image
                    source={LocationIcon as ImageSourcePropType}
                    style={{width: 20, height: 20}}
                  />
                )}
                {isFetchingLocation ? (
                  <ActivityIndicator size="small" color="#1C75BC" />
                ) : isFetchedLocation ? (
                  <>
                    <Check
                      width={responsiveHeight(20 / percentToPx)}
                      height={responsiveHeight(20 / percentToPx)}
                    />
                    <Text className="text-[#32CD32] ml-2">
                      Location fetched
                    </Text>
                  </>
                ) : (
                  <Text className="text-primary-blue">Add Live Location</Text>
                )}
              </TouchableOpacity>
            </View>

            <Upload status={status} cardId={cardId!} />

            <View style={{marginTop: responsiveHeight(26 / percentToPx)}}>
              <Button
                disabled={updating || isFetchingLocation}
                showLoading={updating}
                callback={
                  status === 'EDITING' ? handleUpdateDetails : handleSkipClick
                }
                text={'Skip'}
                className="w-full"
                showBackgroundColor={false}
              />
            </View>

            <View style={{marginTop: responsiveHeight(12 / percentToPx)}}>
              <Button
                disabled={updating || isFetchingLocation}
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
