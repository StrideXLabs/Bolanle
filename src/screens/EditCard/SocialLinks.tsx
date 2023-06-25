import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import editIcon from '../../assets/images/edit.png';
import deleteIcon from '../../assets/images/trash.png';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';
import {filledIconsMapping} from '../../constants/socials';

type Props = {
  socialLinks: ICardData['socialLinks'];
  onEditPress: (info: ICardData['socialLinks']) => void;
};

const SocialLinks = ({socialLinks, onEditPress}: Props) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mt-[21px] mb-[10px]">
        <Text style={textStyles.robotoBold} className="text-accent text-[20px]">
          Social Links
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onEditPress(socialLinks)}>
          <Image
            resizeMode="contain"
            className="w-[16.5px] h-[16.5px]"
            source={editIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      </View>
      <View className="mt-2">
        {socialLinks.map(social => {
          return (
            <View
              key={social.platform}
              className="w-full  flex flex-row items-center justify-between gap-2 mb-[12px]">
              <View className="flex items-center flex-row">
                <Image
                  resizeMode="center"
                  className="w-[30px] h-[30px]"
                  source={
                    filledIconsMapping[
                      social.platform as keyof typeof filledIconsMapping
                    ] as ImageSourcePropType
                  }
                />
                <Text
                  style={textStyles.robotoMedium}
                  className="text-dark-blue text-base ml-2">
                  {social.title}
                </Text>
              </View>
              <View className="w-4 h-4">
                <Image
                  resizeMode="center"
                  className="w-full h-full"
                  source={deleteIcon as ImageSourcePropType}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SocialLinks;
