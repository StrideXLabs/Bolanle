import React, {useEffect, useState} from 'react';
import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IShareContactDetails} from '.';
import contactIcon from '../../assets/images/contacts.png';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {accentColor, percentToPx} from '../../constants';

type TextMessageProps = {
  company: string;
  fullName: string;
  onSave: (details: IShareContactDetails, code: string) => void;
};

const TextMessage = ({onSave, company, fullName}: TextMessageProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<IShareContactDetails>({
    contact: '',
    shareType: 'TEXT_CARD',
    comment: `Hi, This is ${fullName} from ${company}. Tap this link to get my business card.`,
  });
  const [data, setData] = useState<{flag: string; code: string}>({
    flag: '🇮🇳',
    code: '+91',
  });

  useEffect(() => {
    if (details.contact) return;
    setDetails(state => ({...state, contact: `(${data.code}) `}));
  }, []);

  return (
    <View>
      {open && (
        <CountryPicker
          lang="en"
          show={open}
          style={{
            modal: {height: 400},
            textInput: {color: '#334155'},
            dialCode: {color: '#334155', fontFamily: 'Roboto-Bold'},
            countryName: {color: '#334155', fontFamily: 'Roboto-Bold'},
          }}
          onRequestClose={() => setOpen(false)}
          onBackdropPress={() => setOpen(false)}
          pickerButtonOnPress={item => {
            setData({flag: item.flag, code: item.dial_code});
            setDetails(state => ({
              ...state,
              contact: `(${item.code}) `,
            }));
            setOpen(false);
          }}
        />
      )}
      <View
        className="relative"
        style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
        <TextField
          label="Contact number"
          value={details.contact}
          style={{paddingLeft: 75}}
          keyboardType="number-pad"
          placeholder="WhatsApp number"
          onChangeText={c => setDetails(state => ({...state, contact: c}))}
        />
        {data.flag && (
          <View
            className="absolute"
            style={{
              top: responsiveHeight(3.7),
              left: responsiveHeight(1.3),
            }}>
            <Pressable
              className="flex flex-row items-center gap-1 justify-center"
              onPress={() => setOpen(true)}>
              <View className="flex flex-row items-center gap-1 justify-center">
                <Text className="text-[24px]">{data.flag}</Text>
                <View className="top-[1.5px]">
                  <ChevronDownIcon size={20} color="black" />
                </View>
              </View>
            </Pressable>
          </View>
        )}
        <View
          className="absolute"
          style={{
            top: responsiveHeight(4.1),
            right: responsiveHeight(1.3),
          }}>
          <Image
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
        <Button text="Save" callback={() => onSave(details, data.code)} />
      </View>
    </View>
  );
};

export default TextMessage;
