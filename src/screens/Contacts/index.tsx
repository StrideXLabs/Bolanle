import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import searchIcon from '../../assets/images/search.png';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import TextField from '../../components/TextField/TextFieldDark';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useOpenModalState} from '../../hooks/useOpenModal';
import Toast from '../../lib/toast';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import contactsService from '../../services/contacts.service';
import {ICardData} from '../../services/dashboard.service';
import ContactCard from './ContactCard';
import ModalContent from './ModalContent';

export type ContactsScreenProps = NativeStackScreenProps<
  AppStackParams & BottomTabNavigatorParams,
  'ContactDetailsScreen'
>;

export interface IContact
  extends Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'> {}

const ContactsScreen = ({navigation}: ContactsScreenProps) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const {open, setOpen} = useOpenModalState();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const selectedContactRef = useRef<IContact | null>(null);

  const filteredContacts = search.trim()
    ? contacts.filter(c =>
        c.personalInfo?.name
          ?.toLowerCase()
          ?.includes(search.trim().toLowerCase()),
      )
    : contacts;

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const data = await contactsService.getAll();

      if (!data.success) {
        setLoading(false);
        setError(data.message);
      }

      setContacts(data.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message || 'Something went wrong. Please try again.'
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewCard = () => {
    if (!selectedContactRef.current)
      return Toast.error({primaryText: 'Please select a card first.'});

    setOpen(false);
    navigation.navigate('EditCardScreen', {
      card: selectedContactRef.current!,
      editable: false,
    });
  };

  const handleShareCard = () => {
    if (!selectedContactRef.current) return;

    setOpen(false);
    navigation.navigate('ShareCardScreen', {
      type: 'WITH_DATA',
      card: selectedContactRef.current,
      fullName: selectedContactRef.current?.personalInfo.name,
      company: selectedContactRef.current?.personalInfo.companyName,
    });
  };

  const handleClose = () => {
    selectedContactRef.current = null;
    setOpen(false);
  };

  const handleDeleteContact = async () => {
    try {
      if (!selectedContactRef.current) return;

      setDeleting(true);
      const response = await contactsService.delete(
        selectedContactRef.current?._id || '',
      );

      if (!response.success) {
        setDeleting(false);
        return Toast.error({primaryText: response.message});
      }

      Toast.success({primaryText: 'Contact deleted.'});
      selectedContactRef.current = null;
      setDeleting(false);
      setOpen(false);
      await fetchContactData();
    } catch (error) {
      setDeleting(false);
      Toast.error({primaryText: 'Error while deleting contact.'});
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchContactData();
    }
  }, [isFocused]);

  return (
    <Layout>
      <View
        style={{
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
        {!loading && !error && contacts.length == 0 && (
          <View
            className="flex justify-center items-center"
            style={{marginTop: responsiveHeight(5)}}>
            <Text
              className="text-dark-blue"
              style={[
                textStyles.robotoBold,
                {fontSize: responsiveFontSize(18 / percentToPx)},
              ]}>
              No contacts found.
            </Text>
          </View>
        )}
        {!loading && !error && search && filteredContacts.length == 0 && (
          <View
            className="flex justify-center items-center"
            style={{marginTop: responsiveHeight(5)}}>
            <Text
              className="text-dark-blue"
              style={[
                textStyles.robotoBold,
                {fontSize: responsiveFontSize(18 / percentToPx)},
              ]}>
              No contacts found.
            </Text>
          </View>
        )}
        {!loading && !error && filteredContacts.length > 0 && (
          <View
            style={{
              height: responsiveHeight(100),
              marginTop: responsiveHeight(34 / percentToPx),
            }}>
            <FlatList
              numColumns={1}
              refreshing={loading}
              onRefresh={fetchContactData}
              horizontal={false}
              data={filteredContacts}
              style={{width: '100%'}}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ContactCard
                  contact={item}
                  onPress={contact => {
                    selectedContactRef.current = contact;
                    setOpen(true);
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
          hasBackdrop
          isVisible={open}
          swipeDirection="down"
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationInTiming={250}
          animationOutTiming={500}
          backdropColor="#33373D"
          useNativeDriverForBackdrop
          animationOut="slideOutDown"
          onSwipeComplete={handleClose}
          onBackdropPress={handleClose}
          onBackButtonPress={handleClose}
          backdropTransitionInTiming={500}
          style={{
            margin: 0,
            paddingHorizontal: 15,
            justifyContent: 'flex-end',
          }}>
          <ModalContent
            deleting={deleting}
            onCancel={handleClose}
            onViewCard={handleViewCard}
            onShareCard={handleShareCard}
            onDeleteContact={handleDeleteContact}
          />
        </Modal>
      </View>
    </Layout>
  );
};

export default ContactsScreen;
