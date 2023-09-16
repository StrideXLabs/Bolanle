import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
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
import {SearchIcon} from '../../constants/icons';

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
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredContacts = contacts.filter(c => {
    const nameMatch =
      c.contact?.personalInfo?.name
        ?.toLowerCase()
        ?.includes(search.toLowerCase()) || search.trim() === '';

    const tagMatch =
      selectedTag.toLowerCase() === 'all' ||
      (c.tags &&
        c.tags.some(
          tag => tag.name.toLowerCase() === selectedTag.toLowerCase(),
        ));

    return nameMatch && tagMatch;
  });

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

      console.log('selectedContactRef.current', selectedContactRef.current);

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

  const tags = [
    'All',
    'Developer',
    'Designer',
    'Partnership',
    'Business',
    'Manager',
    'CEO',
    'Money',
    'Investor',
  ];

  console.log('contactsHEHE', contacts);

  return (
    <Layout>
      <View
        className="w-full"
        style={{
          paddingHorizontal: responsiveHeight(24 / percentToPx),
          paddingVertical: responsiveHeight(17 / percentToPx),
        }}>
        <View style={{marginTop: responsiveHeight(14 / percentToPx)}}>
          {!loading && !error && contacts.length > 0 && (
            <Text className="text-black text-3xl font-2 text-center">
              Contacts
            </Text>
          )}

          {!loading && !error && contacts.length > 0 && (
            <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
              <TextField
                placeholder="Search contact, tag ..."
                value={search}
                onChangeText={text => setSearch(text)}
                gradient={true}
                icon={
                  <Image
                    source={SearchIcon as any}
                    className={`h-5 w-5`}
                    style={{tintColor: '#8a8a8f'}}
                  />
                }
              />

              <ScrollView
                horizontal
                className="flex flex-row space-x-2 flex-wrap"
                contentContainerStyle={{
                  marginTop: responsiveHeight(14 / percentToPx),
                }}>
                {tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedTag(tag);
                      setSearch('');
                    }}
                    className={`rounded-full px-2 py-1
                    ${
                      selectedTag === tag
                        ? 'bg-accent'
                        : 'bg-gray-200 border border-gray-300'
                    }
                    `}>
                    <Text
                      className={`font-0 
                    ${
                      selectedTag === tag
                        ? 'text-white'
                        : 'text-gray-500 font-1'
                    }
                    `}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {loading && (
          <View
            className="flex justify-center items-center"
            style={{height: responsiveHeight(80)}}>
            <ActivityIndicator size={50} color={accentColor} />
          </View>
        )}
        {!loading && contacts.length === 0 && error && (
          <View
            className="flex justify-center items-center"
            style={{height: responsiveHeight(80)}}>
            <Text
              className="text-black font-2"
              style={[{fontSize: responsiveFontSize(18 / percentToPx)}]}>
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
            style={{height: responsiveHeight(80)}}>
            <Text
              className="text-black font-3"
              style={[{fontSize: responsiveFontSize(18 / percentToPx)}]}>
              No contacts found.
            </Text>
          </View>
        )}
        {!loading && !error && search && filteredContacts.length == 0 && (
          <View
            className="flex justify-center items-center"
            style={{marginTop: responsiveHeight(5)}}>
            <Text
              className="text-black font-3"
              style={[{fontSize: responsiveFontSize(18 / percentToPx)}]}>
              No contacts found.
            </Text>
          </View>
        )}
        {!loading && !error && filteredContacts.length > 0 && (
          <View
            style={{
              height: responsiveHeight(100),
              marginTop: responsiveHeight(24 / percentToPx),
            }}>
            <FlatList
              numColumns={1}
              horizontal={false}
              refreshing={loading}
              data={filteredContacts}
              style={{width: '100%'}}
              onRefresh={fetchContactData}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ContactCard
                  contact={item}
                  onPress={item => {
                    selectedContactRef.current = item;
                    setOpen(true);
                  }}
                  viewContact={item => {
                    selectedContactRef.current = item;
                    handleViewCard();
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
