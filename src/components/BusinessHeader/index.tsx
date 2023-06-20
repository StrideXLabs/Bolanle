import React from 'react';
import {View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const list = new Array(4).fill(0);

const BusinessHeader = ({step}: {step: number}) => {
  return (
    <View className="flex flex-row items-center">
      <ArrowLeftIcon size={25} color="black" />
      <View className="flex flex-row gap-2 ml-[30%]">
        {list.map((_, index) => (
          <View
            className={`${
              step === index ? 'w-[30px] bg-accent' : 'w-[15px] bg-[#C9C9C9]'
            } h-[6px] rounded-md`}
          />
        ))}
      </View>
    </View>
  );
};

export default BusinessHeader;
