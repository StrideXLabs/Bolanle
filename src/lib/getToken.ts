import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from '../constants';

export default async function getTokenFromStorage() {
  let token: string = '';

  try {
    const jsonData = await AsyncStorage.getItem(TOKEN);
    token =
      jsonData && typeof jsonData === 'string' ? JSON.parse(jsonData) : '';
  } catch (error) {
    token = '';
  }

  return token;
}
