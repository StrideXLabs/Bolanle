import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';

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
import StaticContainerReg from '../../../containers/StaticContainerReg';
import GenericTextField from '../../../components/TextField/GenericTextField/GenericTextField';

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
      <StaticContainerReg
        isBack
        isHeader
        title="Add other socials"
        onBackPress={() => {
          navigation.navigate('SocialLinksScreen', {cardId, status});
        }}>
        <ScrollView
          className="h-screen w-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <View
              style={{
                marginTop: responsiveHeight(12 / percentToPx),
                marginBottom: responsiveHeight(22 / percentToPx),
              }}>
              <View className="w-full">
                <Text className="text-xl font-3 text-black text-center">
                  Add {socialMappings[socialItem.id]} account
                </Text>
              </View>
            </View>
            <GenericTextField
              value={social.url}
              placeholder="Link/Username"
              autoCapitalize="none"
              onChangeText={url => setSocial(state => ({...state, url}))}
            />
            <View style={{marginTop: responsiveHeight(10 / percentToPx)}}>
              <GenericTextField
                value={social.title}
                placeholder={socialMappings[socialItem.id]}
                onChangeText={title => setSocial(state => ({...state, title}))}
              />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(20 / percentToPx),
              }}>
              <Button text="Save" callback={handleSave} />
            </View>
          </View>
        </ScrollView>
      </StaticContainerReg>
    </Layout>
  );
};

export default OtherSocialsScreen;
