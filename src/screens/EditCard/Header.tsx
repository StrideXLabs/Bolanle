import React from 'react';
import {Image, Text, View} from 'react-native';
import {BASE_URL} from '../../constants';
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
      <View className="w-full flex justify-center items-center mb-6">
        <Image
          resizeMode="center"
          className="h-[94px] w-[94px] rounded-md"
          source={{
            uri: BASE_URL + `/${contactDetails?.companyLogo}`,
          }}
        />
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Image
          className="h-[60px] w-[60px] rounded-full"
          source={{
            uri: BASE_URL + `/${contactDetails?.profileImage}`,
          }}
        />
        <View>
          <Text
            className="text-[#334155] text-base"
            style={textStyles.robotoRegular}>
            {personalInfo?.name}
          </Text>
          <Text
            className="text-[#334155] text-[12px]"
            style={textStyles.robotoRegular}>
            {personalInfo?.designation || 'NA'}
          </Text>
          <Text
            className="text-[#636769] text-[12px]"
            style={textStyles.robotoRegular}>
            {personalInfo?.companyName || 'NA'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Header;
