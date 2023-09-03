import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import DashboardHeader from '../../components/Header/DashboardHeader';
import Layout from '../../components/Layout';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {useCreateBusinessCard} from '../../hooks/useAccount';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import dashboardService, {ICardData} from '../../services/dashboard.service';
import Card from './Card';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {setFromDashBoard} = useCreateBusinessCard();
  const [cards, setCards] = useState<ICardData[]>([]);

  const fetchDashboardData = async () => {
    try {
      setCards([]);
      setError('');
      setLoading(true);
      const data = await dashboardService.getAllCards();

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

  const handleCardPress = (card: ICardData) => {
    navigation.navigate('EditCardScreen', {card, editable: true});
  };

  useEffect(() => {
    if (isFocused) fetchDashboardData();
  }, [isFocused]);

  return (
    <Layout>
      <DashboardHeader
        options={{
          type: 'ADD_NEW_VIEW',
          heading: 'DASHBOARD',
          onAddNewBtnPress: () => {
            setFromDashBoard(true);
            navigation.navigate('PersonalInformationScreen', {
              cardId: null,
              status: 'CREATING',
            });
          },
        }}
      />
      {loading && (
        <View
          className="flex justify-center items-center"
          style={{height: responsiveScreenHeight(75)}}>
          <ActivityIndicator size={50} color={accentColor} />
        </View>
      )}
      {!loading && cards.length === 0 && error && (
        <View
          className="flex justify-center items-center"
          style={{height: responsiveScreenHeight(75)}}>
          <Text
            className="text-dark-blue text-lg"
            style={textStyles.robotoBold}>
            {error}
          </Text>
          <Button
            text="RETRY"
            callback={fetchDashboardData}
            className="mt-3"
            style={{width: responsiveWidth(60)}}
          />
        </View>
      )}
      {!loading && !error && cards.length == 0 && (
        <View
          className="flex justify-center items-center"
          style={{marginTop: responsiveHeight(10)}}>
          <Text
            className="text-dark-blue"
            style={[
              textStyles.robotoBold,
              {fontSize: responsiveFontSize(18 / percentToPx)},
            ]}>
            No business card found.
          </Text>
        </View>
      )}

      {!loading && !error && cards.length > 0 && (
        <View
          style={{
            height: responsiveHeight(100),
            marginTop: responsiveHeight(15 / percentToPx),
            paddingHorizontal: responsiveHeight(30 / percentToPx),
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                colors={[accentColor]}
                onRefresh={fetchDashboardData}
              />
            }
            data={cards}
            numColumns={1}
            horizontal={false}
            style={{width: '100%'}}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card card={item} onCardPress={handleCardPress} />
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(25),
              gap: responsiveHeight(10 / percentToPx),
            }}
          />
        </View>
      )}
    </Layout>
  );
};

export default DashboardScreen;
