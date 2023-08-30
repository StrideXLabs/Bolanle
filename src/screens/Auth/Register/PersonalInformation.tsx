import {Text, View} from 'react-native';
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
import {percentToPx} from '../../../constants';

const PersonalInformation = () => {
  const {personalDetails, setPersonalDetails, step, setStep} = useAccount();

  const handleNext = async () => {};

  return (
    <StaticContainer isBack={true} isHeader={true} title="Personal Details">
      <View className="w-full flex-1 items-center">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-semibold text-black">
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
                value={personalDetails.webUrl}
                onChangeText={(text: string) =>
                  setPersonalDetails({
                    ...personalDetails,
                    webUrl: text,
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
              handlePress={handleNext}
              title="Proceed"
              disabled={true}
              loading={false}
            />
          </View>
        </GenericCardContainer>
      </View>
    </StaticContainer>
  );
};

export default PersonalInformation;
