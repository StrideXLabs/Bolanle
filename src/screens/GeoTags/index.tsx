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
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, MarkerAnimated} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import contactsService from '../../services/contacts.service';
import {BASE_URL, accentColor} from '../../constants';

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
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#484848',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#484848',
    flexWrap: 'wrap',
    width: 180,
  },
});

export default () => {
  const [toggle] = useState<boolean>(true);
  const [contacts, setContacts] = useState<any>([]);
  const [activeId, setActiveId] = useState<number>(0); // Initialize with the default active ID
  const flatListRef = useRef<FlatList | null>(null);
  const [focusedContact, setFocusedContact] = useState<any>(null);

  const pan = React.useRef(new Animated.ValueXY()).current;
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const scrollToCard = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  const getContacts = async () => {
    try {
      const res = (await contactsService.getAll()) as any;

      setContacts(res.data ? res.data : []);
      setFocusedContact(res.data ? res.data[0].contact : null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (contacts && contacts.length > 0)
      setFocusedContact(contacts[activeId].contact);
    scrollToCard(activeId);
  }, [activeId, contacts]);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isActive = activeId === index;
    // console.log(
    //   `${BASE_URL}/${'64f4e13477fb8d886044308c'}/${'PL_64f4e13477fb8d886044308c.jpg'}?time=${Date.now()}`,
    // );
    return (
      <Animated.View
        style={{
          transform: [
            {
              scale: pan.x.interpolate({
                inputRange: [
                  (index - 1) * boxWidth - halfBoxDistance,
                  index * boxWidth - halfBoxDistance,
                  (index + 1) * boxWidth - halfBoxDistance,
                ],
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <View
          style={{
            ...styles.card,
            width: boxWidth,
            borderColor: isActive ? accentColor : 'transparent', // Add a border color for the active card
          }}>
          <Image
            source={{
              uri: `${BASE_URL}/${item.contact._id}/${
                item.contact.contactDetails.profileImage
              }?time=${Date.now()}`,
              cache: 'reload',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'gray',
            }}
            resizeMode="contain"
          />

          <View>
            <Text style={styles.name}>{item.contact.personalInfo.name}</Text>
            <Text style={styles.location}>
              {item.contact.contactDetails.companyAddress || '-'}
            </Text>
            <Text>{item.contact.createdAt.split('T')[0] || '-'}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.cardContainer,
          display: toggle ? 'flex' : 'none',
        }}>
        <Text style={styles.title}>Location</Text>
        <FlatList
          horizontal
          data={contacts}
          style={{height: 250}}
          contentContainerStyle={{paddingVertical: 16}}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToInterval={boxWidth}
          contentInset={{
            left: halfBoxDistance,
            right: halfBoxDistance,
          }}
          contentOffset={{x: halfBoxDistance * -1, y: 0}}
          onLayout={e => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: pan.x}}}],
            {
              useNativeDriver: false,
              listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const newIndex = Math.round(
                  (event.nativeEvent.contentOffset.x + halfBoxDistance) /
                    boxWidth,
                );
                if (newIndex !== activeId) {
                  setActiveId(newIndex);
                }
              },
            },
          )}
          keyExtractor={(item, index) => `${index}-${item._id}`}
          renderItem={renderItem}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude:
            focusedContact && focusedContact.contactDetails?.lat
              ? Number.parseFloat(focusedContact.contactDetails?.lat)
              : 37.78825,
          longitude:
            focusedContact && focusedContact.contactDetails?.lng
              ? Number.parseFloat(focusedContact.contactDetails?.lng)
              : -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {contacts &&
          contacts.map((contact: any) => {
            return (
              <MarkerAnimated
                key={contact._id}
                coordinate={{
                  latitude:
                    contact && contact.contact.contactDetails?.lat
                      ? Number.parseFloat(contact.contact.contactDetails?.lat)
                      : 37.78825,
                  longitude:
                    contact && contact.contact.contactDetails?.lng
                      ? Number.parseFloat(contact.contact.contactDetails?.lng)
                      : -122.4324,
                }}
                title={contact.contact.personalInfo.name}
                // description={contact.personalInfo.address}
              >
                <Image
                  source={{
                    uri: `${BASE_URL}/${contact.contact._id}/${
                      contact.contact.contactDetails.profileImage
                    }?time=${Date.now()}`,
                    cache: 'reload',
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    backgroundColor: 'gray',
                  }}
                />
              </MarkerAnimated>
            );
          })}
      </MapView>
    </View>
  );
};
