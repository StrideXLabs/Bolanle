import {View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {
  InstaIcon,
  LinkedIdIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '../../constants/icons';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

const SocialLinks = () => {
  const linkIcons = [
    {
      icon: WhatsAppIcon as any,
      link: 'https://www.whatsapp.com/',
    },

    {
      icon: InstaIcon as any,
      link: 'https://www.isntagram.com/',
    },
    {
      icon: TwitterIcon as any,
      link: 'https://www.x.com/',
    },
    {
      icon: LinkedIdIcon as any,
      link: 'https://www.linkedin.com/',
    },
  ];

  return (
    <>
      <Text className="font-3 text-black text-2xl mt-5">Social Details</Text>
      <View
        className="flex flex-row justify-around"
        style={{
          marginVertical: responsiveHeight(18 / percentToPx),
        }}>
        {linkIcons.map((item, index) => (
          <TouchableOpacity key={index}>
            <Image
              source={item.icon}
              className={`h-8 w-8`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default SocialLinks;
