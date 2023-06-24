import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import TextField from '../../../components/TextField/TextFieldDark';
import textStyles from '../../../constants/fonts';
import {socialMappings} from '../../../constants/socials';
import {useCreateBusinessCard} from '../../../hooks/useBusinessCard';
import {ISocialLink} from '../../../hooks/useBusinessCard/interface';
import Toast from '../../../lib/toast';
import {AppStackParams} from '../../../navigation/AppNavigation';

export type SocialLinksProps = NativeStackScreenProps<
  AppStackParams,
  'OtherSocialsScreen'
>;

const OtherSocialsScreen = ({
  navigation,
  route: {params},
}: SocialLinksProps) => {
  const socialItem = params.social;
  const {setSocialLink, setSocialItem} = useCreateBusinessCard();
  const [social, setSocial] = useState<ISocialLink>({
    url: '',
    title: '',
    id: socialItem.id || 'whatsapp',
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

  return (
    <ScrollView nestedScrollEnabled>
      <View className="px-[40px] py-[53px]">
        <HeaderStepCount
          showDotes={false}
          onBackPress={() => navigation.navigate('SocialLinksScreen')}
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
              value={social.url}
              placeholder="Link/Username"
              onChangeText={url => setSocial(state => ({...state, url}))}
            />
          </View>
          <View className="flex gap-1">
            <Text
              style={textStyles.robotoMedium}
              className="text-base font-bold text-dark-blue">
              Title
            </Text>
            <TextField
              value={social.title}
              placeholder={socialMappings[socialItem.id]}
              onChangeText={title => setSocial(state => ({...state, title}))}
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
