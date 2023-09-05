import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
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

const DashboardCard = ({navigation}: {navigation: any}) => {
  const data = [
    {
      id: 1,
      icon: EmailIcon,
      text: 'Emily@gmail.com',
    },
    {
      id: 2,
      icon: PhoneIcon,
      text: '0369-6942069',
    },
    {
      id: 3,
      icon: LanguageIcon,
      text: 'Apple.com',
    },
    {
      id: 4,
      icon: LocationIcon,
      text: 'United States',
    },
  ];

  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(8 / percentToPx),
        paddingHorizontal: responsiveHeight(20 / percentToPx),
      }}>
      <View className="bg-secondary-blue rounded-3xl p-4 space-y-5">
        {/* Card */}
        <View className="w-full bg-white rounded-3xl flex flex-row space-x-7">
          <View className="flex-1">
            <Image
              resizeMode="contain"
              className="rounded-2xl h-44 w-40"
              source={{
                uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                cache: 'reload',
              }}
            />
          </View>
          <View className="flex-1 justify-center">
            <View className="flex flex-col mb-4">
              <Text className="font-4 text-xl text-black flex-wrap">
                Emily{'\n'}Watson
              </Text>
              <Text className="font-1 flex-wrap">Project Manager</Text>
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

        <View className="flex w-full rounded-3xl justify-start items-center">
          <View className="flex flex-row flex-wrap gap-3">
            {data.map((item, index) => (
              <View
                className="bg-white rounded-2xl w-[46%] p-3 space-y-4"
                key={index}>
                <Image
                  source={item.icon as any}
                  className={`h-8 w-8`}
                  resizeMode="contain"
                />
                <Text className="font-1 text-sm">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Button */}
        <Button
          text="Edit card details"
          callback={() => navigation.navigate('EditCardScreen')}
        />
      </View>
    </View>
  );
};

export default DashboardCard;
