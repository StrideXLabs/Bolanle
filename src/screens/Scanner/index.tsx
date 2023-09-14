'use strict';
import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import CustomMarker from './CustomMarker';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {accentColor} from '../../constants';

const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState(null);

  const Verfiy = () => {
    console.log('tryinggggg');
  };

  const handleScan = e => {
    setScanned(true);
    console.log(e.data);
  };

  const handlePress = () => {
    setScanned(false);
    setResult(null);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.body}>
          <Text style={styles.heading}>{result}</Text>
          <TouchableOpacity onPress={handlePress} style={styles.btn}>
            <Text style={styles.btnText}>Re-scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <QRCodeScanner
          onRead={handleScan}
          cameraStyle={styles.cameraContainer}
          reactivate={true}
          reactivateTimeout={3000}
          showMarker={true}
          customMarker={<CustomMarker />}
        />
      )}
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    height: responsiveScreenHeight(85),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  btn: {
    // width: dimensions.Width * 0.6,
    // height: dimensions.Height * 0.05,
    width: responsiveWidth(60),
    height: responsiveScreenHeight(5),
    backgroundColor: accentColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
});
