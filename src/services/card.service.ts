import {Asset} from 'react-native-image-picker';
import {
  IContactDetails,
  IPersonalInformation,
} from '../hooks/useBusinessCard/interface';
import fetcher from '../lib/fetcher';
import {IDefaultAPIResponse} from '../types/api-response';

export interface ICard {
  url: string;
  title: string;
  platform: string;
}

export interface ICreateCardData {
  companyLogo: Asset;
  profileImage: Asset;
  socialLinks: ICard[];
  personalInformation: IPersonalInformation;
  contactDetails: Omit<Omit<IContactDetails, 'profilePicture'>, 'companyLogo'>;
}

export interface ICreateApiCardData {
  formData: any;
  socialLinks: ICard[];
  contactDetails: Omit<
    Omit<IContactDetails, 'profilePicture'>,
    'companyLogo'
  > & {profileImage: string; companyLogo: string};
  personalInfo: IPersonalInformation;
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
      if (data.socialLinks.length === 0) {
        return {
          data: null,
          success: false,
          message: 'Please add at least one social link.',
        };
      }

      const formData = new FormData();

      formData.append('socialLinks', JSON.stringify(data.socialLinks));
      formData.append('contactDetails', JSON.stringify(data.contactDetails));
      formData.append('personalInfo', JSON.stringify(data.personalInformation));
      formData.append('companyLogo', {
        uri: data.companyLogo.uri,
        type: data.companyLogo.type,
        name: data.companyLogo.fileName,
      });
      formData.append('profileImage', {
        uri: data.profileImage.uri,
        type: data.profileImage.type,
        name: data.profileImage.fileName,
      });

      const response = await fetcher<FormData, ICreateCardResponse>(
        '/business-card',
        {
          body: formData,
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

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

export default new CardService();
