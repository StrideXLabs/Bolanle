import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HttpError} from 'http-errors';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {accentColor, percentToPx} from '../../constants';
import {SocialLinkType} from '../../constants/socials';
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
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

  const [open, setOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState(false);
  const [deletingSocial, setDeletingSocial] = useState(false);

  const {card, editable} = params;
  const {qr, socialLinks, personalInfo, contactDetails} = card;

  const handleEditProfileAndLogo = () => {
    setContactDetails({
      ...contactDetails,
      companyLogo: contactDetails.companyLogo,
      profilePicture: contactDetails.profileImage,
    });
    navigation.push('ContactDetailsScreen', {
      cardId: card._id,
      status: 'EDITING',
    });
  };

  const handleEditPersonalInformation = (info: ICardData['personalInfo']) => {
    setPersonalInformation(info);
    navigation.push('PersonalInformationScreen', {
      cardId: card._id,
      status: 'EDITING',
    });
  };

  const handleEditContactDetails = (info: ICardData['contactDetails']) => {
    setContactDetails({
      ...info,
      companyLogo: info.companyLogo,
      profilePicture: info.profileImage,
    });

    navigation.push('ContactDetailsScreen', {
      cardId: card._id,
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

    navigation.replace('SocialLinksScreen', {
      cardId: card._id,
      status: 'EDITING',
    });
  };

  const handleDeleteSocialMedia = async (social: ICard) => {
    try {
      const filteredCards = card.socialLinks.filter(
        item => item.platform !== social.platform,
      );
      setDeletingSocial(true);
      const response = await dashboardService.editCardDetails(card._id, {
        socialLinks: filteredCards,
      });

      setDeletingSocial(false);
      if (!response.success)
        return Toast.error({primaryText: response.message});

      Toast.success({primaryText: 'Information updated.'});
      navigation.setParams({editable: true, card: response.data!});
    } catch (error) {
      setDeletingSocial(false);
      Toast.error({primaryText: (error as HttpError).message});
    }
  };

  const handleDeleteCard = async () => {
    try {
      setDeletingCard(true);
      const response = await cardService.delete(card._id);

      setDeletingCard(false);

      if (response.success) {
        Toast.success({primaryText: 'Card deleted.'});
        return navigation.navigate('AppBottomNav');
      }

      Toast.error({primaryText: 'Error while deleting card'});
    } catch (error) {
      setDeletingCard(false);
      Toast.success({primaryText: 'Error while deleting card'});
    }
  };

  return (
    <Layout>
      <DashboardHeader
        options={{
          type: 'VIEW_OR_EDIT',
          onBackBtnPress: () =>
            editable ? navigation.replace('AppBottomNav') : navigation.goBack(),
          onShareBtnPress: () =>
            navigation.navigate('ShareCardScreen', {
              card,
              type: 'WITH_DATA',
              fullName: personalInfo.name,
              company: personalInfo.companyName,
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
          // paddingBottom: responsiveHeight(20 / percentToPx),
          paddingHorizontal: responsiveHeight(30 / percentToPx),
        }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{padding: responsiveHeight(20 / percentToPx)}}
          className="rounded-md border-[1px] border-[#E3E3E3]">
          <Header
            cardId={card._id}
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
            cardId={card._id}
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
      <View style={{height: responsiveHeight(2)}} />
    </Layout>
  );
};

export default EditCardScreen;
