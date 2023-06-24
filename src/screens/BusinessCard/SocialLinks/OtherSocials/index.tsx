import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Button from '../../../../components/Button';
import HeaderStepCount from '../../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../../components/Header/HeaderWithText';
import TextField from '../../../../components/TextField/TextFieldDark';
import textStyles from '../../../../constants/fonts';
import {socialMappings} from '../../../../constants/socials';
import {AppStackParams} from '../../../../navigation/AppNavigation';
import Toast from '../../../../lib/toast';
import {useCreateBusinessCard} from '../../../../hooks/useBusinessCard';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams,
  'OtherSocialsScreen'
>;

const OtherSocialsScreen = ({
  navigation,
  route: {params},
}: SocialLinksProps) => {
  const fromSocialLinks = params?.fromSocialLinks ?? false;

  const {
    step,
    setStep,
    socialItems,
    socialLinks,
    setSocialLink,
    currentSocialStep,
    setCurrentSocialStep,
  } = useCreateBusinessCard();

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
    if (currentSocialStep === 0) {
      navigation.navigate('SocialLinksScreen', {toSocialLinks: true});
      return;
    }

    const prevScreen = socialItems[currentSocialStep - 1];
    setCurrentSocialStep(currentSocialStep - 1);

    if (prevScreen.id === 'whatsapp') {
      navigation.navigate('WhatsAppScreen');
    }
  };

  const handleSave = () => {
    if (fromSocialLinks) {
      navigation.navigate('SocialLinksScreen', {toSocialLinks: true});
      return;
    }

    if (currentSocialStep === socialItems.length - 1) {
      setStep(step + 1);
      return navigation.navigate('RegisterScreen');
    }

    if (!socialLink.url || !socialLink.title)
      return Toast.error({primaryText: 'Please fill up all the fields.'});

    const nextItem = socialItems[currentSocialStep + 1];

    if (nextItem.id === 'whatsapp') {
      setCurrentSocialStep(currentSocialStep + 1);
      navigation.navigate('WhatsAppScreen');
      return;
    }
    setCurrentSocialStep(currentSocialStep + 1);
  };

  // if (socialItem.id === 'whatsapp') return null;

  return (
    <ScrollView nestedScrollEnabled>
      <View className="px-[40px] py-[53px]">
        <HeaderStepCount
          showDotes={false}
          step={currentSocialStep}
          onBackPress={handleBackPress}
        />
        <Text>PersonalInformation</Text>
        <View className="mt-9 mb-[30px]">
          <HeaderWithText
            heading={`ADD ${socialMappings[socialItem.id]}`}
            subtitle="Please fill the following detail."
          />
        </View>
        <View className="flex gap-2">
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Link/Username
            </Text>
            <TextField
              onChangeText={text => {
                setSocialLink({
                  url: text,
                  id: socialItem.id,
                  title: socialLink.title,
                });
              }}
              value={socialLink.url}
              placeholder="Link/Username"
            />
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
                  id: socialItem.id,
                  url: socialLink.url,
                });
              }}
              value={socialLink.title}
              placeholder={socialMappings[socialItem.id]}
            />
          </View>
        </View>
        <Button
          text="Save"
          callback={handleSave}
          className="mt-[74px] w-full"
        />
      </View>
    </ScrollView>
  );
};

export default OtherSocialsScreen;
