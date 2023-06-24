import {BASE_URL, TOKEN} from '../constants';
import {getTokenFromStorage} from './storage';

interface IRequestBody<T> {
  data: T;
  headers?: {[key: string]: string | number};
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

export default async function fetcher<
  TRequestBody extends {},
  TResponseData extends {message: string},
>(
  endpoint: string,
  options: IRequestBody<TRequestBody>,
): Promise<TResponseData> {
  const token = await getTokenFromStorage<string>(TOKEN);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method,
    headers: {
      'x-access-token': token || '',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...(options.method !== 'GET' && {body: JSON.stringify(options.data)}),
  });

  const responseData = (await response.json()) as TResponseData;

  if (!response.ok)
    throw new Error(
      responseData.message || 'Something went wrong. Please try again.',
    );

  return responseData;
}
