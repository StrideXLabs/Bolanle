import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import editIcon from '../../assets/images/edit.png';
import deleteIcon from '../../assets/images/trash.png';
import textStyles from '../../constants/fonts';
import {filledIconsMapping} from '../../constants/socials';
import {ICard} from '../../services/card.service';
import {ICardData} from '../../services/dashboard.service';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from '../../lib/toast';
import Button from '../../components/Button';

type Props = {
  editable: boolean;
  socialLinks: ICardData['socialLinks'];
  onDeleteLink: (social: ICard) => void;
  onEditPress: (info: ICardData['socialLinks']) => void;
};

const SocialLinks = ({
  editable,
  socialLinks,
  onEditPress,
  onDeleteLink,
}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <Text className="font-2 text-black text-2xl">Social Links</Text>
      <View
        className="bg-secondary-blue p-4 rounded-2xl"
        style={{
          marginTop: responsiveHeight(14 / percentToPx),
        }}>
        <View className="mt-2">
          {socialLinks.map(social => {
            return (
              <View
                key={social.platform}
                className="w-full  flex flex-row items-center justify-between gap-2 mb-[12px]">
                <View className="flex items-center flex-row">
                  <Image
                    resizeMode="contain"
                    className="w-[30px] h-[30px]"
                    source={
                      filledIconsMapping[
                        social.platform as keyof typeof filledIconsMapping
                      ] as ImageSourcePropType
                    }
                  />
                  <TouchableOpacity
                    onPress={async () => {
                      const canOpen = await Linking.canOpenURL(social.url);

                      if (canOpen) await Linking.openURL(social.url);
                      else {
                        Clipboard.setString(social.url);
                        Toast.success({
                          position: 'bottom',
                          primaryText: 'Copied Link.',
                        });
                      }
                    }}>
                    <Text
                      style={[
                        textStyles.robotoMedium,
                        {fontSize: responsiveFontSize(13 / percentToPx)},
                      ]}
                      className="text-dark-blue ml-2">
                      {social.title}
                    </Text>
                  </TouchableOpacity>
                </View>
                {editable && (
                  <Pressable
                    className="w-4 h-4"
                    onPress={() => onDeleteLink(social)}>
                    <Image
                      resizeMode="contain"
                      className="w-full h-full"
                      source={deleteIcon as ImageSourcePropType}
                    />
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>

        <View className="px-2">
          {editable && (
            <Button
              text="Edit Details"
              callback={() => onEditPress(socialLinks)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SocialLinks;
