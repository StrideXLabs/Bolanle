import {View, Text} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import Layout from '../../components/Layout';

const GeoLocation = () => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
      }}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default GeoLocation;
