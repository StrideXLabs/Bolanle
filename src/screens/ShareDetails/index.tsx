import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import { BASE_URL, emailRegex, percentToPx } from '../../constants';
import Toast from '../../lib/toast';
import { AppStackParams, ShareType } from '../../navigation/AppNavigation';
import EmailOrWhatsAppCard from './EmailOrWhatsApp';
import TextMessage from './TextMessage';

export type ShareCardScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ShareCardDetailsScreen'
>;

export interface IShareContactDetails {
  contact: string;
  comment?: string;
  shareType: ShareType;
}

const ShareCardDetailsScreen = ({ navigation, route }: ShareCardScreenProps) => {
  const { shareType, card, company, fullName } = route.params;

  const heading =
    shareType === 'EMAIL_CARD'
      ? 'Email your Card'
      : shareType === 'TEXT_CARD'
        ? 'Text your Card'
        : 'whatsapp your Card';

  const onTextMessage = async (details: IShareContactDetails, code: string) => {
    try {
      const contact = details.contact.split(' ')?.[1];
      if (!contact)
        return Toast.error({ primaryText: 'Provide a valid mobile number.' });

      const url = `sms:${code}${details.contact.split(' ')[1]}${Platform.OS === 'ios' ? '&' : '?'
        }body=${details.comment}\n\n${BASE_URL}/card/${card._id}`;

      const isSuccess = await Linking.openURL(url);
      if (isSuccess) {
        navigation.navigate('ShareCardScreen', {
          company,
          type: "WITH_DATA",
          card,
          fullName
        })
      }
      if (!isSuccess)
        Toast.error({ primaryText: 'Error sending whatsapp message.' });
    } catch (error) {
      Toast.error({ primaryText: 'Error sending whatsapp message.' });
    }
  };

  const onEmailCard = async (details: IShareContactDetails) => {
    if (!emailRegex.test(details.contact))
      return Toast.error({
        primaryText: 'Please provide a valid email address.',
      });

    try {
      const url = `mailto:${details.contact}?subject=Business Card Sharing&body=${details.comment}\n\n${BASE_URL}/card/${card._id}`;

      const isSuccess = await Linking.openURL(url);

      if (isSuccess) {
        navigation.navigate('ShareCardScreen', {
          company,
          type: "WITH_DATA",
          card,
          fullName
        })
      }

      if (!isSuccess)
        Toast.error({ primaryText: 'Error sending email.' });
    } catch (error) {
      Toast.error({ primaryText: 'Error sending email.' });
    }
  };

  const onWhatsappCard = async (details: IShareContactDetails) => {
    try {
      if (!details.contact)
        return Toast.error({
          primaryText: 'Please provide a valid mobile number.',
        });

      const url =
        'whatsapp://send?text=' +
        details.comment +
        `\n\n${BASE_URL}/card/${card._id}` +
        '&phone=' +
        details.contact;

      const isSuccess = await Linking.openURL(url);

      if (isSuccess) {
        navigation.navigate('ShareCardScreen', {
          company,
          type: "WITH_DATA",
          card,
          fullName
        })
      }

      if (!isSuccess)
        Toast.error({ primaryText: 'Error sending whatsapp message.' });
    } catch (error) {
      Toast.error({ primaryText: 'Error sending whatsapp message.' });
    }
  };

  return (
    <Layout>
      <DashboardHeader
        options={{
          heading,
          type: 'SHARE_VIEW',
          onBackBtnPress: () => navigation.goBack(),
          subheading: 'Please add contact details to proceed',
        }}
      />
      <View
        style={{
          paddingVertical: responsiveHeight(17 / percentToPx),
          paddingHorizontal: responsiveHeight(30 / percentToPx),
        }}>
        {shareType === 'TEXT_CARD' && (
          <TextMessage
            company={company}
            fullName={fullName}
            onSave={onTextMessage}
          />
        )}
        {(shareType === 'EMAIL_CARD' || shareType === 'WHATSAPP_CARD') && (
          <EmailOrWhatsAppCard
            type={shareType}
            company={company}
            fullName={fullName}
            onSave={shareType === 'EMAIL_CARD' ? onEmailCard : onWhatsappCard}
          />
        )}
      </View>
    </Layout>
  );
};

export default ShareCardDetailsScreen;
