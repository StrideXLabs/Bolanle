import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {percentToPx} from '../../constants';
import {IPersonalInformation} from '../../hooks/useBusinessCard/interface';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import cardService from '../../services/card.service';
import {ICardData} from '../../services/dashboard.service';
import ContactDetails from './ContactDetails';
import DeleteCardModal from './DeleteModal';
import Header from './Header';
import PersonalInfo from './PersonalInfo';
import QR from './QR';
import SocialLinks from './SocialLinks';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams & BottomTabNavigatorParams,
  'EditCardScreen'
>;

const EditCardScreen = ({
  navigation,
  route: {params},
}: PersonalInformationProps) => {
  const [open, setOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState(false);

  const {card, editable} = params;
  const {qr, socialLinks, personalInfo, contactDetails} = card;

  const handleEditProfileAndLogo = (info: ICardData['contactDetails']) => {};

  const handleEditPersonalInformation = (info: IPersonalInformation) => {};

  const handleEditContactDetails = (info: ICardData['contactDetails']) => {};

  const handleEditSocialLinks = (info: ICardData['socialLinks']) => {};

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
      <View
        style={{
          flex: 1,
          marginTop: responsiveHeight(25 / percentToPx),
          paddingBottom: responsiveHeight(17 / percentToPx),
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
    </Layout>
  );
};

export default EditCardScreen;
