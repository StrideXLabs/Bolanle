import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import textStyles from '../../../constants/fonts';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import addNewIcon from '../../../assets/images/add.png';
import arrowLeft from '../../../assets/images/arrow-left.png';
import shareIcon from '../../../assets/images/share.png';
import {percentToPx} from '../../../constants';

export interface IDashboardHeaderProps {
  heading?: string;
  subtitle?: string;
  subheading?: string;
  onBackBtnPress?: () => void;
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
  onBackBtnPress,
  onShareBtnPress,
  onAddNewBtnPress,
}: IDashboardHeaderProps) => {
  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(17 / percentToPx),
        paddingHorizontal: responsiveHeight(30 / percentToPx),
      }}>
      {heading && (
        <View className="flex flex-row items-center justify-between">
          <Text
            style={[
              textStyles.bebasNeueBold,
              {fontSize: responsiveFontSize(28 / percentToPx)},
            ]}
            className="text-dark-blue">
            {heading}
          </Text>
          <TouchableOpacity
            onPress={
              typeof onAddNewBtnPress === 'function'
                ? onAddNewBtnPress
                : () => {}
            }
            className="flex flex-row items-center">
            <Image
              resizeMode="center"
              style={{
                width: responsiveWidth(7),
                height: responsiveHeight(7),
              }}
              source={addNewIcon as ImageSourcePropType}
            />
            <Text
              style={[
                textStyles.robotoMedium,
                {
                  fontSize: responsiveFontSize(16 / percentToPx),
                  marginLeft: responsiveHeight(10 / percentToPx),
                },
              ]}
              className="text-dark-blue">
              Add New
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {subheading && (
        <View>
          <View className="flex flex-row justify-between">
            <View>
              <TouchableOpacity
                onPress={
                  typeof onBackBtnPress === 'function'
                    ? onBackBtnPress
                    : () => {}
                }>
                <Image
                  style={{
                    width: responsiveWidth(35 / percentToPx),
                    height: responsiveHeight(25 / percentToPx),
                  }}
                  resizeMode="contain"
                  source={arrowLeft as ImageSourcePropType}
                />
              </TouchableOpacity>
              <Text
                style={[
                  textStyles.bebasNeueBold,
                  {
                    fontSize: responsiveFontSize(28 / percentToPx),
                    marginTop: responsiveHeight(10 / percentToPx),
                  },
                ]}
                className="text-dark-blue">
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
          <View
            className="w-full h-[2px] bg-dark-blue rounded-sm"
            style={{marginTop: responsiveHeight(10 / percentToPx)}}
          />
          <Text
            style={[
              textStyles.robotoRegular,
              {
                marginTop: responsiveHeight(4 / percentToPx),
                fontSize: responsiveFontSize(13 / percentToPx),
              },
            ]}
            className="text-dark-blue">
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardHeader;
