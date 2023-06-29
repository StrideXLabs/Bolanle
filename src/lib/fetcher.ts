import axios, {isAxiosError} from 'axios';
import createHttpError from 'http-errors';
import {BASE_URL, TokenKey} from '../constants';
import {getDataFromAsyncStorage} from './storage';

interface IRequestBodyData<T> {
  body?: T;
  isFormData?: boolean;
  headers?: {[key: string]: string | number};
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

export const API = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default async function fetcher<
  TRequestBody extends {},
  TResponseData extends {message: string},
>(
  endpoint: string,
  options?: IRequestBodyData<TRequestBody>,
): Promise<TResponseData> {
  try {
    const token = await getDataFromAsyncStorage<string>(TokenKey);
    const {
      body,
      headers = {},
      method = 'GET',
      isFormData = false,
    } = options || {};

    const {data: response} = await API<TResponseData>(endpoint, {
      method,
      headers: {'x-access-token': token || '', ...headers},
      ...(method !== 'GET' && {
        data: !isFormData && body ? JSON.stringify(body) : body,
      }),
    });

    return response;
  } catch (error) {
    if (
      isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 401)
    )
      throw new createHttpError.Unauthorized();

    if (isAxiosError(error)) {
      throw new createHttpError.BadRequest(
        error.response?.data?.message || 'Something went wrong.',
      );
    }

    throw error;
  }
}
