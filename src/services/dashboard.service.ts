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
  async getAllCards(): Promise<IDefaultAPIResponse<ICardsResponse>> {
    try {
      const data = await fetcher<{}, ICardsResponse>('/dashboard', {
        body: {},
        method: 'GET',
      });

      return {
        success: true,
        message: data.message,
        data: {data: data.data, message: data.message},
      };
    } catch (error) {
      return {
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
        success: false,
      };
    }
  }
}

export default new DashboardService();
