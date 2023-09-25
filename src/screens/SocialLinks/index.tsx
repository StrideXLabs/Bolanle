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
import trash from '../../assets/images/trashBlue.png';
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
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../hooks/useBusinessCard/constants';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {AuthStackParams} from '../../navigation/AuthNavigation';
import cardService from '../../services/card.service';
import dashboardService from '../../services/dashboard.service';
import StaticContainerReg from '../../containers/StaticContainerReg';

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
          style={[{fontSize: responsiveFontSize(14 / percentToPx)}]}
          className="text-black font-0">
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
        lat: contactDetails.lat,
        lng: contactDetails.lng,
        coverVideo: null,
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
      <StaticContainerReg
        isBack
        isHeader
        title="Contact Details"
        onBackPress={() => {
          if (status === 'EDITING') {
            setSocialItems([]);
            setSocialLinks([]);
          }
          setStep(step === 0 ? 0 : step - 1);
          navigation.canGoBack() && navigation.goBack();
        }}>
        <View
          className="w-full"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginTop: responsiveHeight(20 / percentToPx),
                  marginBottom: responsiveHeight(25 / percentToPx),
                }}>
                <View className="w-full">
                  <Text className="text-lg font-3 text-black">
                    Step 3: Enter your social links
                  </Text>
                </View>
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
                  contentContainerStyle={{
                    gap: responsiveHeight(3 / percentToPx),
                  }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text
                      className="text-black text-center font-1"
                      style={[
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
                className="w-full h-[1px] bg-gray-300 rounded-sm"
                style={{
                  marginTop: responsiveHeight(10 / percentToPx),
                  marginBottom: responsiveHeight(20 / percentToPx),
                }}
              />
              <FlatList
                numColumns={6}
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
                            width: responsiveWidth(70 / percentToPx),
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
                            width: responsiveWidth(70 / percentToPx),
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
              <View style={{marginTop: responsiveHeight(40 / percentToPx)}}>
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
          <HeaderStepCount step={step} showDotes={status !== 'EDITING'} />
        </View>
      </StaticContainerReg>
    </Layout>
  );
};

export default SocialLinksScreen;
