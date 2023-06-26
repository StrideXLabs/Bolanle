import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

type Props = {
  personalInfo: ICardData['personalInfo'];
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['contactDetails']) => void;
};

const Header = ({contactDetails, onEditPress, personalInfo}: Props) => {
  return (
    <>
      <View
        className="w-full flex justify-center items-center"
        style={{marginBottom: responsiveHeight(24 / percentToPx)}}>
        <Image
          resizeMode="center"
          style={{width: 94, height: 94}}
          className="rounded-md"
          source={{
            uri: BASE_URL + `/${contactDetails?.companyLogo}`,
          }}
        />
      </View>
      <View className="flex flex-row gap-2">
        <Image
          style={{width: 60, height: 62}}
          className="rounded-full"
          source={{
            uri: BASE_URL + `/${contactDetails?.profileImage}`,
          }}
        />
        <View>
          <Text
            className="text-[#334155]"
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(16 / percentToPx)},
            ]}>
            {personalInfo?.name}
          </Text>
          <Text
            className="text-[#334155]"
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(12 / percentToPx)},
            ]}>
            {personalInfo?.designation || 'NA'}
          </Text>
          <Text
            className="text-[#636769]"
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(12 / percentToPx)},
            ]}>
            {personalInfo?.companyName || 'NA'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Header;
