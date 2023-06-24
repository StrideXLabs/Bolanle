import React from 'react';
import {Text, View, Image, ImageSourcePropType} from 'react-native';
import textStyles from '../../../constants/fonts';

import arrowLeft from '../../../assets/images/arrow-left.png';
import addNewIcon from '../../../assets/images/add.png';
import shareIcon from '../../../assets/images/share.png';

export interface IDashboardHeaderProps {
  heading?: string;
  subtitle?: string;
  subheading?: string;
  onShareBtnPress?: () => void;
  onAddNewBtnPress?: () => void;
  options?: {
    showShareBtn?: boolean;
    showAddNewTtn?: boolean;
    showHeaderOnly?: boolean;
  };
}

const DashboardHeader = ({
  heading,
  options,
  subtitle,
  subheading,
  onAddNewBtnPress,
}: IDashboardHeaderProps) => {
  return (
    <View className="pt-8 px-9">
      {heading && (
        <View className="flex flex-row items-center justify-between">
          <Text
            style={textStyles.bebasNeueBold}
            className="text-dark-blue text-4xl">
            {heading}
          </Text>
          <View className="flex flex-row items-center">
            <Image
              resizeMode="center"
              className="h-[23px]"
              source={addNewIcon as ImageSourcePropType}
            />
            <Text
              style={textStyles.robotoMedium}
              className="text-dark-blue text-base -ml-[22px]">
              Add New
            </Text>
          </View>
        </View>
      )}
      {subheading && (
        <View>
          <View className="flex flex-row justify-between">
            <View>
              <Image
                className="w-[22px] h-[14px]"
                resizeMode="contain"
                source={arrowLeft as ImageSourcePropType}
              />
              <Text
                style={textStyles.bebasNeueBold}
                className="text-dark-blue text-4xl mt-[15px]">
                {subheading}
              </Text>
            </View>
            <View className="flex flex-row">
              <Image
                resizeMode="contain"
                className="w-[22px] h-[14px] mt-1 mr-1"
                source={shareIcon as ImageSourcePropType}
              />
              <Text
                style={textStyles.robotoMedium}
                className="text-dark-blue text-base">
                Share
              </Text>
            </View>
          </View>
          <View className="w-full h-[2px] bg-dark-blue rounded-sm" />
          <Text
            style={textStyles.robotoMedium}
            className="text-dark-blue text-[16px] mt-1">
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardHeader;
