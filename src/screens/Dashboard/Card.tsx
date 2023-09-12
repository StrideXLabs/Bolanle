import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  CompanyIcon,
  EmailIcon,
  IntegrationIcon,
  LanguageIcon,
  LocationIcon,
  PhoneIcon,
  ShareIcon,
} from '../../constants/icons';
import Button from '../../components/Button';
import Toast from '../../lib/toast';

interface ICardProps {
  card: ICardData;
  onCardPress: (card: ICardData) => void;
}

const Card = ({card, onCardPress}: ICardProps) => {
  const {personalInfo, contactDetails} = card;

  const data = [
    {
      id: 1,
      icon: EmailIcon,
      text: `${contactDetails?.email}`,
    },
    {
      id: 2,
      icon: PhoneIcon,
      text: `${contactDetails?.mobile}`,
    },
    {
      id: 3,
      icon: LanguageIcon,
      text: `${contactDetails?.websiteUrl}`,
    },
    {
      id: 4,
      icon: LocationIcon,
      text: 'United States',
    },
  ];

  const handleEmailPress = () => {
    if (contactDetails?.email) {
      Linking.openURL(`mailto:${contactDetails.email}`);
    } else {
      Toast.error({primaryText: 'Email not found'});
    }
  };

  const handlePhonePress = () => {
    if (contactDetails?.mobile) {
      Linking.openURL(`tel:${contactDetails.mobile}`);
    } else {
      Toast.error({primaryText: 'Phone number not found'});
    }
  };

  const handleWebsitePress = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    } else if (url.startsWith('https://')) {
      url = url.replace('https://', 'http://');
    } else {
      Toast.error({primaryText: 'Website not found'});
    }
    Linking.openURL(url);
  };

  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(8 / percentToPx),
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        maxWidth: responsiveHeight(365 / percentToPx),
      }}>
      <Pressable
        className="flex bg-secondary-blue rounded-3xl p-4 space-y-5"
        onPress={() => onCardPress(card)}>
        {/* Card */}
        <View className="w-full bg-white rounded-3xl flex flex-row space-x-6">
          <View className="flex-1">
            <Image
              resizeMode="contain"
              className="rounded-2xl h-44 w-40"
              source={{
                uri:
                  BASE_URL +
                  `/${card._id}/${contactDetails?.profileImage}` +
                  `?time=${Date.now()}`,
                cache: 'reload',
              }}
            />
          </View>
          <View className="flex-1 justify-center">
            <View className="flex flex-col mb-4">
              <Text className="font-4 text-xl text-black flex-wrap">
                {personalInfo?.name}
              </Text>
              <Text className="font-1 flex-wrap">
                {personalInfo?.designation}
              </Text>
            </View>
            <View className="flex flex-row gap-1">
              <TouchableOpacity>
                <Image
                  source={ShareIcon as any}
                  className={`h-8 w-8`}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={IntegrationIcon as any}
                  className={`h-8 w-8`}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={CompanyIcon as any}
                  className={`h-8 w-8`}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Contact Details */}

        <View className="flex flex-row flex-wrap gap-[9px]">
          {data.map((item, index) => (
            <Pressable
              key={index}
              className="bg-white w-[47%] h-[90px] p-3 rounded-2xl flex-col justify-between"
              onPress={e => {
                if (item.id === 1) {
                  e.stopPropagation();
                  handleEmailPress();
                } else if (item.id === 2) {
                  e.stopPropagation();
                  handlePhonePress();
                } else if (item.id === 3) {
                  e.stopPropagation();
                  handleWebsitePress(item.text);
                }
              }}>
              <Image
                source={item.icon as any}
                className={`h-8 w-8`}
                resizeMode="contain"
              />
              <View className="p-1">
                <Text className="font-2 text-sm truncate" numberOfLines={1}>
                  {item.text}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Button */}
        <View
          style={{
            paddingTop: responsiveHeight(8 / percentToPx),
          }}>
          <Button text="Edit card details" callback={() => {}} />
        </View>
      </Pressable>
    </View>
  );
};

export default Card;
