import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import Button from '../../components/Button';
import DashboardHeader from '../../components/Header/DashboardHeader';
import {BASE_URL, accentColor} from '../../constants';
import textStyles from '../../constants/fonts';
import {useAuth} from '../../hooks/useAuth';
import {flushStorage} from '../../lib/storage';
import {AppStackParams} from '../../navigation/AppNavigation';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';
import dashboardService, {ICardData} from '../../services/dashboard.service';

type DashboardScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'DashboardScreen'
>;

const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const {setAuthState} = useAuth();
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
            horizontal={false}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View
                key={item._id}
                className="px-5 pb-3 pt-[22px] w-[350px]  rounded-md border-[1px] border-[#E3E3E3]">
                <View className="w-full flex justify-center items-center">
                  <Image
                    resizeMode="cover"
                    className="h-[94px] w-[94px] rounded-md"
                    source={{
                      uri: BASE_URL + `/${item.contactDetails.companyLogo}`,
                    }}
                  />
                </View>
                <View className="mt-2">
                  <Image
                    resizeMode="contain"
                    className="h-[60px] w-[60px] rounded-full"
                    source={{
                      uri: BASE_URL + `/${item.contactDetails.profileImage}`,
                    }}
                  />
                  <View>
                    <Text
                      className="text-dark-blue text-lg"
                      style={textStyles.robotoBold}>
                      {item.personalInfo.name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <Button
        text="LOGOUT"
        callback={async () => {
          await flushStorage();
          setAuthState({authed: false, token: null, user: null});
          navigation.canGoBack() && navigation.popToTop();
          navigation.replace('LoginScreen');
        }}
      />
    </View>
  );
};

export default DashboardScreen;
