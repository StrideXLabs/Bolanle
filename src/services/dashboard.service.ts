import {isHttpError} from 'http-errors';
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
}

export default new DashboardService();
