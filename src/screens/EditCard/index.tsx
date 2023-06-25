import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, View} from 'react-native';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {AppStackParams} from '../../navigation/AppNavigation';
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
    card: {
      qr,
      _id,
      userId,
      updatedAt,
      createdAt,
      socialLinks,
      personalInfo,
      contactDetails,
    },
  } = params;

  const handleEditProfileAndLogo = () => {};

  return (
    <>
      <DashboardHeader
        subheading="EDIT CARD"
        subtitle="You can edit your card info here."
      />
      <View className="flex p-10" style={{flex: 1}}>
        <ScrollView className="px-5 py-5 rounded-md border-[1px] border-[#E3E3E3]">
          <Header
            contactDetails={contactDetails}
            personalInfo={personalInfo}
            onEditPress={() => {}}
          />
          <PersonalInfo onEditPress={() => {}} personalInfo={personalInfo} />
          <ContactDetails
            onEditPress={() => {}}
            contactDetails={contactDetails}
          />
          <SocialLinks onEditPress={() => {}} socialLinks={socialLinks} />
          <QR qr={qr} onDeleteCard={() => {}} />
        </ScrollView>
      </View>
    </>
  );
};

export default EditCardScreen;
