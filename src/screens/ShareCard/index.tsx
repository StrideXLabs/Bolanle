import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Share, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RNFetchBlob from 'rn-fetch-blob';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {BASE_URL, TokenKey, percentToPx} from '../../constants';
import {AppStackParams, ShareType} from '../../navigation/AppNavigation';
import ShareButton from './ShareButton';
import Clipboard from '@react-native-clipboard/clipboard';

import copyIcon from '../../assets/images/copy.png';
import emailIcon from '../../assets/images/email.png';
import galleryIcon from '../../assets/images/gallery.png';
import textIcon from '../../assets/images/message.png';
import shareIcon from '../../assets/images/share.png';
import whatsappIcon from '../../assets/images/whatsapp.png';
import {getDataFromAsyncStorage} from '../../lib/storage';
import Toast from '../../lib/toast';

export type ShareCardScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ShareCardScreen'
>;

const ShareCardScreen = ({navigation, route}: ShareCardScreenProps) => {
  const {type, company, fullName} = route.params;

  const card = type === 'WITH_DATA' ? route.params.card : null;
  const cardId = type === 'WITH_ID' ? route.params.cardId : null;

  const handleShareBtnPress = (shareType: ShareType) => {
    navigation.navigate('ShareCardDetailsScreen', {
      company,
      fullName,
      card: card!,
      shareType: shareType,
    });
  };

  const handleDownload = async () => {
    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
      }).fetch('GET', `${BASE_URL}/${card?._id}/${card!.qr}`, {
        'x-access-token': await getDataFromAsyncStorage(TokenKey),
      });
      await CameraRoll.save(res.data, {type: 'photo'});
      Toast.success({
        primaryText: 'Photo saved successfully.',
        position: 'bottom',
      });
    } catch (error) {
      Toast.error({primaryText: 'Error saving photo.'});
    }
  };

  return (
    <Layout>
      <DashboardHeader
        options={{
          type: 'SHARE_VIEW',
          heading: 'SHARE CARD',
          onBackBtnPress: () => navigation.goBack(),
          subheading: 'You can choose an option to share your card.',
        }}
      />
      <View
        style={{
          paddingVertical: responsiveHeight(17 / percentToPx),
          paddingHorizontal: responsiveHeight(30 / percentToPx),
        }}>
        <View
          style={{
            padding: responsiveHeight(20 / percentToPx),
            paddingBottom: responsiveHeight(25 / percentToPx),
          }}
          className="rounded-md border-[1px] border-[#E3E3E3]">
          <View className="flex justify-center items-center">
            <Image
              className="rounded-lg"
              source={{uri: `${BASE_URL}/${card?._id}/${card!.qr}`}}
              style={{width: responsiveWidth(38), height: responsiveHeight(15)}}
            />
          </View>
          <View style={{marginTop: responsiveHeight(50 / percentToPx)}}>
            <ShareButton
              text="Copy Link"
              onPress={() => {
                Clipboard.setString(`${BASE_URL}/${card?._id}/${card!.qr}`);
              }}
              startIcon={copyIcon}
              styles={{borderRadius: responsiveHeight(8 / percentToPx)}}
            />
            <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
              <ShareButton
                text="Text your card"
                startIcon={textIcon}
                onPress={() => handleShareBtnPress('TEXT_CARD')}
                styles={{
                  borderTopLeftRadius: responsiveHeight(8 / percentToPx),
                  borderTopRightRadius: responsiveHeight(8 / percentToPx),
                }}
              />
              <View className="h-[0.3px] bg-white" />
              <ShareButton
                startIcon={emailIcon}
                text="Email your card"
                onPress={() => handleShareBtnPress('EMAIL_CARD')}
              />
              <View className="h-[0.3px] bg-white" />
              <ShareButton
                startIcon={whatsappIcon}
                text="WhatsApp add your card"
                onPress={() => handleShareBtnPress('WHATSAPP_CARD')}
              />
              <View className="h-[0.3px] bg-white" />
              <ShareButton
                startIcon={galleryIcon}
                onPress={handleDownload}
                text="Save to Photos/Gallery"
              />
              <View className="h-[0.3px] bg-white" />
              <ShareButton
                onPress={() => {
                  Share.share({
                    url: '',
                    message: `Hi, This is ${fullName} from ${company}. Tap this link to get my business card.\n\n${BASE_URL}/card/${
                      card!._id
                    }`,
                  });
                }}
                startIcon={shareIcon}
                text="Share QR Code"
                iconStyles={{tintColor: 'white'}}
                styles={{
                  borderBottomLeftRadius: responsiveHeight(8 / percentToPx),
                  borderBottomRightRadius: responsiveHeight(8 / percentToPx),
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default ShareCardScreen;
