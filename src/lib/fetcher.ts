import {BASE_URL, TokenKey} from '../constants';
import HttpError from './http-error';
import {getDataFromAsyncStorage} from './storage';

interface IRequestBodyData<T> {
  data?: T;
  headers?: {[key: string]: string | number};
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body: T;
}

interface IRequestData<T> {
  data: T;
  headers?: {[key: string]: string | number};
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: T;
}

type IRequestBody<T> = IRequestBodyData<T> | IRequestData<T>;

export default async function fetcher<
  TRequestBody extends {},
  TResponseData extends {message: string},
>(
  endpoint: string,
  options: IRequestBody<TRequestBody>,
): Promise<TResponseData> {
  const token = await getDataFromAsyncStorage<string>(TokenKey);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method,
    headers: {
      'x-access-token': token || '',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...(options.method !== 'GET' && {
      body: options.body
        ? (options.body as BodyInit_)
        : JSON.stringify(options.data),
    }),
  });

  if (response.status === 401 || response.status === 403) {
    throw new HttpError(response.status, 'UNAUTHORIZED');
  }

  const responseData = (await response.json()) as TResponseData;

  if (!response.ok)
    throw new Error(
      responseData.message || 'Something went wrong. Please try again.',
    );

  return responseData;
}
