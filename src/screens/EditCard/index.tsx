import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, View} from 'react-native';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {IPersonalInformation} from '../../hooks/useBusinessCard/interface';
import {AppStackParams} from '../../navigation/AppNavigation';
import {ICardData} from '../../services/dashboard.service';
import ContactDetails from './ContactDetails';
import Header from './Header';
import PersonalInfo from './PersonalInfo';
import QR from './QR';
import SocialLinks from './SocialLinks';

export type PersonalInformationProps = NativeStackScreenProps<
  AppStackParams,
  'EditCardScreen'
>;

const EditCardScreen = ({
  navigation,
  route: {params},
}: PersonalInformationProps) => {
  const {
    card: {qr, socialLinks, personalInfo, contactDetails},
  } = params;

  const handleEditProfileAndLogo = (info: ICardData['contactDetails']) => {};

  const handleEditPersonalInformation = (info: IPersonalInformation) => {};

  const handleEditContactDetails = (info: ICardData['contactDetails']) => {};

  const handleEditSocialLinks = (info: ICardData['socialLinks']) => {};

  const handleDeleteCard = () => {};

  return (
    <>
      <DashboardHeader
        subheading="EDIT CARD"
        subtitle="You can edit your card info here."
        onBackBtnPress={() => navigation.goBack()}
      />
      <View className="flex p-10" style={{flex: 1}}>
        <ScrollView className="px-5 py-5 rounded-md border-[1px] border-[#E3E3E3]">
          <Header
            personalInfo={personalInfo}
            contactDetails={contactDetails}
            onEditPress={handleEditProfileAndLogo}
          />
          <PersonalInfo
            personalInfo={personalInfo}
            onEditPress={handleEditPersonalInformation}
          />
          <ContactDetails
            contactDetails={contactDetails}
            onEditPress={handleEditContactDetails}
          />
          <SocialLinks
            socialLinks={socialLinks}
            onEditPress={handleEditSocialLinks}
          />
          <QR qr={qr} onDeleteCard={handleDeleteCard} />
        </ScrollView>
      </View>
    </>
  );
};

export default EditCardScreen;
