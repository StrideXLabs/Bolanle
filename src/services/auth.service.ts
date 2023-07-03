import {HttpError, isHttpError} from 'http-errors';
import {emailRegex} from '../constants';
import {IUser} from '../hooks/useAuth/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';

export interface ICredentialsData {
  email: string;
  password: string;
}

export interface IAuthedResponse {
  token: string;
  message: string;
}

class AuthService {
  async authenticate(
    data: ICredentialsData,
    type: 'LOGIN' | 'REGISTRATION',
  ): Promise<IDefaultAPIResponse<string>> {
    try {
      const {email, password} = data;

      if (!emailRegex.test(email))
        return {
          data: null,
          success: false,
          message: 'Provide a valid email address.',
        };

      if (!password || password.length < 5)
        return {
          data: null,
          success: false,
          message: 'Password must be 5 characters long.',
        };

      const response = await fetcher<ICredentialsData, IAuthedResponse>(
        `/user${type === 'REGISTRATION' ? '/signup' : '/login'}`,
        {body: {email, password}, method: 'POST'},
      );

      return {
        success: true,
        data: response.token,
        message:
          type === 'REGISTRATION'
            ? 'Account created successfully.'
            : 'Logged in.',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: isHttpError(error)
          ? error.message
          : type === 'REGISTRATION'
          ? 'Error while creating account. Please try again.'
          : 'Error while login. Please try again.',
      };
    }
  }

  async deleteAccount(): Promise<IDefaultAPIResponse<{}>> {
    try {
      const response = await fetcher<{}, {message: string}>('/user', {
        method: 'DELETE',
      });
      return {data: null, success: true, message: response.message};
    } catch (error) {
      return {
        data: null,
        message: (error as HttpError).message,
        success: false,
      };
    }
  }

  async getCurrentUser(): Promise<
    IDefaultAPIResponse<IUser & {token: string}>
  > {
    try {
      const response = await fetcher<
        {},
        {message: string; data: IUser & {token: string}}
      >('/user');
      return {success: true, data: response.data, message: response.message};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }

  async sendForgotPasswordEmail(
    email: string,
  ): Promise<IDefaultAPIResponse<{message: string}>> {
    try {
      if (!emailRegex.test(email))
        return {
          data: null,
          success: false,
          message: 'Provide a valid email address.',
        };

      const response = await fetcher<{email: string}, {message: string}>(
        '/user/forgot-password',
        {method: 'POST', body: {email}},
      );

      return {success: true, data: null, message: response.message};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }
}

export default new AuthService();
