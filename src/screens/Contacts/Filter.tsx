import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

const Filter = () => {
  const filterTags = [
    {
      id: 1,
      name: 'All',
      isSelected: true,
    },
    {
      id: 2,
      name: 'Manager',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Developer',
      isSelected: false,
    },
    {
      id: 4,
      name: 'Designer',
      isSelected: false,
    },
    {
      id: 5,
      name: 'Marketing',
      isSelected: false,
    },
    {
      id: 6,
      name: 'Sales',
      isSelected: false,
    },
    {
      id: 7,
      name: 'Support',
      isSelected: false,
    },
    {
      id: 8,
      name: 'Finance',
      isSelected: false,
    },
    {
      id: 9,
      name: 'HR',
      isSelected: false,
    },
  ];

  return (
    <ScrollView
      horizontal
      style={{
        paddingTop: responsiveHeight(14 / percentToPx),
      }}>
      {filterTags.map((item, index) => (
        <View
          key={index}
          className={`flex flex-row justify-center items-center px-3 py-2 rounded-full mr-2 ${
            item.isSelected ? 'bg-accent' : 'bg-gray-200'
          }`}>
          <Text
            className={`font-0 ${
              item.isSelected ? 'text-white' : 'text-black'
            }`}>
            {item.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Filter;
