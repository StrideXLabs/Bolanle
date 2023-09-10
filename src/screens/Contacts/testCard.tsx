import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import {MenuIcon} from '../../constants/icons';

const ContactCard = () => {
  const details = ['Apple', 'United States', '(203) 555-0123'];
  const tags = ['Manager', 'Developer', 'Designer'];

  return (
    <View
      className="bg-secondary-blue w-full p-3 rounded-2xl"
      style={{
        marginTop: responsiveHeight(10 / percentToPx),
      }}>
      <View className="flex flex-row gap-2">
        <Image
          resizeMode="contain"
          className="rounded-md h-12 w-12"
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            cache: 'reload',
          }}
        />

        <View className="flex-1 flex-row justify-between">
          <View className="flex flex-col justify-center">
            <Text className="font-3 text-black text-lg">Emily Watson</Text>
            <Text className="font-1 text-sm">Project Manager</Text>
          </View>

          <TouchableOpacity>
            <Image
              source={MenuIcon as any}
              className={`h-6 w-6`}
              style={{tintColor: '#8a8a8f'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        className="flex flex-col flex-wrap"
        style={{
          paddingTop: responsiveHeight(8 / percentToPx),
          marginLeft: responsiveHeight(2 / percentToPx),
        }}>
        <View className="flex flex-row flex-wrap">
          {details.map((detail, index) => (
            <>
              <Text className="font-0" key={index}>
                {detail}
              </Text>
              <View
                className={`${
                  index !== details.length - 1
                    ? 'border-r-2 h-3 mx-2 self-center'
                    : ''
                } border-gray-400 box-border`}
              />
            </>
          ))}
        </View>

        <View className="flex flex-row space-x-2 mt-1 flex-wrap">
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              className="bg-emerald-500 rounded-full px-2 py-1">
              <Text className="font-0 text-white">{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ContactCard;
