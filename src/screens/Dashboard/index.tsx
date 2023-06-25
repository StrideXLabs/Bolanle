import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Button from '../../components/Button';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {accentColor} from '../../constants';
import textStyles from '../../constants/fonts';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import dashboardService, {ICardData} from '../../services/dashboard.service';
import Card from './Card';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ICardData[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getAllCards();

      if (!data.success) {
        setLoading(false);
        setError(data.message);
      }

      setCards(data.data?.data || []);
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
    navigation.navigate('EditCardScreen', {card});
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <View className="h-full w-full">
      <DashboardHeader heading="DASHBOARD" />
      {loading && (
        <View className="h-[90%] flex justify-center items-center">
          <ActivityIndicator size={50} color={accentColor} />
        </View>
      )}
      {!loading && cards.length === 0 && error && (
        <View className="h-[90%] flex justify-center items-center">
          <Text
            className="text-dark-blue text-lg"
            style={textStyles.robotoBold}>
            {error}
          </Text>
          <Button text="RETRY" callback={fetchDashboardData} className="mt-3" />
        </View>
      )}
      <View className="w-full items-center mt-[46px]">
        {!loading && !error && cards.length > 0 && (
          <FlatList
            data={cards}
            numColumns={1}
            horizontal={false}
            className="px-10"
            style={{width: '100%'}}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Card card={item} onCardPress={handleCardPress} />
            )}
          />
        )}
      </View>
      {/* <Button
        className="mt-10"
        text="LOGOUT"
        callback={async () => {
          await flushStorage();
          setAuthState({authed: false, token: null, user: null});
          navigation.canGoBack() && navigation.popToTop();
          navigation.replace('LoginScreen');
        }}
      /> */}
    </View>
  );
};

export default DashboardScreen;
