import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import trash from '../../assets/images/trash.png';
import Button from '../../components/Button';
import HeaderStepCount from '../../components/Header/HeaderStepCount';
import HeaderWithText from '../../components/Header/HeaderWithText';
import Layout from '../../components/Layout';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {
  ISocial,
  SocialItemsList,
  SocialLinkType,
  filledIconsMapping,
  unFilledIconsMapping,
} from '../../constants/socials';
import {useCreateBusinessCard} from '../../hooks/useAccount';
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../hooks/useAccount/constants';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {AuthStackParams} from '../../navigation/AuthNavigation';
import cardService from '../../services/card.service';
import dashboardService from '../../services/dashboard.service';

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
        style={{
          width: responsiveWidth(40 / percentToPx),
          height: responsiveHeight(40 / percentToPx),
        }}
        className="flex items-center justify-center rounded-sm">
        <Image
          style={{
            height: responsiveHeight(2),
            aspectRatio: 1,
            right: 0,
          }}
          resizeMode="contain"
          source={trash as ImageSourcePropType}
        />
      </Pressable>
    </View>
  );
};

const SocialLinksScreen = ({
  navigation,
  route: {
    params: {status, cardId},
  },
}: SocialLinksProps) => {
  const {
    step,
    setStep,
    socialItems,
    socialLinks,
    fromDashBoard,
    setSocialLinks,
    setSocialItems,
    contactDetails,
    removeSocialLink,
    setFromDashBoard,
    removeSocialItem,
    setContactDetails,
    personalInformation,
    setPersonalInformation,
  } = useCreateBusinessCard();
  const [updating, setUpdating] = useState(false);
  const [creatingBusinessCard, setCreatingBusinessCard] = useState(false);

  const handleSelectSocialItem = (item: ISocial) => {
    const exist = socialItems.find(i => i.id === item.id);
    if (exist) return;

    navigation.navigate(
      item.id === 'whatsapp' ? 'WhatsAppScreen' : 'OtherSocialsScreen',
      {social: item, cardId, status},
    );
  };

  const handleNextClick = () => {
    if (socialItems.length === 0)
      return Toast.error({primaryText: 'Please add at least one social link.'});

    setStep(step + 1);
    navigation.navigate('RegisterScreen');
  };

  const handleCreateNewCard = async () => {
    try {
      if (socialItems.length === 0)
        return Toast.error({
          primaryText: 'Please add at least one social link.',
        });

      setCreatingBusinessCard(true);
      const mappedSocialLinks = socialLinks.map(item => ({
        url: item.url,
        title: item.title,
        platform: item.id,
      }));

      const cDetails = {
        email: contactDetails.email,
        mobile: contactDetails.mobile,
        websiteUrl: contactDetails.websiteUrl,
        companyAddress: contactDetails.companyAddress,
      };

      const res = await cardService.create({
        personalInformation,
        contactDetails: cDetails,
        socialLinks: mappedSocialLinks,
        companyLogo: contactDetails.companyLogo as PickerImage,
        profileImage: contactDetails.profilePicture as PickerImage,
      });

      if (!res.success) Toast.error({primaryText: res.message});

      setStep(0);
      setSocialItems([]);
      setSocialLinks([]);
      setFromDashBoard(false);
      setContactDetails(initialContactDetails);
      setPersonalInformation(initialPersonalInformation);

      navigation.popToTop();
      navigation.replace('AppBottomNav');
      return;
    } catch (error) {
      Toast.error({
        primaryText: 'Something went wrong.',
        secondaryText: 'Please close and reopen the app.',
      });
    } finally {
      setCreatingBusinessCard(false);
    }
  };

  const handleUpdateDetails = async () => {
    try {
      if (socialItems.length === 0)
        return Toast.error({
          primaryText: 'Please add at least one social link.',
        });

      if (!cardId) return;

      setUpdating(true);
      const response = await dashboardService.editCardDetails(cardId, {
        socialLinks: socialLinks.map(item => ({...item, platform: item.id})),
      });

      setUpdating(false);
      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Information updated.'});
      setSocialItems([]);
      setSocialLinks([]);
      navigation.pop();
      navigation.replace('EditCardScreen', {
        editable: true,
        card: response.data!,
      });
    } catch (error) {
      setUpdating(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  useEffect(() => {
    const goBack = () => {
      status === 'EDITING' && setSocialItems([]);
      status === 'EDITING' && setSocialLinks([]);
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, []);

  return (
    <Layout>
      <View
        style={{
          paddingVertical: responsiveHeight(32 / percentToPx),
          paddingHorizontal: responsiveHeight(40 / percentToPx),
        }}>
        <ScrollView
          className="h-screen"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          <HeaderStepCount
            step={step}
            showDotes={status !== 'EDITING'}
            onBackPress={() => {
              if (status === 'EDITING') {
                setSocialItems([]);
                setSocialLinks([]);
              }
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
          <View className="overflow-y-scroll">
            <FlatList
              bounces
              bouncesZoom
              data={socialItems}
              horizontal={false}
              style={{
                maxHeight: responsiveHeight(140 / percentToPx),
              }}
              keyExtractor={item => item.id}
              contentContainerStyle={{gap: responsiveHeight(3 / percentToPx)}}
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
                      source={
                        unFilledIconsMapping[item.id] as ImageSourcePropType
                      }
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={{
                        height: responsiveHeight(6),
                        width: responsiveWidth(85 / percentToPx),
                      }}
                      source={
                        filledIconsMapping[item.id] as ImageSourcePropType
                      }
                    />
                  )}
                </Pressable>
              );
            }}
            keyExtractor={item => item.id}
            columnWrapperStyle={{
              flexWrap: 'wrap',
              gap: responsiveHeight(15 / percentToPx),
            }}
            contentContainerStyle={{gap: 19}}
          />
          <View style={{marginTop: responsiveHeight(70 / percentToPx)}}>
            <Button
              disabled={creatingBusinessCard || updating}
              showLoading={creatingBusinessCard || updating}
              callback={
                fromDashBoard
                  ? handleCreateNewCard
                  : status === 'EDITING'
                  ? handleUpdateDetails
                  : handleNextClick
              }
              text={
                fromDashBoard
                  ? 'Create Card'
                  : status === 'EDITING'
                  ? 'Save'
                  : 'Next'
              }
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default SocialLinksScreen;
