import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getTokenFromStorage<TReturnData>(
  id: string,
): Promise<TReturnData> {
  let token: string = '';

  try {
    const jsonData = await AsyncStorage.getItem(id);
    token =
      jsonData && typeof jsonData === 'string' ? JSON.parse(jsonData) : '';
  } catch (error) {
    token = '';
  }

  return token as TReturnData;
}

export async function setTokenToStorage<T>(id: string, data: T) {
  try {
    await AsyncStorage.setItem(id, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}
