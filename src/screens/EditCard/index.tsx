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
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

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
    <View className="h-full bg-white">
      <DashboardHeader
        subheading="EDIT CARD"
        subtitle="You can edit your card info here."
        onBackBtnPress={() => navigation.goBack()}
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
    </View>
  );
};

export default EditCardScreen;
