import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import {AppStackParams} from '../../navigation/AppNavigation';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [fromDashboard, setFromDashBoard] = useState(false);

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
    </Layout>
  );
};

export default DashboardScreen;
