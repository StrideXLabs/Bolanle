import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

import {useCreateBusinessCard} from '../../../store/createBusinessCard';
import HeaderStepCount from '../HeaderStepCount';
import HeaderWithText from '../HeaderWithText';

const BusinessCardHeader = ({navigation}: NativeStackHeaderProps) => {
  const {setStep, step} = useCreateBusinessCard();

  return (
    <View className="flex justify-center items-center w-10 relative">
      <View>
        <HeaderStepCount
          step={step}
          onBackPress={() => {
            setStep(step === 0 ? 0 : step - 1);
            navigation.canGoBack() && navigation.goBack();
          }}
        />
        <Text>PersonalInformation</Text>
        <View className="mt-9 mb-[30px]">
          <HeaderWithText
            heading="PERSONAL INFORMATION"
            subtitle="Please add your personal details to get started."
          />
        </View>
      </View>
    </View>
  );
};

export default BusinessCardHeader;
