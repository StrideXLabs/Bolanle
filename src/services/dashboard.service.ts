import {HttpError, isHttpError} from 'http-errors';
import {
  IContactDetails,
  IPersonalInformation,
} from '../hooks/useBusinessCard/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';
import {ICard} from './card.service';

export interface ICardData {
  _id: string;
  userId: string;
  socialLinks: ICard[];
  personalInfo: IPersonalInformation;
  contactDetails: Omit<
    Omit<IContactDetails, 'profilePicture'>,
    'companyLogo'
  > & {profileImage: string; companyLogo: string};
  qr: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICardsResponse {
  message: string;
  data: ICardData[];
}

export type IEditCardData =
  | {socialLinks: ICard[]}
  | {contactDetails: FormData}
  | {personalInfo: IPersonalInformation};

class DashboardService {
  async getAllCards(): Promise<IDefaultAPIResponse<ICardsResponse['data']>> {
    try {
      const data = await fetcher<{}, ICardsResponse>('/dashboard');
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
        message: isHttpError(error)
          ? error.message
          : 'Something went wrong. Please try again.',
        success: false,
      };
    }
  }

  async editCardDetails(
    cardId: string,
    data: IEditCardData,
    isFormData = false,
  ): Promise<IDefaultAPIResponse<ICardData>> {
    try {
      const response = await fetcher<
        IEditCardData,
        {data: ICardData; message: string}
      >(`/business-card/${cardId}`, {
        body: data,
        method: 'PUT',
        ...(isFormData && {
          isFormData: true,
          headers: {'Content-Type': 'multipart/form-data'},
        }),
      });

      return {success: true, data: response.data, message: ''};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }
}

export default new DashboardService();
