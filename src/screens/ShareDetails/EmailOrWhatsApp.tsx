import React, {useState} from 'react';
import {Image, ImageSourcePropType, View, Text} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IShareContactDetails} from '.';
import contactIcon from '../../assets/images/contacts.png';
import emailIcon from '../../assets/images/email-dark.png';
import whatsappIcon from '../../assets/images/whatsapp.png';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {accentColor, percentToPx} from '../../constants';
import {ShareType} from '../../navigation/AppNavigation';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';

type TextMessageProps = {
  type: ShareType;
  company: string;
  fullName: string;
  onSave: (details: IShareContactDetails) => void;
};

const EmailOrWhatsAppCard = ({
  type,
  onSave,
  company,
  fullName,
}: TextMessageProps) => {
  const [details, setDetails] = useState<IShareContactDetails>({
    contact: '',
    shareType: type,
    comment: `Hi, This is ${fullName} from ${company}. Tap this link to get my business card.`,
  });

  return (
    <>
      <View className="relative">
        <TextField
          value={details.contact}
          label={type === 'EMAIL_CARD' ? 'Contact email' : 'Whatsapp number'}
          style={{
            paddingLeft: 50,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder={
            type === 'EMAIL_CARD' ? 'Email address' : '(203) 555-0123'
          }
          onChangeText={c => setDetails(state => ({...state, contact: c}))}
        />
        <View
          className="absolute"
          style={{
            left: 12,
            bottom: 3,
            height: responsiveHeight(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            className="h-[22px] w-[22px]"
            {...(type === 'WHATSAPP_CARD' && {style: {tintColor: '#1C75BC'}})}
            source={
              (type === 'EMAIL_CARD'
                ? emailIcon
                : whatsappIcon) as ImageSourcePropType
            }
          />
        </View>
      </View>
      <View style={{marginTop: responsiveHeight(14 / percentToPx)}}>
        <Text
          className="font-1 text-black"
          style={{
            fontSize: responsiveHeight(14 / percentToPx),
          }}>
          Customize your message
        </Text>
        <GenericTextField
          multiline
          textAlignVertical="top"
          placeholder="Your message"
          style={{height: responsiveHeight(70 / percentToPx)}}
          value={details.comment || ''}
          onChangeText={comment =>
            setDetails(state => ({...state, comment: comment}))
          }
        />
      </View>
      <View style={{marginTop: responsiveHeight(20 / percentToPx)}}>
        <Button text="Send" callback={() => onSave(details)} />
      </View>
    </>
  );
};

export default EmailOrWhatsAppCard;
