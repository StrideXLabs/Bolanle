import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import {percentToPx} from '../../../constants';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {ISocialLink} from '../../../hooks/useBusinessCard/interface';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams,
  'WhatsAppScreen'
>;

const WhatsAppScreen = ({navigation, route: {params}}: SocialLinksProps) => {
  const socialItem = params.social;
  const [open, setOpen] = useState<boolean>(false);
  const {setSocialLink, setSocialItem} = useCreateBusinessCard();

  const [social, setSocial] = useState<ISocialLink>({
    url: '',
    id: 'whatsapp',
    title: 'WhatsApp',
  });

  const [data, setData] = useState<{flag: string; code: string}>({
    flag: '🇮🇳',
    code: '+91',
  });

  const handleSave = () => {
    if (!social.url || !social.title)
      return Toast.error({primaryText: 'Please fill up all the fields.'});

    setSocialLink({
      id: social.id,
      url: social.url.trim(),
      title: social.title.trim(),
    });

    setSocialItem(socialItem);
    navigation.navigate('SocialLinksScreen');
  };

  useEffect(() => {
    if (social.url) return;

    setSocial({
      id: 'whatsapp',
      title: social.title,
      url: `(${data.code}) `,
    });
  }, []);

  return (
    <>
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
          setSocial({
            id: social.id,
            title: social.title,
            url: `(${data.code}) `,
          });
          setOpen(false);
        }}
      />
      <View
        className="h-screen bg-white"
        style={{
          paddingVertical: responsiveHeight(32 / percentToPx),
          paddingHorizontal: responsiveHeight(40 / percentToPx),
        }}>
        <HeaderStepCount
          showDotes={false}
          onBackPress={() => navigation.navigate('SocialLinksScreen')}
        />
        <View
          style={{
            marginTop: responsiveHeight(20 / percentToPx),
            marginBottom: responsiveHeight(22 / percentToPx),
          }}>
          <HeaderWithText
            heading="ADD WHATSAPP"
            subtitle="Please fill the following detail."
          />
        </View>
        <View
          className="relative"
          style={{marginBottom: responsiveHeight(10 / percentToPx)}}>
          <TextField
            label="WhatsApp"
            value={social.url}
            style={{paddingLeft: 75}}
            keyboardType="number-pad"
            placeholder="WhatsApp number"
            onChangeText={url => setSocial(state => ({...state, url}))}
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
        </View>
        <TextField
          label="Title"
          value={social.title}
          placeholder="Whatsapp"
          onChangeText={title => setSocial(state => ({...state, title}))}
        />
        <View style={{marginTop: responsiveHeight(52 / percentToPx)}}>
          <Button text="Save" callback={handleSave} />
        </View>
      </View>
    </>
  );
};

export default WhatsAppScreen;
