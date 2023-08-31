import {View, Image} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import {AppStackParams} from '../../navigation/AppNavigation';
import TestCard from './testCard';
import TextField from '../../components/TextField/TextFieldLight';
import {SearchIcon} from '../../constants/icons';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [fromDashboard, setFromDashBoard] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <Layout>
      <DashboardHeader
        options={{
          //   type: 'ADD_NEW_VIEW',
          //   heading: 'DASHBOARD',
          onAddNewBtnPress: () => {
            setFromDashBoard(true);
            navigation.navigate('PersonalInformationScreen', {
              cardId: null,
              status: 'CREATING',
            });
          },
        }}
      />
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
      <TestCard />
    </Layout>
  );
};

export default DashboardScreen;
