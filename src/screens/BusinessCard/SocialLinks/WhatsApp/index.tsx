import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ChevronDownIcon} from 'react-native-heroicons/outline';

import Button from '../../../../components/Button';
import HeaderStepCount from '../../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../../components/Header/HeaderWithText';
import TextField from '../../../../components/TextField/TextFieldDark';
import textStyles from '../../../../constants/fonts';
import {useCreateBusinessCard} from '../../../../hooks/useBusinessCard';
import Toast from '../../../../lib/toast';
import {AppStackParams} from '../../../../navigation/AppNavigation';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams,
  'WhatsAppScreen'
>;

const WhatsAppScreen = ({navigation, route: {params}}: SocialLinksProps) => {
  const fromSocialLinks = params?.fromSocialLinks ?? false;
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<{flag: string; code: string}>({
    code: '+91',
    flag: '🇮🇳',
  });

  const {
    step,
    setStep,
    socialItems,
    socialLinks,
    setSocialLink,
    currentSocialStep,
    setCurrentSocialStep,
  } = useCreateBusinessCard();

  const firstItem = socialItems[0];
  const socialItem = useMemo(
    () => socialItems[currentSocialStep],
    [currentSocialStep],
  );

  const socialLink = socialLinks.find(item => item.id === socialItem.id) || {
    id: socialItem.id,
    title: '',
    url: '',
  };

  const handleBackPress = () => {
    setCurrentSocialStep(currentSocialStep - 1);
    if (firstItem.id === 'whatsapp') {
      navigation.navigate('SocialLinksScreen', {toSocialLinks: true});
    } else navigation.replace('OtherSocialsScreen');
  };

  const handleSave = () => {
    if (fromSocialLinks) {
      navigation.navigate('SocialLinksScreen', {toSocialLinks: false});
      return;
    }

    if (currentSocialStep === socialItems.length - 1) {
      setStep(step + 1);
      return navigation.navigate('RegisterScreen');
    }

    if (!socialLink.url || !socialLink.title)
      return Toast.error({primaryText: 'Please fill up all the fields.'});

    navigation.navigate('OtherSocialsScreen');
    setCurrentSocialStep(currentSocialStep + 1);
  };

  useEffect(() => {
    if (socialLink.url) return;

    setSocialLink({
      id: 'whatsapp',
      url: `(${data.code}) `,
      title: socialLink.title,
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
            setSocialLink({
              id: socialLink.id,
              title: socialLink.title,
              url: `(${data.code}) `,
            });
            setOpen(false);
          }}
        />
        <View className="px-[40px] py-[53px]">
          <HeaderStepCount
            showDotes={false}
            step={currentSocialStep}
            onBackPress={handleBackPress}
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
                keyboardType="number-pad"
                onChangeText={text => {
                  setSocialLink({
                    url: text,
                    id: 'whatsapp',
                    title: socialLink.title,
                  });
                }}
                value={socialLink.url}
                className="relative pl-20"
                placeholder="WhatsApp number"
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
                onChangeText={text => {
                  setSocialLink({
                    title: text,
                    id: 'whatsapp',
                    url: socialLink.url,
                  });
                }}
                value={socialLink.title}
                placeholder="Whatsapp"
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
