import {View, Image} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import {AppStackParams} from '../../navigation/AppNavigation';
import TextField from '../../components/TextField/TextFieldLight';
import {SearchIcon} from '../../constants/icons';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import DashboardCard from './Card';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen',
  'ActionSheetScreen'
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
      <DashboardCard navigation={navigation} />
    </Layout>
  );
};

export default DashboardScreen;
