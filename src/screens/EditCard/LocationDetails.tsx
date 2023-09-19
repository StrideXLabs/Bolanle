import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

import {BASE_URL, percentToPx} from '../../constants';
import {ICardData} from '../../services/dashboard.service';

import TextField from '../../components/TextField/TextFieldDark';

import MapView, {MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';

type Props = {
  editable: boolean;
  personalInfo: ICardData['personalInfo'];
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['personalInfo']) => void;
  cardId: string;
};

const LocationDetails = ({
  personalInfo,
  contactDetails,
  onEditPress,
  editable,
  cardId,
}: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <Text className="font-2 text-black text-2xl">Location Details</Text>

      <View
        className="bg-secondary-blue p-4 rounded-2xl"
        style={{
          marginTop: responsiveHeight(14 / percentToPx),
        }}>
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="City"
          editable={false}
        />
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="Address"
          editable={false}
        />
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="Country"
          editable={false}
        />

        {/* <Image
          resizeMode="contain"
          className={'h-44 w-full mb-8'}
          source={{
            uri: 'https://geology.com/world/the-united-states-of-america-map.gif',
          }}
        /> */}

        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude:
                contactDetails && contactDetails?.lat
                  ? Number.parseFloat(contactDetails?.lat)
                  : 37.78825,
              longitude:
                contactDetails && contactDetails?.lng
                  ? Number.parseFloat(contactDetails?.lng)
                  : -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <MarkerAnimated
              coordinate={{
                latitude:
                  contactDetails && contactDetails?.lat
                    ? Number.parseFloat(contactDetails?.lat)
                    : 37.78825,
                longitude:
                  contactDetails && contactDetails?.lng
                    ? Number.parseFloat(contactDetails?.lng)
                    : -122.4324,
              }}
              title={personalInfo.name}
              // description={contact.personalInfo.address}
            >
              <Image
                source={{
                  uri: `${BASE_URL}/${cardId}/${
                    contactDetails.profileImage
                  }?time=${Date.now()}`,
                  cache: 'reload',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: 'grey',
                }}
              />
            </MarkerAnimated>
          </MapView>
        </View>

        {/* <View className="px-2">
          {editable && <Button text="Edit Details" callback={() => {}} />}
        </View> */}
      </View>
    </View>
  );
};

export default LocationDetails;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
});
