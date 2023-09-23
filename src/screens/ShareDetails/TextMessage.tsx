import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IShareContactDetails} from '.';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {percentToPx} from '../../constants';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';

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
    flag: '🇺🇸',
    code: '+1',
  });
  const inputRef = useRef<boolean | null>(true);

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
              contact: `(${item.dial_code}) `,
            }));
            setOpen(false);
          }}
        />
      )}
      <View className="relative">
        <Text
          className="font-2 text-2xl text-black text-center"
          style={{marginVertical: responsiveHeight(10 / percentToPx)}}>
          Text your card
        </Text>
        <TextField
          label="Contact number"
          value={details.contact}
          style={{
            paddingLeft: 75,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 0,
          }}
          keyboardType="number-pad"
          placeholder="WhatsApp number"
          autoFocus={inputRef.current!}
          focusable={inputRef.current!}
          onChangeText={c => setDetails(state => ({...state, contact: c}))}
        />
        {data.flag && (
          <View
            className="absolute"
            style={{
              left: 8,
              bottom: 3,
              height: responsiveHeight(5.5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              className="flex flex-row items-center gap-1 justify-center"
              onPress={() => setOpen(true)}>
              <View className="flex flex-row items-center gap-1 justify-center">
                <Text
                  className="text-[24px]"
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  {data.flag}
                </Text>
                <View className="top-[1.5px]">
                  <ChevronDownIcon size={20} color="black" />
                </View>
              </View>
            </Pressable>
          </View>
        )}
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
        <Button text="Send" callback={() => onSave(details, data.code)} />
      </View>
    </View>
  );
};

export default TextMessage;
