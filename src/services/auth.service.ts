import {emailRegex} from '../constants';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';

export interface ICredentialsData {
  email: string;
  password: string;
}

export interface IAuthedResponse {
  message: string;
  token: string;
}

class AuthService {
  async authenticate(
    data: ICredentialsData,
    type: 'LOGIN' | 'REGISTRATION',
  ): Promise<IDefaultAPIResponse<IAuthedResponse>> {
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
        {data: {email, password}, method: 'POST'},
      );

      return {
        success: true,
        data: response,
        message:
          type === 'REGISTRATION'
            ? 'Account created successfully.'
            : 'Logged in.',
      };
    } catch (error) {
      console.log(error);

      return {
        data: null,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : type === 'REGISTRATION'
            ? 'Error while creating account. Please try again.'
            : 'Error while login. Please try again.',
      };
    }
  }
}

export default new AuthService();
