/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Layout from '../../components/Layout';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import {AppStackParams} from '../../navigation/AppNavigation';
import TextField from '../../components/TextField/TextFieldLight';
import {SearchIcon, addCardIcon} from '../../constants/icons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {accentColor, percentToPx} from '../../constants';
import DashboardCard from './Card';
import {useIsFocused} from '@react-navigation/native';
import dashboardService, {ICardData} from '../../services/dashboard.service';
import Button from '../../components/Button';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen',
  'PersonalInfoScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ICardData[]>([]);

  const fetchDashboardData = async () => {
    try {
      setCards([]);
      setError('');
      setLoading(true);
      const data = await dashboardService.getAllCards();
      console.log('data', data);

      if (!data.success) {
        setLoading(false);
        setError(data.message);
      }

      setCards(data.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message || 'Something went wrong. Please try again.'
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleCardPress = (card: ICardData) => {
  //   navigation.navigate('EditCardScreen', {card, editable: true});
  // };

  useEffect(() => {
    if (isFocused) fetchDashboardData();
  }, [isFocused]);

  console.log('cards', cards);

  return (
    <Layout>
      <DashboardHeader />
      <View
        style={{
          paddingVertical: responsiveHeight(17 / percentToPx),
          paddingHorizontal: responsiveHeight(20 / percentToPx),
        }}>
        {loading && (
          <View
            className="flex justify-center items-center"
            style={{height: responsiveScreenHeight(75)}}>
            <ActivityIndicator size={50} color={accentColor} />
          </View>
        )}
        {!loading && cards.length === 0 && error && (
          <View
            className="h-[90%] justify-center items-center"
            style={{height: responsiveScreenHeight(75)}}>
            <Text className="text-black text-lg font-3">{error}</Text>
            <Button
              text="RETRY"
              callback={fetchDashboardData}
              className="mt-3"
              style={{width: responsiveWidth(60)}}
            />
          </View>
        )}
        {!loading && !error && cards.length == 0 && (
          <View className="h-[90%] justify-center items-center">
            <Text
              className="text-black font-3"
              style={[{fontSize: responsiveFontSize(18 / percentToPx)}]}>
              No business card found.
            </Text>
            <Button
              text="Create new card"
              callback={() => {}}
              className="mt-3"
              style={{width: responsiveWidth(60)}}
            />
          </View>
        )}

        {!loading && !error && cards.length > 0 && (
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
        )}
      </View>

      {!loading && !error && cards.length > 0 && (
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
      )}
    </Layout>
  );
};

export default DashboardScreen;
