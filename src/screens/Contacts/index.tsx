import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import searchIcon from '../../assets/images/search.png';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useOpenModalState} from '../../hooks/useOpenModal';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {ICardData} from '../../services/dashboard.service';
import ContactCard from './ContactCard';
import ModalContent from './ModalContent';

const data = [
  {
    _id: '6499c21909c3108faef126da',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Nilotpal Deka',
      designation: 'Software Development Engineer II',
      department: 'IT Services and Consulting ',
      companyName: 'TechVariable',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'https://iamnilotpaldeka.com',
      companyAddress: 'Salmara, Bezera, Baihata Chariali, 781121',
      companyLogo: 'CL_6499c21909c3108faef126da.jpg',
      profileImage: 'PL_6499c21909c3108faef126da.jpg',
    },
    socialLinks: [
      {
        url: 'iamnilotpaldeka@gmail.com',
        title: 'Linkedin',
        platform: 'linkedin',
      },
      {
        url: 'iamNilotpal',
        title: 'Instagram',
        platform: 'instagram',
        _id: '6499c21909c3108faef126de',
      },
    ],
    qr: 'QR_6499c21909c3108faef126da.png',
  },
  {
    _id: '6499c8f209c3108faef126e6',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Bikash Kalita',
      designation: 'Software Development Engineer III',
      department: 'IT Services and Consulting',
      companyName: 'TechVariable',
    },
    contactDetails: {
      email: 'nilotpaldeka@techvariable.com',
      mobile: '8399049174',
      websiteUrl: 'https://bikashkalita.com',
      companyAddress: 'Chandmari, Guwahati',
      companyLogo: 'CL_6499c8f209c3108faef126e6.jpg',
      profileImage: 'PL_6499c8f209c3108faef126e6.jpg',
      _id: '6499c8f209c3108faef126e8',
    },
    socialLinks: [
      {
        url: 'Bikash Kalita',
        title: 'Linkedin',
        platform: 'linkedin',
      },
      {
        url: 'Bilash Kalita',
        title: 'Instagram',
        platform: 'instagram',
        _id: '6499c8f209c3108faef126ea',
      },
    ],
    qr: 'QR_6499c8f209c3108faef126e6.png',
  },
  {
    _id: '6499c9cf09c3108faef126f0',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Rishi Kumar ',
      designation: 'Software Development Engineer III',
      department: 'IT Services and Consulting ',
      companyName: 'TechVariable ',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'htrps://rishikuma.xom',
      companyAddress: 'Chandmari, Guwahati',
      companyLogo: 'CL_6499c9cf09c3108faef126f0.jpg',
      profileImage: 'PL_6499c9cf09c3108faef126f0.jpg',
      _id: '6499c9cf09c3108faef126f2',
    },
    socialLinks: [
      {
        url: 'Rishi',
        title: 'YouTube',
        platform: 'youtube',
      },
      {
        url: 'Rishi Pom',
        title: 'Snapchat',
        platform: 'snapchat',
        _id: '6499c9cf09c3108faef126f4',
      },
    ],
    qr: 'QR_6499c9cf09c3108faef126f0.png',
  },
  {
    _id: '6499ca7409c3108faef126f7',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Pom Pom',
      designation: 'Pom Pom ',
      department: 'Pom Pom Service ',
      companyName: 'TechVariable ',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'https://pompomservice.com',
      companyAddress: 'Pom Pom, 781121',
      companyLogo: 'CL_6499ca7409c3108faef126f7.jpg',
      profileImage: 'PL_6499ca7409c3108faef126f7.jpg',
      _id: '6499ca7409c3108faef126f9',
    },
    socialLinks: [
      {
        url: 'Pom Pom',
        title: 'Facebook',
        platform: 'facebook',
      },
      {
        url: 'Pom Pom',
        title: 'Discord',
        platform: 'discord',
        _id: '6499ca7409c3108faef126fb',
      },
    ],
    qr: 'QR_6499ca7409c3108faef126f7.png',
  },
  {
    _id: '6499cc4f09c3108faef1271a',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Loli Hentai',
      designation: 'Loli Hentai',
      department: 'Loli Hentai',
      companyName: 'Loli Hentai ',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'https://lolihentai.com',
      companyAddress: 'Loli Hentai, Guwahati',
      companyLogo: 'CL_6499cc4f09c3108faef1271a.jpg',
      profileImage: 'PL_6499cc4f09c3108faef1271a.jpg',
      _id: '6499cc4f09c3108faef1271c',
    },
    socialLinks: [
      {
        url: 'Loli Hentai',
        title: 'YouTube',
        platform: 'youtube',
      },
      {
        url: 'Loli Hentai',
        title: 'Twitch',
        platform: 'twitch',
        _id: '6499cc4f09c3108faef1271e',
      },
    ],
    qr: 'QR_6499cc4f09c3108faef1271a.png',
  },
  {
    _id: '649b0bbca5d93917d976a2f9',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Samudra Deka',
      designation: 'Head Of Engineering',
      department: 'IT Services and Consulting',
      companyName: 'TechVariable',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'https://samudradeka.com',
      companyAddress: 'Guwahati, Chandmari',
      companyLogo: '',
      profileImage: '',
      _id: '649b0bbca5d93917d976a2fb',
    },
    socialLinks: [
      {
        url: 'Samudra Deka',
        title: 'YouTube',
        platform: 'youtube',
      },
    ],
    qr: 'QR_649b0bbca5d93917d976a2f9.png',
  },
  {
    _id: '649b0dd8a5d93917d976a2ff',
    userId: '6499c21809c3108faef126d8',
    personalInfo: {
      name: 'Meow Meow',
      designation: 'Meow Meow',
      department: 'Meow Meow',
      companyName: 'Meow LTD.',
    },
    contactDetails: {
      email: 'iamnilotpaldeka@gmail.com',
      mobile: '8399049174',
      websiteUrl: 'meow.com',
      companyAddress: 'Meow Meow Meow',
      companyLogo: 'CL_649b0dd8a5d93917d976a2ff.jpg',
      profileImage: 'PL_649b0dd8a5d93917d976a2ff.jpg',
      _id: '649b0dd8a5d93917d976a301',
    },
    socialLinks: [
      {
        url: 'Meow Meow',
        title: 'Linkedin',
        platform: 'linkedin',
      },
    ],
    qr: 'QR_649b0dd8a5d93917d976a2ff.png',
  },
] as IContact[];

export type WelcomeScreenProps = NativeStackScreenProps<
  AppStackParams,
  'EditCardScreen'
>;

export interface IContact
  extends Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'> {}

const ContactsScreen = ({navigation}: WelcomeScreenProps) => {
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const {open, setOpen} = useOpenModalState();
  const [loading, setLoading] = useState(false);
  const selectedContactRef = useRef<IContact | null>(null);
  const [contacts, setContacts] = useState<IContact[]>(data);

  const filteredContacts = search.trim()
    ? contacts.filter(c =>
        c.personalInfo?.name
          ?.toLowerCase()
          ?.includes(search.trim().toLowerCase()),
      )
    : contacts;

  const fetchContactData = async () => {};

  const handleViewCard = () => {
    if (!selectedContactRef.current)
      return Toast.error({primaryText: 'Please select a card first.'});

    setOpen(false);
    navigation.navigate('EditCardScreen', {
      card: selectedContactRef.current!,
      editable: false,
    });
  };

  const handleShareCard = () => {};

  const handleClose = () => {
    selectedContactRef.current = null;
    setOpen(false);
  };

  useEffect(() => {
    selectedContactRef.current = null;
  }, []);

  return (
    <View
      className="bg-white"
      style={{
        height: '100%',
        paddingLeft: responsiveHeight(36 / percentToPx),
        paddingRight: responsiveHeight(40 / percentToPx),
        paddingVertical: responsiveHeight(20 / percentToPx),
      }}>
      <Text
        style={textStyles.bebasNeueBold}
        className="text-dark-blue text-4xl">
        Contacts
      </Text>
      <View style={{marginTop: responsiveHeight(46 / percentToPx)}}>
        <TextField
          label=""
          value={search}
          placeholder="Search contacts"
          className="border-dark-blue border-[2px]"
          style={{paddingLeft: responsiveHeight(5)}}
          onChangeText={text => setSearch(text)}
        />
        <Image
          className="absolute"
          resizeMode="contain"
          source={searchIcon as ImageSourcePropType}
          style={{
            top: responsiveHeight(12.7 / percentToPx),
            left: responsiveHeight(13 / percentToPx),
            width: responsiveWidth(30.46 / percentToPx),
            height: responsiveWidth(30.46 / percentToPx),
          }}
        />
      </View>
      {loading && (
        <View
          className="flex justify-center items-center"
          style={{height: responsiveHeight(60)}}>
          <ActivityIndicator size={50} color={accentColor} />
        </View>
      )}
      {!loading && contacts.length === 0 && error && (
        <View
          className="flex justify-center items-center"
          style={{height: responsiveHeight(70)}}>
          <Text
            className="text-dark-blue"
            style={[
              textStyles.robotoBold,
              {fontSize: responsiveFontSize(18 / percentToPx)},
            ]}>
            {error}
          </Text>
          <Button
            text="RETRY"
            callback={fetchContactData}
            style={{
              width: responsiveWidth(60),
              marginTop: responsiveHeight(12 / percentToPx),
            }}
          />
        </View>
      )}
      {!loading && !error && contacts.length > 0 && (
        <View
          style={{
            height: responsiveHeight(100),
            marginTop: responsiveHeight(34 / percentToPx),
          }}>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={filteredContacts}
            style={{width: '100%'}}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ContactCard
                contact={item}
                onPress={contact => {
                  setOpen(true);
                  selectedContactRef.current = contact;
                }}
              />
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(33),
              gap: responsiveHeight(10 / percentToPx),
            }}
          />
        </View>
      )}
      <Modal
        isVisible={open}
        swipeDirection="down"
        backdropOpacity={0.7}
        animationIn="slideInUp"
        animationInTiming={250}
        backdropColor="#33373D"
        animationOutTiming={1000}
        animationOut="slideOutDown"
        onSwipeComplete={handleClose}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}
        backdropTransitionInTiming={500}
        style={{margin: 0, paddingHorizontal: 15, justifyContent: 'flex-end'}}>
        <ModalContent
          onCancel={handleClose}
          onViewCard={handleViewCard}
          onShareCard={handleShareCard}
        />
      </Modal>
    </View>
  );
};

export default ContactsScreen;
