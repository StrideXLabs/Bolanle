import {Asset} from 'react-native-image-picker';
import {ISocial, SocialLinkType} from '../../constants/socials';

export interface IPersonalInformation {
  company: string;
  fullName: string;
  department: string;
  designation: string;
}

export interface IContactDetails {
  email: string;
  mobile: string;
  websiteUrl: string;
  companyAddress: string;
  companyLogo: Asset | null;
  profilePicture: Asset | null;
}

export interface ISocialLink {
  url: string;
  title: string;
  id: SocialLinkType;
}

export interface ICreateBusinessCardState {
  step: number;
  socialItems: ISocial[];
  currentSocialStep: number;
  socialLinks: ISocialLink[];
  contactDetails: IContactDetails;
  personalInformation: IPersonalInformation;
}

export interface ICreateBusinessCardActions {
  setStep: (step: number) => void;
  setSocialItem: (item: ISocial) => void;
  setSocialLink: (data: ISocialLink) => void;
  setCurrentSocialStep: (step: number) => void;
  removeSocialItem: (id: SocialLinkType) => void;
  removeSocialLink: (id: SocialLinkType) => void;
  setContactDetails: (contactDetails: IContactDetails) => void;
  setPersonalInformation: (personalInfo: IPersonalInformation) => void;
}
