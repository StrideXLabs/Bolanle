import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {accentColor, percentToPx} from '../../constants';
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

  const [open, setOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState(false);
  const [deletingSocial, setDeletingSocial] = useState(false);

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

  return (
    <Layout viewStyle={{paddingBottom: responsiveHeight(6)}}>
      {loading && (
        <View className="h-screen flex justify-center items-center">
          <ActivityIndicator size={40} color={accentColor} />
        </View>
      )}
      {!loading && error && (
        <View className="h-screen flex justify-center items-center">
          <Text
            className="text-dark-blue text-lg text-center"
            style={textStyles.robotoBold}>
            {error}
          </Text>
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
          <DashboardHeader
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
          />
          {deletingSocial && (
            <View className="absolute z-[1000000] h-screen w-screen bg-[#292c3366] justify-center items-center">
              <ActivityIndicator size={40} color={accentColor} />
            </View>
          )}
          <View
            style={{
              flex: 1,
              marginTop: responsiveHeight(25 / percentToPx),
              paddingHorizontal: responsiveHeight(30 / percentToPx),
            }}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{padding: responsiveHeight(20 / percentToPx)}}
              className="rounded-md border-[1px] border-[#E3E3E3]">
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
            </ScrollView>
          </View>
        </>
      )}
    </Layout>
  );
};

export default EditCardScreen;
