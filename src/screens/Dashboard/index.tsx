/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import Layout from '../../components/Layout';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import {AppStackParams} from '../../navigation/AppNavigation';
import TextField from '../../components/TextField/TextFieldLight';
import {SearchIcon, addCardIcon} from '../../constants/icons';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import DashboardCard from './Card';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen',
  'PersonalInfoScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [fromDashboard, setFromDashBoard] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <Layout>
      <DashboardHeader />
      <View
        style={{
          paddingVertical: responsiveHeight(17 / percentToPx),
          paddingHorizontal: responsiveHeight(20 / percentToPx),
        }}>
        <TextField
          placeholder="Search name, category ..."
          onChangeText={text => {
            setSearchText(text);
          }}
          value={searchText}
          gradient={true}
          icon={
            <Image
              source={SearchIcon as any}
              className={`h-5 w-5`}
              style={{tintColor: '#8a8a8f'}}
            />
          }
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <DashboardCard navigation={navigation} />
        <View
          className="justify-center"
          style={{
            marginBottom: responsiveHeight(40 / percentToPx),
            marginRight: responsiveHeight(10 / percentToPx),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PersonalInfoScreen', {
                cardId: null,
                status: 'CREATING',
              });
            }}>
            <Image
              source={addCardIcon as any}
              className={`h-8 w-8`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default DashboardScreen;
