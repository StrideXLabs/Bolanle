import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import addNewIcon from '../../../assets/images/add.png';
import arrowLeft from '../../../assets/images/arrow-left.png';
import shareIcon from '../../../assets/images/share.png';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';

interface IDashboardHeaderAddTypeProps {
  heading: string;
  type: 'ADD_NEW_VIEW';
  onAddNewBtnPress: () => void;
}

interface IDashboardHeaderEditTypeProps {
  heading: string;
  subheading: string;
  type: 'VIEW_OR_EDIT';
  onBackBtnPress: () => void;
  onShareBtnPress: () => void;
}

interface IDashboardHeaderShareTypeProps
  extends Omit<Omit<IDashboardHeaderEditTypeProps, 'onShareBtnPress'>, 'type'> {
  type: 'SHARE_VIEW';
}

export type DashboardHeaderProps = {
  options:
    | IDashboardHeaderAddTypeProps
    | IDashboardHeaderEditTypeProps
    | IDashboardHeaderShareTypeProps;
};

const DashboardHeader = ({options}: DashboardHeaderProps) => {
  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(17 / percentToPx),
        paddingHorizontal: responsiveHeight(30 / percentToPx),
      }}>
      {options.type === 'ADD_NEW_VIEW' && (
        <View className="flex flex-row items-center justify-between">
          <Text
            style={[
              textStyles.bebasNeueBold,
              {fontSize: responsiveFontSize(28 / percentToPx)},
            ]}
            className="text-dark-blue">
            {options.heading}
          </Text>
          <TouchableOpacity
            onPress={options.onAddNewBtnPress}
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
      {(options.type === 'VIEW_OR_EDIT' || options.type === 'SHARE_VIEW') && (
        <View>
          <View className="flex flex-row justify-between">
            <View>
              <TouchableOpacity onPress={options.onBackBtnPress}>
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
                {options.heading}
              </Text>
            </View>
            {options.type !== 'SHARE_VIEW' && (
              <Pressable
                className="flex flex-row"
                onPress={options.onShareBtnPress}>
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
              </Pressable>
            )}
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
            {options.subheading}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardHeader;
