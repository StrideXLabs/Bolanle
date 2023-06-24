import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const list = new Array(4).fill(0);

const HeaderStepCount = ({
  step,
  onBackPress,
  showDotes = true,
}: {
  step?: number;
  showDotes?: boolean;
  onBackPress: () => void;
}) => {
  return (
    <View className="flex flex-row items-center">
      <TouchableOpacity activeOpacity={0.6} onPress={onBackPress}>
        <ArrowLeftIcon size={25} color="black" />
      </TouchableOpacity>
      {showDotes && (
        <View className="flex flex-row gap-2 ml-[30%]">
          {list.map((_, index) => (
            <View
              key={index}
              className={`${
                step === index
                  ? 'w-[30px] bg-accent'
                  : 'w-[15px] bg-off-white-2'
              } h-[6px] rounded-md`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default HeaderStepCount;
