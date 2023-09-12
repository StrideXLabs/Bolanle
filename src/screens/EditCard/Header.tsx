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
import {PencilIcon} from '../../constants/icons';

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
        className="flex flex-row justify-between"
        style={{
          paddingHorizontal: responsiveHeight(20 / percentToPx),
          paddingVertical: responsiveHeight(14 / percentToPx),
        }}>
        <View className="flex flex-row gap-2">
          <Image
            resizeMode="stretch"
            style={{aspectRatio: 1, height: 70}}
            className="rounded-lg"
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
              className="text-[#334155] font-1"
              style={[{fontSize: responsiveFontSize(15 / percentToPx)}]}>
              {personalInfo?.name}
            </Text>
            <Text
              className="text-[#334155] font-1"
              style={[{fontSize: responsiveFontSize(12 / percentToPx)}]}>
              {personalInfo?.designation || 'NA'}
            </Text>
            <Text
              className="text-[#636769] font-1"
              style={[{fontSize: responsiveFontSize(12 / percentToPx)}]}>
              {personalInfo?.companyName || 'NA'}
            </Text>
          </View>
        </View>

        {editable && (
          <TouchableOpacity
            className="justify-center items-center"
            activeOpacity={0.8}
            onPress={() => onEditPress(contactDetails)}>
            <Image
              resizeMode="contain"
              className="w-8 h-8"
              source={PencilIcon as ImageSourcePropType}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Header;
