import {
  IContactDetails,
  IPersonalInformation,
} from '../hooks/useBusinessCard/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';
import {ICard} from './card.service';

export interface IContactData {
  _id: string;
  userId: string;
  socialLinks: ICard[];
  personalInfo: IPersonalInformation;
  contactDetails: Omit<
    Omit<IContactDetails, 'profilePicture'>,
    'companyLogo'
  > & {profileImage: string; companyLogo: string};
  qr: string;
}

export interface ICardsResponse {
  message: string;
  data: IContactData[];
}

class ContactsService {
  async getAll(): Promise<IDefaultAPIResponse<ICardsResponse>> {
    try {
      const data = await fetcher<{}, ICardsResponse>('/contact', {
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
        data: {data: [], message: ''},
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
        success: false,
      };
    }
  }
}

export default new ContactsService();
