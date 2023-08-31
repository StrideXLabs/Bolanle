import {Text, View, Image, ImageSourcePropType} from 'react-native';
import React from 'react';
import {
  ICreateAccountState,
  ICreateAccountActions,
} from '../../../hooks/useAccount/interface';

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

const AccountInformation = () => {
  const {accountDetails, setAccountDetails, step, setStep} = useAccount();
  const [hide, setHide] = React.useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: true,
    confirmPassword: true,
  });

  const validateData = () => {
    if (
      !accountDetails.email ||
      !accountDetails.password ||
      !accountDetails.confirmPassword
    ) {
      Toast.error({
        primaryText: 'All fields are required.',
        secondaryText: 'Please fill up all the details to continue.',
      });
      return false;
    }

    if (!emailRegex.test(accountDetails.email)) {
      Toast.error({primaryText: 'Email must be a valid.'});
      return false;
    }

    if (accountDetails.password !== accountDetails.confirmPassword) {
      Toast.error({primaryText: 'Password must match.'});
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateData()) return;
    setStep(step + 1);
  };

  return (
    <StaticContainer isBack={true} isHeader={true} title="Account Details">
      <View className="w-full flex-1 items-center">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-semibold text-black">
              Step 1: Enter your account details
            </Text>
          </View>
          <View>
            <View
              style={{marginTop: responsiveHeight(20 / percentToPx)}}
              className="w-full">
              <GenericTextField
                placeholder="Email"
                value={accountDetails.email}
                onChangeText={(text: string) =>
                  setAccountDetails({
                    ...accountDetails,
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
            </View>
          </View>
          <View
            className="w-full"
            style={{marginTop: responsiveHeight(35 / percentToPx)}}>
            <GenericButton
              handlePress={handleNext}
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

export default AccountInformation;
