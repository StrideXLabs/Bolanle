import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ICreateAccountState,
  ICreateAccountActions,
} from '../../../hooks/useAccount/interface';

import {useAccount} from '../../../hooks/useAccount';
import StaticContainer from '../../../containers/StaticContainer';
import GenericCardContainer from '../../../containers/GenericCardContainer';
import GenericButton from '../../../components/Button/GenericButton/GenericButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import ImagePicker from '../../../components/ImagePicker/ImagePicker';
import Steps from '../../../components/Steps/Steps';

const ExtraInformation = () => {
  const {accountPhotos, setAccountPhotos, step, setStep} = useAccount();

  const handleSkip = () => {};
  const handleFinalize = () => {};

  return (
    <StaticContainer isBack={true} isHeader={true} title="Extras">
      <View className="w-full flex-1 items-center">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-semibold text-black">
              Step 3: Add pictures to stand out
            </Text>
          </View>
          <View className="w-full flex-row justify-around">
            <ImagePicker label="Profile Photo" handleButtonPress={() => {}} />
            <ImagePicker label="Company Logo" handleButtonPress={() => {}} />
          </View>
          <View
            className="w-full"
            style={{marginTop: responsiveHeight(10 / percentToPx)}}>
            <TouchableOpacity
              className="w-full justify-center items-center py-4"
              onPress={handleSkip}>
              <Text className="text-center text-black text-lg font-semibold">
                Skip
              </Text>
            </TouchableOpacity>
            <View
              className="w-full"
              style={{marginTop: responsiveHeight(10 / percentToPx)}}>
              <GenericButton handlePress={handleFinalize} title="Finalize" />
            </View>
          </View>
        </GenericCardContainer>
        <Steps />
      </View>
    </StaticContainer>
  );
};

export default ExtraInformation;
