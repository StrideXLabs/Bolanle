import {BASE_URL} from '../constants';

interface IResponseBody<T> {
  data: T;
  headers?: {[key: string]: string | number};
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

export default async function fetcher<
  TResponseBody,
  TResponseData extends {message: string},
>(
  endpoint: string,
  data: IResponseBody<TResponseBody>,
): Promise<TResponseData> {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {});
  const responseData = (await response.json()) as TResponseData;

  if (!response.ok)
    throw new Error(
      responseData.message || 'Something went wrong. Please try again.',
    );

  return responseData;
}
