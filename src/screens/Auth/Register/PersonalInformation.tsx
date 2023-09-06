import {Text, View} from 'react-native';
import React from 'react';
// import {
//   ICreateAccountState,
//   ICreateAccountActions,
// } from '../../../hooks/useAccount/interface';

import {useAccount} from '../../../hooks/useAccount';
import StaticContainer from '../../../containers/StaticContainer';
import GenericCardContainer from '../../../containers/GenericCardContainer';
import GenericTextField from '../../../components/TextField/GenericTextField/GenericTextField';
import GenericButton from '../../../components/Button/GenericButton/GenericButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import Steps from '../../../components/Steps/Steps';
import Toast from '../../../lib/toast';
import isValidURL from '../../../lib/isValidUrl';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../../../navigation/AuthNavigation';

export type PersonalInfoProps = NativeStackScreenProps<
  OnboardingStackParams,
  'PersonalInfoScreen'
>;

const PersonalInformation: React.FC<PersonalInfoProps> = ({navigation}) => {
  const {personalDetails, setPersonalDetails, step, setStep} = useAccount();

  const validateData = () => {
    if (
      !personalDetails.name ||
      !personalDetails.phone ||
      !personalDetails.websiteUrl
    ) {
      Toast.error({
        primaryText: 'All fields are required.',
        secondaryText: 'Please fill up all the details to continue.',
      });
      return false;
    }

    if (!isValidURL(personalDetails.websiteUrl)) {
      Toast.error({primaryText: 'Website URL must be valid URL.'});
      return false;
    }

    return true;
  };

  const handleProceed = async () => {
    if (!validateData()) return;
    setStep(step + 1);
    navigation.navigate('AccountInfoScreen');
  };

  const handleBackPress = () => {
    setStep(step - 1);
  };

  return (
    <StaticContainer
      isBack={true}
      isHeader={true}
      title="Personal Details"
      callback={handleBackPress}>
      <View className="w-full flex-1 items-center">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-3 text-black">
              Step 1: Enter your personal details
            </Text>
          </View>
          <View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Full name"
                value={personalDetails.name}
                onChangeText={(text: string) =>
                  setPersonalDetails({
                    ...personalDetails,
                    name: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Phone number"
                value={personalDetails.phone}
                onChangeText={(text: string) =>
                  setPersonalDetails({
                    ...personalDetails,
                    phone: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Website Url"
                value={personalDetails.websiteUrl}
                onChangeText={(text: string) =>
                  setPersonalDetails({
                    ...personalDetails,
                    websiteUrl: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>
          </View>
          <View
            className="w-full"
            style={{marginTop: responsiveHeight(35 / percentToPx)}}>
            <GenericButton
              handlePress={handleProceed}
              title="Proceed"
              disabled={false}
              loading={false}
            />
          </View>
        </GenericCardContainer>
        <Steps />
      </View>
    </StaticContainer>
  );
};

export default PersonalInformation;
