import {Image} from 'react-native-image-crop-picker';
import {ISocial, SocialLinkType} from '../../constants/socials';

export interface IContactDetails {
  email?: string;
  mobile?: string;
  websiteUrl?: string;
  companyAddress?: string;
  companyLogo?: Image | string | null;
  profilePicture?: Image | string | null;
}

export interface IPersonalDetails {
  name: string;
  designation?: string;
  phone?: string;
  websiteUrl?: string;
  department?: string;
  companyName?: string;
}

export interface IAccountPhotos {
  profilePicture: Image | string | null;
  companyLogo: Image | string | null;
}

export interface ISocialLink {
  url: string;
  title: string;
  id: SocialLinkType;
}

export interface IAccountDetails {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateAccountState {
  step: number;
  socialItems: ISocial[];
  fromDashBoard?: boolean;
  socialLinks: ISocialLink[];
  contactDetails: IContactDetails;
  accountDetails: IAccountDetails;
  personalDetails: {
    name: string;
    phone?: string;
    websiteUrl?: string;
    department?: string;
    companyName?: string;
    designation?: string;
  };
  accountPhotos: IAccountPhotos;
}

export interface ICreateAccountActions {
  setStep: (step: number) => void;
  setSocialItem: (item: ISocial) => void;
  setFromDashBoard: (val: boolean) => void;
  setSocialItems: (items: ISocial[]) => void;
  setSocialLink: (data: ISocialLink) => void;
  setSocialLinks: (data: ISocialLink[]) => void;
  removeSocialItem: (id: SocialLinkType) => void;
  removeSocialLink: (id: SocialLinkType) => void;
  setContactDetails: (contactDetails: IContactDetails) => void;
  setAccountDetails: (accountDetails: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  setPersonalDetails: (personalDetails: {
    name: string;
    phone?: string;
    websiteUrl?: string;
    department?: string;
    companyName?: string;
    designation?: string;
  }) => void;
  setAccountPhotos: (accountPhotos: IAccountPhotos) => void;
}
