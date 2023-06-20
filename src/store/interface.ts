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
  companyLogo: string;
  profileImage: string;
  companyAddress: string;
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
