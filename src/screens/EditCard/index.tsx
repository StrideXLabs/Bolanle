import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {BASE_URL, accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {SocialLinkType} from '../../constants/socials';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../hooks/useBusinessCard/constants';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import cardService, {ICard} from '../../services/card.service';
import dashboardService, {ICardData} from '../../services/dashboard.service';
import ContactDetails from './ContactDetails';
import DeleteCardModal from './DeleteModal';
import Header from './Header';
import PersonalInfo from './PersonalInfo';
import QR from './QR';
import SocialLinks from './SocialLinks';
import {BackIcon, PencilIcon} from '../../constants/icons';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {openPicker} from 'react-native-image-crop-picker';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {IContactDetails} from '../../hooks/useBusinessCard/interface';
import {getFileName} from '../../lib/getFileName';
import Video from 'react-native-video';
import LocationDetails from './LocationDetails';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams & BottomTabNavigatorParams,
  'EditCardScreen'
>;

const EditCardScreen = ({
  navigation,
  route: {params},
}: PersonalInformationProps) => {
  const {
    setSocialItems,
    setSocialLinks,
    setContactDetails,
    setPersonalInformation,
  } = useCreateBusinessCard();
  const {card, editable, cardId} = params;

  console.log(params);

  console.log(cardId);

  const [open, setOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState(false);
  const [deletingSocial, setDeletingSocial] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!card);
  const [
    {qr, socialLinks, personalInfo, contactDetails, _id, userId},
    setCardData,
  ] = useState<Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>>(
    card || {
      qr: '',
      _id: '',
      userId: '',
      socialLinks: [],
      contactDetails: initialContactDetails,
      personalInfo: initialPersonalInformation,
    },
  );

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const handleEditProfileAndLogo = () => {
    setContactDetails({
      ...contactDetails,
      companyLogo: contactDetails.companyLogo,
      profilePicture: contactDetails.profileImage,
    });
    navigation.navigate('ContactDetailsScreen', {
      cardId: _id,
      status: 'EDITING',
    });
  };

  const handleEditPersonalInformation = (info: ICardData['personalInfo']) => {
    setPersonalInformation(info);
    navigation.navigate('PersonalInformationScreen', {
      cardId: _id,
      status: 'EDITING',
    });
  };

  const handleEditContactDetails = (info: ICardData['contactDetails']) => {
    setContactDetails({
      ...info,
      companyLogo: info.companyLogo,
      profilePicture: info.profileImage,
    });

    navigation.navigate('ContactDetailsScreen', {
      cardId: _id,
      status: 'EDITING',
    });
  };

  const handleEditSocialLinks = (info: ICardData['socialLinks']) => {
    setSocialItems(
      info.map(item => ({
        title: item.title,
        id: item.platform as SocialLinkType,
      })),
    );

    setSocialLinks(
      info.map(item => ({
        url: item.url,
        title: item.title,
        id: item.platform as SocialLinkType,
      })),
    );

    navigation.navigate('SocialLinksScreen', {
      cardId: _id,
      status: 'EDITING',
    });
  };

  const handleDeleteSocialMedia = async (social: ICard) => {
    try {
      const filteredCards = socialLinks.filter(
        item => item.platform !== social.platform,
      );
      setDeletingSocial(true);
      const response = await dashboardService.editCardDetails(_id, {
        socialLinks: filteredCards,
      });

      setDeletingSocial(false);
      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Information updated.'});
      setCardData(response.data!);
    } catch (error) {
      setDeletingSocial(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  const handleDeleteCard = async () => {
    try {
      setDeletingCard(true);
      const response = await cardService.delete(_id);

      setDeletingCard(false);

      if (response.success) {
        Toast.success({primaryText: 'Card deleted.'});
        return navigation.navigate('DashboardScreen');
      }

      Toast.error({primaryText: 'Error while deleting card'});
    } catch (error) {
      setDeletingCard(false);
      Toast.success({primaryText: 'Error while deleting card'});
    }
  };

  const handleFetchCardData = async () => {
    try {
      if (!cardId)
        return Toast.error({primaryText: 'Please provide a card ID.'});

      setError('');
      setLoading(true);
      const response = await cardService.getById(cardId);

      if (!response.success) {
        setLoading(false);
        setError(response.message);
        return;
      }

      setCardData(
        response.data! || {
          qr: '',
          _id: '',
          userId: '',
          socialLinks: [],
          contactDetails: initialContactDetails,
          personalInfo: initialPersonalInformation,
        },
      );
    } catch (error) {
      setError('Error fetching card data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cardId) return;
    handleFetchCardData();
  }, []);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ['70%', '100%'], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePressBack = () => {
    navigation.goBack();
  };

  const uploadVideoHandler = async () => {
    setIsVideoLoading(true);
    setIsVideoLoaded(false);
    try {
      const result = await openPicker({
        maxFiles: 1,
        cropping: false,
        // mediaType: 'video',
        waitAnimationEnd: true,
        enableRotationGesture: true,
      });

      const formData = new FormData();

      const tempData = {
        email: contactDetails.email,
        mobile: contactDetails.mobile,
        websiteUrl: contactDetails.websiteUrl,
        companyAddress: contactDetails.companyAddress,
        lat: contactDetails.lat,
        lng: contactDetails.lng,
      } as IContactDetails;

      formData.append('contactDetails', JSON.stringify(tempData));

      if (result && typeof result !== 'string') {
        // if (result.mime === 'mp4')
        formData.append('coverVideo', {
          uri: result.path,
          type: result.mime,
          name: result.filename || getFileName(result.path),
        });
        // else
        //   formData.append('companyLogo', {
        //     uri: result.path,
        //     type: result.mime,
        //     name: result.filename || getFileName(result.path),
        //   });
      }

      const response = await dashboardService.editCardDetails(
        _id,
        {contactDetails: formData},
        true,
      );

      console.log('response', response);

      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Successfully Uploaded.'});
      setCardData(response.data!);
    } catch (error) {
      if ((error as any)?.code === 'E_PICKER_CANCELLED') return;
      Toast.error({primaryText: 'Error selecting image. Please try again.'});
    } finally {
      setIsVideoLoading(false);
    }
  };

  useEffect(() => {
    console.log(contactDetails, 'contactDetails');
  }, [contactDetails]);

  useEffect(() => {
    console.log(isVideoLoading, 'isVideoLoading');
  }, [isVideoLoading]);

  return (
    <Layout viewStyle={{paddingBottom: responsiveHeight(6)}}>
      {loading && (
        <View className="h-screen flex justify-center items-center">
          <ActivityIndicator size={40} color={accentColor} />
        </View>
      )}
      {!loading && error && (
        <View className="h-screen flex justify-center items-center">
          <Text className="text-black font-3 text-lg text-center">{error}</Text>
          <Button
            text="RETRY"
            className="mt-3"
            callback={handleFetchCardData}
            style={{width: responsiveWidth(60)}}
          />
        </View>
      )}
      {!loading && !error && (
        <>
          {/* <DashboardHeader
            options={{
              type: 'VIEW_OR_EDIT',
              onBackBtnPress: () =>
                editable
                  ? navigation.replace('AppBottomNav')
                  : navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.replace('AppBottomNav'),
              onShareBtnPress: () =>
                navigation.push('ShareCardScreen', {
                  type: 'WITH_DATA',
                  fullName: personalInfo.name,
                  company: personalInfo.companyName,
                  card: {
                    qr,
                    _id,
                    userId,
                    socialLinks,
                    personalInfo,
                    contactDetails,
                  },
                }),
              heading: editable ? 'EDIT CARD' : 'VIEW CARD',
              subheading: editable
                ? 'You can edit your card info here.'
                : 'Viewing card info here.',
            }}
          /> */}
          {deletingSocial && (
            <View className="absolute z-[1000000] h-screen w-screen bg-[#292c3366] justify-center items-center">
              <ActivityIndicator size={40} color={accentColor} />
            </View>
          )}
          <View className="flex-1">
            <View className="h-[40%] w-full ">
              {/* <Image
                resizeMode="cover"
                className="w-full h-full"
                source={{
                  uri:
                    BASE_URL +
                    `/${_id}/${contactDetails?.coverVideo}` +
                    `?time=${Date.now()}`,
                  cache: 'reload',
                }}
              /> */}
              {contactDetails?.coverVideo &&
              contactDetails?.coverVideo.toString().includes('.mp4') ? (
                <Video
                  source={{
                    uri:
                      BASE_URL +
                      `/${_id}/${
                        contactDetails?.coverVideo
                      }?time=${Date.now()}`,
                  }}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                  repeat={true}
                  muted={true}
                  controls={false}
                  onLoadStart={() => {
                    if (!isVideoLoaded) setIsVideoLoading(true);
                    setIsVideoLoaded(true);
                  }}
                  onLoad={() => setIsVideoLoading(false)}
                  onReadyForDisplay={() => setIsVideoLoading(false)}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  className="w-full h-full"
                  source={{
                    uri:
                      BASE_URL +
                      `/${_id}/${
                        contactDetails?.coverVideo ||
                        contactDetails?.companyLogo
                      }` +
                      `?time=${Date.now()}`,
                    cache: 'reload',
                  }}
                />
              )}

              <TouchableOpacity
                className="absolute top-4 right-4"
                onPress={uploadVideoHandler}>
                <Image
                  source={PencilIcon as any}
                  className={`h-[35px] w-[35px]`}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePressBack}
                className={'h-[35px] w-[35px] absolute top-4 left-4'}>
                <Image
                  source={BackIcon as ImageSourcePropType}
                  className={'h-[35px] w-[35px] '}
                />
              </TouchableOpacity>

              {isVideoLoading ? (
                <View
                  className="
                  absolute
                  top-0
                  left-0
                  right-0
                  bottom-0
                  flex
                  justify-center
                  items-center
                  bg-[#292c3366]
                  ">
                  <ActivityIndicator size={40} color={'#f4f4f4'} />
                </View>
              ) : null}
            </View>
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundStyle={{
                borderRadius: 40,
                borderWidth: 1,
                borderColor: '#e5e5e5',
              }}
              handleIndicatorStyle={{backgroundColor: 'blue'}}>
              <BottomSheetScrollView
                contentContainerStyle={{
                  paddingBottom: 10,
                }}>
                <Header
                  cardId={_id}
                  editable={editable}
                  personalInfo={personalInfo}
                  contactDetails={contactDetails}
                  onEditPress={handleEditProfileAndLogo}
                />
                <PersonalInfo
                  editable={editable}
                  personalInfo={personalInfo}
                  onEditPress={handleEditPersonalInformation}
                />
                <ContactDetails
                  editable={editable}
                  contactDetails={contactDetails}
                  onEditPress={handleEditContactDetails}
                />
                <LocationDetails
                  editable={editable}
                  personalInfo={personalInfo}
                  contactDetails={contactDetails}
                  onEditPress={handleEditPersonalInformation}
                  cardId={card._id as string}
                />
                <SocialLinks
                  editable={editable}
                  socialLinks={socialLinks}
                  onEditPress={handleEditSocialLinks}
                  onDeleteLink={handleDeleteSocialMedia}
                />
                <QR
                  qr={qr}
                  cardId={_id}
                  editable={editable}
                  onDeleteCard={() => setOpen(true)}
                />
                <DeleteCardModal
                  visible={open}
                  deleting={deletingCard}
                  onDelete={handleDeleteCard}
                  onClose={() => setOpen(false)}
                />
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </>
      )}
    </Layout>
  );
};

export default EditCardScreen;
