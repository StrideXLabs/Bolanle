import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import textStyles from '../../../constants/fonts';
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
  const {setSocialLink, setSocialItem} = useCreateBusinessCard();
  const [open, setOpen] = useState<boolean>(false);

  const [social, setSocial] = useState<ISocialLink>({
    url: '',
    title: '',
    id: socialItem.id || 'whatsapp',
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

    setSocialLink({
      id: 'whatsapp',
      title: social.title,
      url: `(${data.code}) `,
    });
  }, []);

  return (
    <ScrollView nestedScrollEnabled>
      <SafeAreaView>
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
        <View className="px-[40px] py-[53px]">
          <HeaderStepCount
            showDotes={false}
            onBackPress={() => navigation.navigate('SocialLinksScreen')}
          />
          <Text>PersonalInformation</Text>
          <View className="mt-9 mb-[30px]">
            <HeaderWithText
              heading="ADD WHATSAPP"
              subtitle="Please fill the following detail."
            />
          </View>
          <View className="flex gap-2">
            <View className="flex gap-1">
              <Text
                style={textStyles.robotoMedium}
                className="text-base font-bold text-dark-blue">
                WhatsApp
              </Text>
              <TextField
                value={social.url}
                keyboardType="number-pad"
                className="relative pl-20"
                placeholder="WhatsApp number"
                onChangeText={url => setSocial(state => ({...state, url}))}
              />
              {data.flag && (
                <View className="absolute top-8 left-3">
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
            <View className="flex gap-1">
              <Text
                style={textStyles.robotoMedium}
                className="text-base font-bold text-dark-blue">
                Title
              </Text>
              <TextField
                value={social.title}
                placeholder="Whatsapp"
                onChangeText={title => setSocial(state => ({...state, title}))}
              />
            </View>
          </View>
          <Button
            text="Next"
            callback={handleSave}
            className="mt-[74px] w-full"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WhatsAppScreen;
