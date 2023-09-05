import {HttpError, isHttpError} from 'http-errors';
import {Image} from 'react-native-image-crop-picker';
import {
  // IContactDetails,
  // IPersonalInformation,
  IPersonalDetails,
} from '../hooks/useAccount/interface';
import fetcher from '../lib/fetcher';
import {getFileName} from '../lib/getFileName';
import {IDefaultAPIResponse} from '../types/api-response';
import {ICardData} from './dashboard.service';

export interface ICard {
  url: string;
  title: string;
  platform: string;
}

export interface ICreateCardData {
  companyLogo?: Image;
  profileImage?: Image;
  // socialLinks: ICard[];
  personalInformation: Omit<IPersonalDetails, 'websiteUrl'>;
  contactDetails: {
    websiteUrl: string;
  };
}

export interface ICreateApiCardData {
  formData: any;
  socialLinks: ICard[];
  contactDetails: {
    profileImage: string;
    companyLogo: string;
    websiteUrl: string;
  };
  personalInfo: IPersonalDetails;
}

export interface ICreateCardResponse {
  message: string;
  data: {_id: string; userId: string} & ICreateCardData;
}

class CardService {
  async create(
    data: ICreateCardData,
  ): Promise<IDefaultAPIResponse<ICreateCardResponse>> {
    try {
      // if (data.socialLinks.length === 0) {
      //   return {
      //     data: null,
      //     success: false,
      //     message: 'Please add at least one social link.',
      //   };
      // }

      const formData = new FormData();

      // formData.append('socialLinks', JSON.stringify(data.socialLinks));
      formData.append('contactDetails', JSON.stringify(data.contactDetails));
      formData.append(
        'personalInformation',
        JSON.stringify(data.personalInformation),
      );
      if (data.companyLogo) {
        formData.append('companyLogo', {
          uri: data.companyLogo.path,
          type: data.companyLogo.mime,
          name: data.companyLogo.filename || getFileName(data.companyLogo.path),
        });
      }
      if (data.profileImage) {
        formData.append('profileImage', {
          uri: data.profileImage.path,
          type: data.profileImage.mime,
          name:
            data.profileImage.filename || getFileName(data.profileImage.path),
        });
      }

      const response = await fetcher<FormData, ICreateCardResponse>(
        '/business-card',
        {
          method: 'POST',
          body: formData,
          isFormData: true,
          headers: {'Content-Type': 'multipart/form-data'},
        },
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

  async delete(
    cardId: string,
  ): Promise<IDefaultAPIResponse<{message: string}>> {
    try {
      if (!cardId)
        return {
          data: null,
          success: false,
          message: 'Please provide a card ID.',
        };

      await fetcher<{}, {message: string}>(`/business-card/${cardId}`, {
        method: 'DELETE',
      });

      return {success: true, data: null, message: 'Card deleted successfully.'};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }

  async getById(cardId: string): Promise<IDefaultAPIResponse<ICardData>> {
    try {
      if (!cardId)
        return {
          data: null,
          success: false,
          message: 'Please provide a card ID.',
        };

      const response = await fetcher<{}, {message: string; data: ICardData}>(
        `/business-card/${cardId}`,
      );

      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }
}

export default new CardService();
