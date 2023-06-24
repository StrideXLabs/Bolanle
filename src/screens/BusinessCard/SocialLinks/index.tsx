import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import textStyles from '../../../constants/fonts';
import SOCIALS, {ISocial, SocialLinkType} from '../../../constants/socials';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams,
  'SocialLinksScreen'
>;

const SocialView = ({
  id,
  image,
  title,
  onRemoveItem,
}: ISocial & {onRemoveItem: (id: SocialLinkType) => void}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-4">
        <View className="bg-accent w-10 h-10 rounded-full flex justify-center items-center">
          <View className="bg-white p-3 w-5 h-5 flex items-center justify-center rounded-full">
            <Image
              resizeMode="center"
              className="w-4 h-4"
              source={image as ImageSourcePropType}
              style={{tintColor: '#F1592A'}}
            />
          </View>
        </View>
        <Text
          style={textStyles.robotoMedium}
          className="text-dark-blue text-base">
          {title}
        </Text>
      </View>
      <Pressable
        onPress={() => onRemoveItem(id)}
        className="w-8 h-8 flex items-center justify-center">
        <TrashIcon size={15} color="#F1592A" />
      </Pressable>
    </View>
  );
};

const SocialLinksScreen = ({navigation, route: {params}}: SocialLinksProps) => {
  const {
    step,
    setStep,
    socialItems,
    setSocialItem,
    removeSocialItem,
    removeSocialLink,
  } = useCreateBusinessCard();
  const toSocial = params?.toSocialLinks ?? false;

  const handleNextClick = () => {
    if (socialItems.length === 0)
      return Toast.error({
        primaryText: 'Please select at least one Social Link.',
        secondaryText:
          'This will be displayed on your business card information.',
      });

    const item = socialItems[0];

    if (item.id === 'whatsapp')
      navigation.navigate('WhatsAppScreen', {fromSocialLinks: false});
    else navigation.navigate('OtherSocialsScreen', {fromSocialLinks: false});
  };

  const handleSelectSocialItem = (item: ISocial) => {
    if (toSocial) {
      const exist = socialItems.find(i => i.id === item.id);
      if (!exist)
        navigation.navigate(
          item.id === 'whatsapp' ? 'WhatsAppScreen' : 'OtherSocialsScreen',
          {fromSocialLinks: true},
        );
    }

    setSocialItem(item);
  };

  return (
    <View className="px-[40px] py-[53px]">
      <HeaderStepCount
        step={step}
        onBackPress={() => {
          setStep(step === 0 ? 0 : step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <Text>PersonalInformation</Text>
      <View className="mt-9 mb-[30px]">
        <HeaderWithText
          heading="SOCIAL LINKS"
          subtitle="Please add your social links to display on digital card."
        />
      </View>
      <View className="max-h-[250px] overflow-y-scroll">
        <FlatList
          bounces
          bouncesZoom
          scrollEnabled
          data={socialItems}
          horizontal={false}
          className="max-h-[250px]"
          keyExtractor={item => item.id}
          contentContainerStyle={{gap: 10}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text
              className="text-dark-blue text-center text-lg"
              style={textStyles.robotoBold}>
              Please add at least one social link.
            </Text>
          )}
          renderItem={({item}) => (
            <SocialView
              {...item}
              onRemoveItem={id => {
                removeSocialItem(id);
                removeSocialLink(id);
              }}
            />
          )}
        />
      </View>
      <View className="w-full h-[1px] bg-accent rounded-sm my-[10px]" />
      <ScrollView>
        <FlatList
          data={SOCIALS}
          numColumns={5}
          horizontal={false}
          renderItem={({item}: {item: ISocial}) => {
            const exist = socialItems.find(i => i.id === item.id);
            const selected = exist !== null && exist !== undefined;

            return (
              <Pressable onPress={() => handleSelectSocialItem(item)}>
                <View
                  className={`${
                    selected ? 'border-[1px] border-accent' : 'bg-accent'
                  } w-14 h-14 rounded-full flex justify-center items-center`}>
                  {selected ? (
                    <View className="bg-accent p-[14px] w-5 h-5 flex items-center justify-center rounded-full">
                      <Image
                        resizeMode="contain"
                        className="w-[14px] h-[14px]"
                        source={item.image as ImageSourcePropType}
                        style={{tintColor: selected ? 'white' : 'white'}}
                      />
                    </View>
                  ) : (
                    <View className="bg-accent w-10 h-10 rounded-full flex justify-center items-center">
                      <Image
                        resizeMode="contain"
                        className="w-5 h-5"
                        source={item.image as ImageSourcePropType}
                        style={{tintColor: selected ? '#F1592A' : 'white'}}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            flexWrap: 'wrap',
            gap: 19,
          }}
          contentContainerStyle={{gap: 19}}
        />
        <Button
          text="Next"
          callback={handleNextClick}
          className="mt-[74px] w-full"
        />
      </ScrollView>
    </View>
  );
};

export default SocialLinksScreen;
