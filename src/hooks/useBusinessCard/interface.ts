import {Image} from 'react-native-image-crop-picker';
import {ISocial, SocialLinkType} from '../../constants/socials';

export interface IPersonalInformation {
  name: string;
  department: string;
  companyName: string;
  designation: string;
}

export interface IContactDetails {
  email: string;
  mobile: string;
  websiteUrl: string;
  companyAddress: string;
  companyLogo: Image | null;
  profilePicture: Image | null;
}

export interface ISocialLink {
  url: string;
  title: string;
  id: SocialLinkType;
}

export interface ICreateBusinessCardState {
  step: number;
  socialItems: ISocial[];
  fromDashBoard: boolean;
  socialLinks: ISocialLink[];
  contactDetails: IContactDetails;
  personalInformation: IPersonalInformation;
}

export interface ICreateBusinessCardActions {
  setStep: (step: number) => void;
  setSocialItem: (item: ISocial) => void;
  setFromDashBoard: (val: boolean) => void;
  setSocialItems: (items: ISocial[]) => void;
  setSocialLink: (data: ISocialLink) => void;
  setSocialLinks: (data: ISocialLink[]) => void;
  removeSocialItem: (id: SocialLinkType) => void;
  removeSocialLink: (id: SocialLinkType) => void;
  setContactDetails: (contactDetails: IContactDetails) => void;
  setPersonalInformation: (personalInfo: IPersonalInformation) => void;
}
