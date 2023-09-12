import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
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
import {percentToPx, emailRegex} from '../../../constants';
import {EyeIcon, EyeOffIcon} from '../../../constants/icons';
import Steps from '../../../components/Steps/Steps';
import Toast from '../../../lib/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../../../navigation/AuthNavigation';
import ImagePicker from '../../../components/ImagePicker/ImagePicker';

export type AccountInfoProps = NativeStackScreenProps<
  OnboardingStackParams,
  'AccountInfoScreen',
  'SocialLinksScreen'
>;

const AccountInformation: React.FC<AccountInfoProps> = ({navigation}) => {
  const {contactDetails, setContactDetails, step, setStep} = useAccount();
  const [loading, setLoading] = React.useState<{
    finalize: boolean;
    skip: boolean;
  }>({finalize: false, skip: false});
  // const [hide, setHide] = React.useState<{
  //   password: boolean;
  //   confirmPassword: boolean;
  // }>({
  //   password: true,
  //   confirmPassword: true,
  // });

  const validateData = () => {
    if (
      !contactDetails.email ||
      !contactDetails.mobile ||
      !contactDetails.websiteUrl ||
      !contactDetails.companyAddress
      // !contactDetails.companyLogo ||
      // !contactDetails.profilePicture
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

    // if (accountDetails.password !== accountDetails.confirmPassword) {
    //   Toast.error({primaryText: 'Password must match.'});
    //   return false;
    // }

    return true;
  };

  const handleNext = async () => {
    if (!validateData()) return;

    setStep(step + 1);
  };

  const handleBackPress = () => {
    setStep(step - 1);
  };

  const handleAddImage = () => {
    console.log('IMAGE ADDED');
  };

  const handleRemoveClick = () => {
    console.log('IMAGE REMOVED');
  };

  return (
    <StaticContainer
      isBack={true}
      isHeader={true}
      title="Account Details"
      callback={handleBackPress}>
      <ScrollView className="w-full flex-1">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-3 text-black">
              Step 2: Enter your account details
            </Text>
          </View>
          <View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Email"
                value={contactDetails.email}
                onChangeText={(text: string) =>
                  setContactDetails({
                    ...contactDetails,
                    email: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="email-address"
              />
            </View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Mobile number"
                value={contactDetails.mobile}
                onChangeText={(text: string) =>
                  setContactDetails({
                    ...contactDetails,
                    mobile: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="phone-pad"
              />
            </View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Company website url"
                value={contactDetails.websiteUrl}
                onChangeText={(text: string) =>
                  setContactDetails({
                    ...contactDetails,
                    websiteUrl: text,
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
                placeholder="Company address"
                value={contactDetails.companyAddress}
                onChangeText={(text: string) =>
                  setContactDetails({
                    ...contactDetails,
                    companyAddress: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
              />
            </View>

            <View className="items-center">
              <View className="w-full flex-row justify-around">
                <ImagePicker
                  label="Profile Photo"
                  handleButtonPress={handleAddImage}
                  // pickedImage={accountPhotos.profilePicture as Image}
                  handleRemoveClick={handleRemoveClick}
                />
                <ImagePicker
                  label="Company Logo"
                  // pickedImage={accountPhotos.companyLogo as Image}
                  handleButtonPress={handleAddImage}
                  handleRemoveClick={handleRemoveClick}
                />
              </View>
            </View>
            {/* <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Password"
                value={accountDetails.password}
                onChangeText={(text: string) =>
                  setAccountDetails({
                    ...accountDetails,
                    password: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
                secureTextEntry={hide.password}
                icon={
                  hide.password ? (
                    <Image
                      source={EyeIcon as ImageSourcePropType}
                      className="w-5 h-5"
                    />
                  ) : (
                    <Image
                      source={EyeOffIcon as ImageSourcePropType}
                      className="w-5 h-5"
                    />
                  )
                }
                onIconPress={() => setHide({...hide, password: !hide.password})}
              />
            </View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Confirm Password"
                value={accountDetails.confirmPassword}
                onChangeText={(text: string) =>
                  setAccountDetails({
                    ...accountDetails,
                    confirmPassword: text,
                  })
                }
                autoCapitalize="words"
                keyboardType="default"
                secureTextEntry={hide.confirmPassword}
                icon={
                  hide.confirmPassword ? (
                    <Image
                      source={EyeIcon as ImageSourcePropType}
                      className="w-5 h-5"
                    />
                  ) : (
                    <Image
                      source={EyeOffIcon as ImageSourcePropType}
                      className="w-5 h-5"
                    />
                  )
                }
                onIconPress={() =>
                  setHide({...hide, confirmPassword: !hide.confirmPassword})
                }
              />
            </View> */}
          </View>
          <View className="w-full">
            <GenericButton
              handlePress={handleNext}
              title="Proceed"
              disabled={false}
              loading={false}
            />
          </View>
        </GenericCardContainer>
        <Steps />
      </ScrollView>
    </StaticContainer>
  );
};

export default AccountInformation;
