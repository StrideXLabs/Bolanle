import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import Button from '../../../components/Button';
import HeaderStepCount from '../../../components/Header/HeaderStepCount';
import HeaderWithText from '../../../components/Header/HeaderWithText';
import Layout from '../../../components/Layout';
import TextField from '../../../components/TextField/TextFieldDark';
import {percentToPx} from '../../../constants';
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
  const {social: socialItem, cardId, status} = params;
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
    navigation.navigate('SocialLinksScreen', {cardId, status});
  };

  return (
    <Layout>
      <View
        style={{
          paddingVertical: responsiveHeight(32 / percentToPx),
          paddingHorizontal: responsiveHeight(40 / percentToPx),
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderStepCount
            showDotes={false}
            onBackPress={() =>
              navigation.navigate('SocialLinksScreen', {cardId, status})
            }
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
          <TextField
            value={social.url}
            label="Link/Username"
            placeholder="Link/Username"
            autoCapitalize='none'
            onChangeText={url => setSocial(state => ({...state, url}))}
          />
          <View style={{marginTop: responsiveHeight(10 / percentToPx)}}>
            <TextField
              label="Title"
              value={social.title}
              placeholder={socialMappings[socialItem.id]}
              onChangeText={title => setSocial(state => ({...state, title}))}
            />
          </View>
          <Button
            text="Save"
            callback={handleSave}
            className="mt-[74px] w-full"
          />
        </ScrollView>
      </View>
    </Layout>
  );
};

export default OtherSocialsScreen;
