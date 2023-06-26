import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';

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
        <ArrowLeftIcon size={responsiveWidth(5.5)} color="black" />
      </TouchableOpacity>
      <View className="flex-grow items-center">
        {showDotes && (
          <View className="flex flex-row gap-2">
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
    </View>
  );
};

export default HeaderStepCount;
