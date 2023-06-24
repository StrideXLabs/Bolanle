import {BASE_URL, emailRegex} from '../constants';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';

export interface ICreateAccountData {
  email: string;
  password: string;
}

export interface IICreateAccountResponse {
  message: string;
  token: string;
}

class AuthService {
  async register(
    data: ICreateAccountData,
  ): Promise<IDefaultAPIResponse<IICreateAccountResponse>> {
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

      const response = await fetcher<
        ICreateAccountData,
        IICreateAccountResponse
      >('/user/signup', {data: {email, password}, method: 'POST'});

      return {
        success: true,
        data: response,
        message: 'Account created successfully.',
      };
    } catch (error) {
      console.log(error);

      return {
        data: null,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Error while creating account. Please try again.',
      };
    }
  }
}

export default new AuthService();
