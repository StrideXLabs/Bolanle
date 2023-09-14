import {
  IContactDetails,
  IPersonalInformation,
} from '../hooks/useBusinessCard/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';
import {ICard} from './card.service';
import {HttpError, isHttpError} from 'http-errors';

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
  async getAll(): Promise<IDefaultAPIResponse<ICardsResponse['data']>> {
    try {
      const data = await fetcher<{}, ICardsResponse>('/contact');
      return {success: true, data: data.data, message: data.message};
    } catch (error) {
      return {
        data: [],
        success: false,
        message: isHttpError(error)
          ? error.message
          : 'Something went wrong. Please try again.',
      };
    }
  }

  async delete(id: string): Promise<IDefaultAPIResponse<{message: string}>> {
    try {
      await fetcher(`/contact/${id}`, {method: 'DELETE'});
      return {success: true, data: null, message: 'Contact deleted.'};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }

  async create(id: string): Promise<IDefaultAPIResponse<{message: string}>> {
    try {
      await fetcher(`/contact?cardId=${id}`, {method: 'POST'});
      return {success: true, data: null, message: 'Contact created.'};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }
}

export default new ContactsService();
