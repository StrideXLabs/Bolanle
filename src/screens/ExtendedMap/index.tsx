import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, MarkerAnimated} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
//   import contactsService from '../../services/contacts.service';
import {BASE_URL} from '../../constants';
import {IContactDetails} from '../../hooks/useBusinessCard/interface';
import {AppStackParams} from '../../navigation/AppNavigation';
import cardService from '../../services/card.service';
import {ICardData} from '../../services/dashboard.service';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  cardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300,
    backgroundColor: '#E8F1F8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardSection: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  content: {
    flexGrow: 1,
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 20,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: '#484848',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#484848',
  },
});

export type ExtendedMapScreen = NativeStackScreenProps<
  AppStackParams,
  'ExtendedMapScreen'
>;

const ExtendedMap = () => {
  const route = useRoute<ExtendedMapScreen>();

  const {id} = route.params;

  const [contact, setContact] = useState<ICardData | null>(null);

  const getContact = async () => {
    try {
      const res = await cardService.getById(id);
      if (res.success && res.data) setContact(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) getContact();
  }, [id]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude:
            contact && contact.contactDetails?.lat
              ? Number.parseFloat(contact.contactDetails?.lat)
              : 37.78825,
          longitude:
            contact && contact.contactDetails?.lng
              ? Number.parseFloat(contact.contactDetails?.lng)
              : -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {contact && (
          <MarkerAnimated
            coordinate={{
              latitude: contact.contactDetails?.lat
                ? Number.parseFloat(contact.contactDetails?.lat)
                : 37.78825,
              longitude: contact.contactDetails?.lng
                ? Number.parseFloat(contact.contactDetails?.lng)
                : -122.4324,
            }}
            title={contact.personalInfo.name}
            // description={contact.personalInfo.address}
          >
            <Image
              source={{
                uri: `${BASE_URL}/${contact._id}/${
                  contact.contactDetails.profileImage
                }?time=${Date.now()}`,
                cache: 'reload',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                backgroundColor: 'red',
              }}
            />
          </MarkerAnimated>
        )}
      </MapView>
    </View>
  );
};

export default ExtendedMap;
