import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';

import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import {accentColor} from '../../constants';
import textStyles from '../../constants/fonts';
import {
  ISocial,
  SocialItemsList,
  SocialLinkType,
  filledIconsMapping,
  unFilledIconsMapping,
} from '../../constants/socials';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {AuthStackParams} from '../../navigation/AuthNavigation';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams & AuthStackParams,
  'SocialLinksScreen'
>;

const SocialView = ({
  id,
  title,
  onRemoveItem,
}: ISocial & {onRemoveItem: (id: SocialLinkType) => void}) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-4">
        <Image
          resizeMode="center"
          className="w-10 h-10"
          source={filledIconsMapping[id] as ImageSourcePropType}
        />
        <Text
          style={textStyles.robotoMedium}
          className="text-dark-blue text-base">
          {title}
        </Text>
      </View>
      <Pressable
        onPress={() => onRemoveItem(id)}
        className="w-8 h-8 flex items-center justify-center">
        <TrashIcon size={15} color={accentColor} />
      </Pressable>
    </View>
  );
};

const SocialLinksScreen = ({navigation, route: {params}}: SocialLinksProps) => {
  const {step, setStep, socialItems, removeSocialLink, removeSocialItem} =
    useCreateBusinessCard();

  const handleSelectSocialItem = (item: ISocial) => {
    const exist = socialItems.find(i => i.id === item.id);
    if (exist) return;

    navigation.navigate(
      item.id === 'whatsapp' ? 'WhatsAppScreen' : 'OtherSocialsScreen',
      {social: item},
    );
  };

  const handleNextClick = () => {
    if (socialItems.length === 0)
      return Toast.error({primaryText: 'Please add at least one social link.'});

    navigation.navigate('RegisterScreen', {fromLoginScreen: false});
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
      <View className="w-full h-[1px] bg-accent rounded-sm my-[15px]" />
      <FlatList
        numColumns={5}
        horizontal={false}
        data={SocialItemsList}
        renderItem={({item}: {item: ISocial}) => {
          const exist = socialItems.find(i => i.id === item.id);
          const selected = exist !== null && exist !== undefined;

          return (
            <Pressable onPress={() => handleSelectSocialItem(item)}>
              {selected ? (
                <Image
                  resizeMode="cover"
                  className="w-[50px] h-[50px]"
                  source={unFilledIconsMapping[item.id] as ImageSourcePropType}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  className="w-[50px] h-[50px]"
                  source={filledIconsMapping[item.id] as ImageSourcePropType}
                />
              )}
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          gap: 25,
          flexWrap: 'wrap',
        }}
        contentContainerStyle={{gap: 19}}
      />
      <Button
        text="Next"
        callback={handleNextClick}
        className="mt-[74px] w-full"
      />
    </View>
  );
};

export default SocialLinksScreen;
