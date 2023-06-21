import {Asset} from 'react-native-image-picker';

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

export interface ICreateBusinessCardState {
  step: number;
  contactDetails: IContactDetails;
  personalInformation: IPersonalInformation;
}

export interface ICreateBusinessCardActions {
  setStep: (step: number) => void;
  setContactDetails: (contactDetails: IContactDetails) => void;
  setPersonalInformation: (personalInfo: IPersonalInformation) => void;
}
