import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
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
import {useCredentials} from '../../hooks/useCredentials';
import SelectDropdown from 'react-native-select-dropdown';
import StaticContainer from '../../containers/StaticContainer';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';
import RegistrationHeader from '../../components/Header/GenericHeader/RegistrationHeader';
import StaticContainerReg from '../../containers/StaticContainerReg';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams,
  'PersonalInformationScreen'
>;

const DEPARTMENTS = [
  'Executive Management (CEO, President, etc.)',
  'Sales',
  'Marketing',
  'Human Resources (HR)',
  'Finance',
  'Information Technology (IT)',
  'Research & Development (R&D)',
  'Operations',
  'Customer Service',
  'Business Development',
  'Quality Assurance',
  'Procurement/Purchasing',
  'Legal',
  'Public Relations (PR)',
  'Product Management',
  'Project Management',
  'Logistics/Supply Chain',
  'Engineering',
  'Administrative',
  'Sustainability / Environmental',
  'Facilities Management',
  'Risk Management',
  'Training and Development',
  'Compliance',
  'Production',
  'Design / Creative Services',
  'Security',
  'Data Analysis',
];

const PersonalInformation = ({
  navigation,
  route: {params},
}: PersonalInformationProps) => {
  const {status, cardId} = params;
  const [updating, setUpdating] = useState(false);
  const {setEmail, setPassword} = useCredentials();
  const {
    step,
    setStep,
    fromDashBoard,
    setSocialLinks,
    setSocialItems,
    setFromDashBoard,
    setContactDetails,
    personalInformation,
    setPersonalInformation,
  } = useCreateBusinessCard();

  const handleUpdateDetails = async () => {
    try {
      if (
        !personalInformation.name ||
        !personalInformation.designation ||
        !personalInformation.companyName
      ) {
        Toast.error({
          position: 'bottom',
          primaryText: 'All fields are required.',
          secondaryText: 'Please fill up all the details to continue.',
        });
        return;
      }

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

  const handleBackPress = async () => {
    await Promise.all([
      setSocialLinks([]),
      setSocialItems([]),
      setFromDashBoard(false),
      setContactDetails(initialContactDetails),
      setPersonalInformation(initialPersonalInformation),
    ]);
    setStep(step === 0 ? 0 : step - 1);

    if (fromDashBoard) navigation.replace('AppBottomNav');
    else navigation.canGoBack() && navigation.goBack();
  };

  const handleNextClick = () => {
    if (
      !personalInformation.name ||
      !personalInformation.designation ||
      !personalInformation.companyName
    ) {
      Toast.error({
        position: 'top',
        primaryText: 'All fields are required.',
        secondaryText: 'Please fill up all the details to continue.',
      });
      return;
    }

    setStep(step + 1);
    navigation.push('ContactDetailsScreen', {status, cardId});
  };

  useEffect(() => {
    const goBack = () => {
      (status === 'EDITING' || fromDashBoard) &&
        (async function () {
          await Promise.all([
            setStep(0),
            setEmail(''),
            setPassword(''),
            setSocialLinks([]),
            setSocialItems([]),
            setFromDashBoard(false),
            setContactDetails(initialContactDetails),
            setPersonalInformation(initialPersonalInformation),
          ]);
        })();

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
        title="Personal Information"
        onBackPress={handleBackPress}>
        <View
          className="w-full"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <KeyboardAvoidingView contentContainerStyle={{height: '100%'}}>
              <View
                style={{
                  marginTop: responsiveHeight(20 / percentToPx),
                  marginBottom: responsiveHeight(25 / percentToPx),
                }}>
                <View className="w-full">
                  <Text className="text-lg font-3 text-black">
                    Step 1: Enter your personal details
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginBottom: responsiveHeight(12 / percentToPx),
                }}>
                <View>
                  <GenericTextField
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

                <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
                  <GenericTextField
                    onChangeText={text => {
                      setPersonalInformation({
                        ...personalInformation,
                        designation: text,
                      });
                    }}
                    value={personalInformation.designation}
                    placeholder="Enter your Job Title"
                  />
                </View>

                <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
                  <SelectDropdown
                    data={DEPARTMENTS}
                    search={true}
                    defaultButtonText="Select a Department"
                    onSelect={(text, index) => {
                      setPersonalInformation({
                        ...personalInformation,
                        department: text,
                      });
                    }}
                    renderDropdownIcon={isOpened => {
                      return isOpened ? (
                        <ChevronUpIcon
                          color={'#9c9c9c'}
                          size={20}
                          style={{
                            marginRight: 6,
                          }}
                        />
                      ) : (
                        <ChevronDownIcon
                          color={'#9c9c9c'}
                          size={20}
                          style={{
                            marginRight: 6,
                          }}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    buttonStyle={{
                      width: '100%',
                      borderRadius: responsiveHeight(12 / percentToPx),
                      backgroundColor: '#fff',
                    }}
                    buttonTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(14 / percentToPx),
                      fontFamily: 'Poppins-Regular',
                      color: '#7D7D7D',
                    }}
                    dropdownStyle={{borderRadius: 8}}
                    rowTextStyle={{
                      textAlign: 'left',
                      fontSize: responsiveFontSize(15 / percentToPx),
                    }}
                  />
                </View>

                <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
                  <GenericTextField
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
                className="w-full"
                style={{marginTop: responsiveHeight(20 / percentToPx)}}>
                <Button
                  disabled={updating}
                  showLoading={updating}
                  text={status === 'EDITING' ? 'Save' : 'Next'}
                  callback={
                    status === 'EDITING' ? handleUpdateDetails : handleNextClick
                  }
                />
              </View>
            </KeyboardAvoidingView>
          </View>

          <HeaderStepCount step={step} showDotes={status !== 'EDITING'} />
        </View>
        {/* </ScrollView> */}
      </StaticContainerReg>
    </Layout>
  );
};

export default PersonalInformation;
