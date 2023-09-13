import React, {useEffect, useState} from 'react';
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
import {
  initialContactDetails,
  initialPersonalInformation,
} from '../../hooks/useBusinessCard/constants';
import cardService from '../../services/card.service';
import {useNavigation} from '@react-navigation/native';

interface ICardProps {
  card: ICardData;
  onCardPress: (card: ICardData) => void;
}

const Card = ({card, onCardPress}: ICardProps) => {
  const {personalInfo, contactDetails} = card;

  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!card);
  const [{qr, socialLinks, _id, userId}, setCardData] = useState<
    Omit<Omit<ICardData, 'createdAt'>, 'updatedAt'>
  >(
    card || {
      qr: '',
      _id: '',
      userId: '',
      socialLinks: [],
      contactDetails: initialContactDetails,
      personalInfo: initialPersonalInformation,
    },
  );

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
    } else {
      Toast.error({primaryText: 'Website not found'});
    }
    Linking.openURL(url);
  };

  const handleFetchCardData = async () => {
    try {
      if (!card._id)
        return Toast.error({primaryText: 'Please provide a card ID.'});

      setError('');
      setLoading(true);
      const response = await cardService.getById(card._id);

      if (!response.success) {
        setLoading(false);
        setError(response.message);
        return;
      }

      setCardData(
        response.data! || {
          qr: '',
          _id: '',
          userId: '',
          socialLinks: [],
          contactDetails: initialContactDetails,
          personalInfo: initialPersonalInformation,
        },
      );
    } catch (error) {
      setError('Error fetching card data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!card?._id) return;
    handleFetchCardData();
  }, []);

  const onShareBtnPress = () => {
    navigation.push('ShareCardScreen', {
      type: 'WITH_DATA',
      fullName: personalInfo.name,
      company: personalInfo.companyName,
      card: {
        qr,
        _id,
        userId,
        socialLinks,
        personalInfo,
        contactDetails,
      },
    });
  };

  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(8 / percentToPx),
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        maxWidth: responsiveHeight(370 / percentToPx),
      }}>
      <View className="flex bg-secondary-blue rounded-3xl p-4 space-y-5">
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
              <TouchableOpacity onPress={onShareBtnPress}>
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
          <Button
            text="Edit card details"
            callback={() => {
              onCardPress(card);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
