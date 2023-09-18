import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
  Image,
  TouchableOpacity,
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
import {useCreateBusinessCard} from '../../hooks/useBusinessCard';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import dashboardService, {ICardData} from '../../services/dashboard.service';
import Card from './Card';
import TextField from '../../components/TextField/TextFieldDark';
import {SearchIcon, addCardIcon} from '../../constants/icons';
import {useAuth} from '../../hooks/useAuth';

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
  const [searchText, setSearchText] = useState('');
  const [filteredCards, setFilteredCards] = useState<ICardData[]>([]);
  const {user} = useAuth();

  const filterCards = (text: string) => {
    const filtered = cards.filter(card => {
      const companyName = card.personalInfo.companyName.toLowerCase();
      const name = card.personalInfo.name.toLowerCase();
      return (
        companyName.includes(text.toLowerCase()) ||
        name.includes(text.toLowerCase())
      );
    });
    setFilteredCards(filtered);
  };

  const hasSearchResults = filteredCards.length > 0;

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
          userDetails: {
            name: user?.name || '',
            designation: user?.email || '',
          },
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
          // paddingHorizontal: responsiveHeight(20 / percentToPx),
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
            className="flex justify-center items-center"
            style={{height: responsiveScreenHeight(75)}}>
            <Text className="text-black font-3 text-lg">{error}</Text>
            <Button
              text="RETRY"
              callback={fetchDashboardData}
              className="mt-3"
              style={{width: responsiveWidth(60)}}
            />
          </View>
        )}
        {!loading && !error && cards.length == 0 && (
          <View className="h-[90%] justify-center">
            <Text
              className="text-black font-3 text-lg text-center"
              style={[{fontSize: responsiveFontSize(18 / percentToPx)}]}>
              No business card found.
            </Text>
            <Text
              className="font-1 text-center mt-1"
              style={{
                paddingHorizontal: responsiveHeight(14 / percentToPx),
              }}>
              Create a new business card
            </Text>
            <TouchableOpacity
              className="self-center mt-2"
              onPress={() => {
                setFromDashBoard(true);
                navigation.navigate('PersonalInformationScreen', {
                  cardId: null,
                  status: 'CREATING',
                });
              }}>
              <Image source={addCardIcon as any} className={`h-8 w-8`} />
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && cards.length > 0 && (
          <View
            style={{
              paddingHorizontal: responsiveHeight(20 / percentToPx),
            }}>
            <TextField
              placeholder="Search name, category ..."
              onChangeText={text => {
                setSearchText(text);
                filterCards(text);
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
        )}

        {!loading && !error && cards.length > 0 && (
          <View
            style={{
              height: responsiveHeight(100),
              marginTop: responsiveHeight(15 / percentToPx),
            }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  colors={[accentColor]}
                  onRefresh={fetchDashboardData}
                />
              }
              data={searchText ? filteredCards : cards}
              numColumns={1}
              horizontal={true}
              style={{width: '100%'}}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={true}
              renderItem={({item}) => (
                <Card card={item} onCardPress={handleCardPress} />
              )}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(25),
                gap: responsiveHeight(10 / percentToPx),
              }}
            />

            {/* <View className="">
              <TouchableOpacity>
                <Image source={addCardIcon as any} className={`h-8 w-8`} />
              </TouchableOpacity>
            </View> */}
          </View>
        )}
      </View>
    </Layout>
  );
};

export default DashboardScreen;
