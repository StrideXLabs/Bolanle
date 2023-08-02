import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';
import editIcon from '../../assets/images/edit.png';

type Props = {
  cardId: string;
  editable: boolean;
  personalInfo: ICardData['personalInfo'];
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['contactDetails']) => void;
};

const Header = ({
  cardId,
  editable,
  onEditPress,
  personalInfo,
  contactDetails,
}: Props) => {
  return (
    <>
      <View
        className="w-full flex justify-center items-center"
        style={{marginBottom: responsiveHeight(24 / percentToPx)}}>
        <Image
          resizeMode="contain"
          style={{width: 94, height: 94}}
          className="rounded-md"
          source={{
            uri:
              BASE_URL +
              `/${cardId}/${contactDetails?.companyLogo}` +
              `?time=${Date.now()}`,
            cache: 'reload',
          }}
        />
      </View>
      {editable && (
        <TouchableOpacity
          className="absolute p-1 -mt-1"
          style={{right: 0}}
          activeOpacity={0.8}
          onPress={() => onEditPress(contactDetails)}>
          <Image
            resizeMode="contain"
            className="w-[16.5px] h-[16.5px]"
            source={editIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      )}
      <View className="flex flex-row gap-2">
        <Image
          resizeMode="stretch"
          style={{aspectRatio:1, height: 62}}
          className="rounded-full"
          source={{
            uri:
              BASE_URL +
              `/${cardId}/${contactDetails?.profileImage}` +
              `?time=${Date.now()}`,
            cache: 'reload',
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
