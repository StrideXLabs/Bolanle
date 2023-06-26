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
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';

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
    id: socialItem.id,
    title: socialMappings[socialItem.id],
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
      <View
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
            heading={`ADD ${socialMappings[socialItem.id]}`}
            subtitle="Please fill the following detail."
          />
        </View>
        <View className="flex gap-2">
          <View className="flex">
            <Text
              style={[
                textStyles.robotoMedium,
                {
                  marginBottom: responsiveHeight(5 / percentToPx),
                  fontSize: responsiveFontSize(16 / percentToPx),
                },
              ]}
              className="font-bold text-dark-blue">
              Link/Username
            </Text>
            <TextField
              value={social.url}
              placeholder="Link/Username"
              onChangeText={url => setSocial(state => ({...state, url}))}
            />
          </View>
          <View className="flex">
            <Text
              style={[
                textStyles.robotoMedium,
                {
                  marginBottom: responsiveHeight(5 / percentToPx),
                  fontSize: responsiveFontSize(16 / percentToPx),
                },
              ]}
              className="font-bold text-dark-blue">
              Title
            </Text>
            <TextField
              editable={false}
              focusable={false}
              value={social.title}
              selectTextOnFocus={false}
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
