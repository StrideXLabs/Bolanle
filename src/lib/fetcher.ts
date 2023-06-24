import {BASE_URL, TOKEN} from '../constants';

interface IRequestBody<T> {
  data: T;
  headers?: {[key: string]: string | number};
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

export default async function fetcher<
  TRequestBody extends {},
  TResponseData extends {message: string},
>(endpoint: string, data: IRequestBody<TRequestBody>): Promise<TResponseData> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: data.method,
    headers: {
      'x-access-token': '',
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(data.headers || {}),
    },
    ...(data.method !== 'GET' && {body: JSON.stringify(data.data)}),
  });

  const responseData = (await response.json()) as TResponseData;

  console.log(response, responseData);

  if (!response.ok)
    throw new Error(
      responseData.message || 'Something went wrong. Please try again.',
    );

  return responseData;
}
