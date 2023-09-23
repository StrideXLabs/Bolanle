'use strict';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import CustomMarker from './CustomMarker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {accentColor, percentToPx} from '../../constants';
import contactsService from '../../services/contacts.service';
import Toast from '../../lib/toast';
import ScannedCard from './ScannedCard';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [cardData, setCardData] = useState({});
  const [Tag, setTag] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [cardId, setCardId] = useState('');
  const navigation = useNavigation();

  const Verfiy = async e => {
    const id = e.split('/').pop();
    setCardId(id);
    try {
      setLoading(true);
      const data = await contactsService.checkContact(id);

      if (data.success) {
        Toast.success({primaryText: data.message});
        setCardData(data);
        setCanCreate(true);
        setLoading(false);
      }

      if (!data.success) {
        setLoading(false);
        Toast.error({primaryText: data.message});
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.error({primaryText: 'Something went wrong'});
    }
  };

  const handleScan = e => {
    setScanned(true);
    Verfiy(e.data);
  };

  const handlePress = () => {
    setScanned(false);
    setCanCreate(false);
  };

  const handleSend = async () => {
    try {
      setBtnLoading(true);

      const data = await contactsService.create(cardId, Tag);

      if (data.success) {
        Toast.success({primaryText: data.message});
        // setCardData(data);
        setCanCreate(true);
        setBtnLoading(false);
      }

      if (!data.success) {
        setLoading(false);
        Toast.error({primaryText: data.message});
      }

      setLoading(false);

      navigation.navigate('AppBottomNav', {screen: 'Contacts'});
    } catch (error) {
      setLoading(false);
      Toast.error({primaryText: 'Something went wrong'});
    }
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: responsiveHeight(40 / percentToPx),
          paddingHorizontal: responsiveHeight(14 / percentToPx),
        }}>
        <KeyboardAvoidingView>
          {!loading && canCreate && (
            <>
              <Text
                className="font-3 text-black text-center"
                style={{
                  fontSize: responsiveFontSize(3),
                }}>
                Scanned Card
              </Text>
              <ScannedCard cardData={cardData} Tag={Tag} setTag={setTag} />
            </>
          )}
          {!loading && scanned ? (
            <View
              className="w-full flex flex-row items-center justify-between"
              style={{
                marginTop: responsiveHeight(14 / percentToPx),
                marginBottom: responsiveHeight(80 / percentToPx),
                paddingHorizontal: responsiveWidth(14 / percentToPx),
              }}>
              <Button
                callback={handlePress}
                text="Re-scan"
                showBackgroundColor={false}
                style={{
                  width: responsiveWidth(42),
                }}
              />
              <Button
                callback={handleSend}
                text="Create contact"
                showBackgroundColor
                style={{
                  width: responsiveWidth(42),
                }}
                showLoading={btnLoading}
              />
            </View>
          ) : (
            <QRCodeScanner
              onRead={handleScan}
              cameraStyle={{
                height: responsiveScreenHeight(85),
              }}
              reactivate={true}
              reactivateTimeout={3000}
              showMarker={true}
              customMarker={<CustomMarker />}
            />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

export default QRScanner;
