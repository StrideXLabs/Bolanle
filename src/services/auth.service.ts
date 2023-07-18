import {HttpError, isHttpError} from 'http-errors';
import {emailRegex} from '../constants';
import {IUser} from '../hooks/useAuth/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';

export interface ICredentialsData {
  email: string;
  password: string;
}

export interface ISignupResponse {
  token: string;
  message: string;
  verificationToken: string;
}

export interface ISigninResponse {
  token?: string;
  message: string;
  isVerified?: boolean;
}

export interface IVerificationResponse
  extends Omit<ISignupResponse, 'verificationToken'> {}
export interface IResendVerificationResponse
  extends Omit<ISignupResponse, 'token'> {}

class AuthService {
  async register(
    data: ICredentialsData,
  ): Promise<IDefaultAPIResponse<ISignupResponse>> {
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

      const response = await fetcher<ICredentialsData, ISignupResponse>(
        `/user/signup`,
        {body: {email, password}, method: 'POST'},
      );

      return {
        success: true,
        data: response,
        message: 'Account created successfully.',
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: isHttpError(error)
          ? error.message
          : 'Error while creating account. Please try again.',
      };
    }
  }

  async login(
    data: ICredentialsData,
  ): Promise<IDefaultAPIResponse<ISigninResponse>> {
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

      const response = await fetcher<ICredentialsData, ISigninResponse>(
        `/user/login`,
        {body: {email, password}, method: 'POST'},
      );

      return {
        success: true,
        data: response,
        message: response.message,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: isHttpError(error)
          ? error.message
          : 'Error while creating account. Please try again.',
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

  async verify(
    verificationToken: string,
  ): Promise<IDefaultAPIResponse<IVerificationResponse>> {
    try {
      const response = await fetcher<
        {verificationToken: string},
        IVerificationResponse
      >('/user/verify', {
        method: 'POST',
        body: {verificationToken},
      });

      return {success: true, data: response, message: response.message};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }

  async resendVerificationMail(
    verificationToken?: string,
    email?: string,
  ): Promise<IDefaultAPIResponse<IResendVerificationResponse>> {
    try {
      if (email && !emailRegex.test(email))
        return {
          data: null,
          success: false,
          message: 'Provide a valid email address.',
        };

      const response = await fetcher<
        {email?: string; verificationToken?: string},
        IResendVerificationResponse
      >('/user/verify/resend', {
        method: 'POST',
        body: verificationToken ? {verificationToken} : {email},
      });

      return {success: true, data: response, message: response.message};
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
