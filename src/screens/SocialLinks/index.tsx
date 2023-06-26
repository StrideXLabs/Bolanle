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
import {accentColor, percentToPx} from '../../constants';
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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
      <View
        className="flex flex-row items-center"
        style={{gap: responsiveHeight(10 / percentToPx)}}>
        <Image
          resizeMode="contain"
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(70 / percentToPx),
          }}
          source={filledIconsMapping[id] as ImageSourcePropType}
        />
        <Text
          style={[
            textStyles.robotoMedium,
            {fontSize: responsiveFontSize(14 / percentToPx)},
          ]}
          className="text-dark-blue">
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
    <View
      style={{
        paddingVertical: responsiveHeight(32 / percentToPx),
        paddingHorizontal: responsiveHeight(40 / percentToPx),
      }}>
      <HeaderStepCount
        step={step}
        onBackPress={() => {
          setStep(step === 0 ? 0 : step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}
      />
      <View
        style={{
          marginTop: responsiveHeight(20 / percentToPx),
          marginBottom: responsiveHeight(22 / percentToPx),
        }}>
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
          style={{
            maxHeight: responsiveHeight(150 / percentToPx),
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={{gap: responsiveHeight(10 / percentToPx)}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text
              className="text-dark-blue text-center"
              style={[
                textStyles.robotoBold,
                {fontSize: responsiveScreenFontSize(14 / percentToPx)},
              ]}>
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
      <View
        className="w-full h-[1px] bg-accent rounded-sm"
        style={{marginVertical: responsiveHeight(10 / percentToPx)}}
      />
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
                  resizeMode="contain"
                  style={{
                    height: responsiveHeight(6),
                    width: responsiveWidth(85 / percentToPx),
                  }}
                  source={unFilledIconsMapping[item.id] as ImageSourcePropType}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={{
                    height: responsiveHeight(6),
                    width: responsiveWidth(85 / percentToPx),
                  }}
                  source={filledIconsMapping[item.id] as ImageSourcePropType}
                />
              )}
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          gap: responsiveHeight(15 / percentToPx),
          flexWrap: 'wrap',
        }}
        contentContainerStyle={{gap: 19}}
      />
      <View style={{marginTop: responsiveHeight(70 / percentToPx)}}>
        <Button text="Next" callback={handleNextClick} className="w-full" />
      </View>
    </View>
  );
};

export default SocialLinksScreen;
