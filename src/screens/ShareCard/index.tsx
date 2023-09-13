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
import StaticContainerReg from '../../containers/StaticContainerReg';

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
      {/* <DashboardHeader
        options={{
          type: 'SHARE_VIEW',
          heading: 'SHARE CARD',
          onBackBtnPress: () => navigation.pop(),
          subheading: 'You can choose an option to share your card.',
        }}
      /> */}
      <StaticContainerReg
        isBack
        isHeader
        title=""
        onBackPress={() => navigation.pop()}>
        <View
          style={{
            paddingHorizontal: responsiveHeight(20 / percentToPx),
            paddingVertical: responsiveHeight(8 / percentToPx),
          }}
          className="w-full">
          <View className="bg-secondary-blue p-4 rounded-2xl">
            <View className="flex justify-center items-center">
              <Image
                className="rounded-lg"
                resizeMode="contain"
                source={{uri: `${BASE_URL}/${card?._id}/${card!.qr}`}}
                style={{
                  width: responsiveWidth(34),
                  aspectRatio: 1,
                }}
              />
            </View>
            <View style={{marginTop: responsiveHeight(30 / percentToPx)}}>
              <ShareButton
                text="Copy Link"
                onPress={() => {
                  Clipboard.setString(`${BASE_URL}/card/${card!._id}`);
                  Toast.success({
                    primaryText: 'Copied Link.',
                    position: 'bottom',
                  });
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
                <View className="h-[0.3px] bg-white mt-[0.5px]" />
                <ShareButton
                  startIcon={emailIcon}
                  text="Email your card"
                  onPress={() => handleShareBtnPress('EMAIL_CARD')}
                />
                <View className="h-[0.3px] bg-white mt-[0.5px]" />
                <ShareButton
                  startIcon={whatsappIcon}
                  text="WhatsApp your card"
                  onPress={() => handleShareBtnPress('WHATSAPP_CARD')}
                />
                <View className="h-[0.3px] bg-white mt-[0.5px]" />
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
      </StaticContainerReg>
    </Layout>
  );
};

export default ShareCardScreen;
