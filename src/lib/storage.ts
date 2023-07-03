import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStateKey, TokenKey} from '../constants';

export async function getDataFromAsyncStorage<TReturnData>(
  id: string,
): Promise<TReturnData> {
  let token: TReturnData | null;

  try {
    const jsonData = await AsyncStorage.getItem(id);
    token =
      jsonData && typeof jsonData === 'string' ? JSON.parse(jsonData) : null;
  } catch (error) {
    token = null;
  }

  return token as TReturnData;
}

export async function setDataToAsyncStorage<T>(id: string, data: T) {
  try {
    await AsyncStorage.setItem(id, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}

export async function flushStorage() {
  try {
    await AsyncStorage.multiRemove([TokenKey, AuthStateKey]);
    return true;
  } catch (error) {
    return false;
  }
}
