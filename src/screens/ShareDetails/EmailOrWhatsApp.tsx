import React, {useState} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IShareContactDetails} from '.';
import contactIcon from '../../assets/images/contacts.png';
import emailIcon from '../../assets/images/email-dark.png';
import whatsappIcon from '../../assets/images/whatsapp.png';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {accentColor, percentToPx} from '../../constants';
import {ShareType} from '../../navigation/AppNavigation';

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
      <View
        className="relative"
        style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
        <TextField
          value={details.contact}
          label={type === 'EMAIL_CARD' ? 'Contact email' : 'Contact number'}
          style={{paddingLeft: 45}}
          keyboardType="email-address"
          placeholder={
            type === 'EMAIL_CARD' ? 'johndoe@gmail.com' : '(203) 555-0123'
          }
          onChangeText={c => setDetails(state => ({...state, contact: c}))}
        />
        <View className="absolute" style={{top: 42, left: 12}}>
          <Image
            resizeMode="center"
            className="h-[22px] w-[22px]"
            {...(type === 'WHATSAPP_CARD' && {style: {tintColor: '#334155'}})}
            source={
              (type === 'EMAIL_CARD'
                ? emailIcon
                : whatsappIcon) as ImageSourcePropType
            }
          />
        </View>
        <View className="absolute" style={{top: 39, right: 12}}>
          <Image
            resizeMode="contain"
            className="h-[30px] w-[30px]"
            style={{tintColor: accentColor}}
            source={contactIcon as ImageSourcePropType}
          />
        </View>
      </View>
      <TextField
        multiline
        textAlignVertical="top"
        placeholder="Your message"
        label="Customize your message"
        style={{height: responsiveHeight(70 / percentToPx)}}
        value={details.comment || ''}
        onChangeText={comment =>
          setDetails(state => ({...state, comment: comment}))
        }
      />
      <View style={{marginTop: responsiveHeight(52 / percentToPx)}}>
        <Button text="Save" callback={() => onSave(details)} />
      </View>
    </>
  );
};

export default EmailOrWhatsAppCard;
