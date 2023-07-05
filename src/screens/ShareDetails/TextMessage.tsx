import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IShareContactDetails} from '.';
import Button from '../../components/Button';
import TextField from '../../components/TextField/TextFieldDark';
import {percentToPx} from '../../constants';

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
      <View
        className="relative"
        style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
        <TextField
          label="Contact number"
          value={details.contact}
          style={{paddingLeft: 75}}
          keyboardType="number-pad"
          placeholder="WhatsApp number"
          autoFocus={inputRef.current!}
          focusable={inputRef.current!}
          onChangeText={c =>
            setDetails(state => ({...state, contact: c}))
          }></TextField>
        {data.flag && (
          <View
            className="absolute"
            style={{
              bottom: 2,
              left: 5,
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
        {/* <View className="absolute" style={{bottom: 5, right: 5}}>
          <Image
            resizeMode="contain"
            className="h-[30px] w-[30px]"
            style={{tintColor: accentColor}}
            source={contactIcon as ImageSourcePropType}
          />
        </View> */}
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
        <Button text="Send" callback={() => onSave(details, data.code)} />
      </View>
    </View>
  );
};

export default TextMessage;
