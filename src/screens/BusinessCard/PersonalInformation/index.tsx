import React from 'react';
import {Text, View} from 'react-native';
import BusinessHeader from '../../../components/BusinessHeader';
import {useCreateBusinessCard} from '../../../store/createBusinessCard';
import Button from '../../../components/Button';

const PersonalInformation = () => {
  const {step, setStep} = useCreateBusinessCard();

  return (
    <View className="px-[40px] py-[53px]">
      <BusinessHeader step={step} />
      <Text>PersonalInformation</Text>

      <Button callback={() => setStep(step + 1)} text="Next" />
    </View>
  );
};

export default PersonalInformation;
