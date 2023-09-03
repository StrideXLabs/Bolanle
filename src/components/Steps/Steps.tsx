import {View} from 'react-native';
import React from 'react';
import {useAccount} from '../../hooks/useAccount';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

const Steps = () => {
  const {step} = useAccount();
  //   const step = 3;
  return (
    <View
      className="flex-row justify-center items-center w-full "
      style={{
        marginTop: responsiveHeight(10 / percentToPx),
      }}>
      <View
        className={`${step === 0 ? 'w-4' : 'w-2'} h-2 rounded-full mx-0.5 ${
          step === 0 ? 'bg-primary-blue' : 'bg-secondary-blue'
        }`}
      />
      <View
        className={`${step === 1 ? 'w-4' : 'w-2'} h-2 rounded-full mx-0.5 ${
          step === 1 ? 'bg-primary-blue' : 'bg-secondary-blue'
        }`}
      />
      <View
        className={`${step === 2 ? 'w-4' : 'w-2'} h-2 rounded-full mx-0.5 ${
          step === 2 ? 'bg-primary-blue' : 'bg-secondary-blue'
        }`}
      />
    </View>
  );
};

export default Steps;
