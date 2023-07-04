import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {BASE_URL} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

interface ICardProps {
  card: ICardData;
  onCardPress: (card: ICardData) => void;
}

const Card = ({card, onCardPress}: ICardProps) => {
  const {personalInfo, contactDetails} = card;

  return (
    <Pressable
      onPress={() => onCardPress(card)}
      className="px-5 py-5 w-full rounded-md border-[1px] border-[#E3E3E3]">
      <View className="w-full flex justify-center items-center mb-6">
        <Image
          resizeMode="center"
          className="h-[94px] w-[94px] rounded-md"
          source={{
            uri: BASE_URL + `/${card._id}/${contactDetails?.companyLogo}`,
            cache: 'reload',
          }}
        />
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Image
          resizeMode="center"
          className="h-[60px] w-[60px] rounded-full"
          source={{
            uri:
              BASE_URL +
              `/${card._id}/${contactDetails?.profileImage}` +
              `?time=${Date.now()}`,
            cache: 'reload',
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
            {personalInfo?.designation}
          </Text>
          <Text
            className="text-[#636769] text-[12px]"
            style={textStyles.robotoRegular}>
            {personalInfo?.companyName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
