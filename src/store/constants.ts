import {IContactDetails, IPersonalInformation} from './interface';

export const initialContactDetails = {
  email: '',
  mobile: '',
  websiteUrl: '',
  companyLogo: null,
  companyAddress: '',
  profilePicture: null,
} as IContactDetails;

export const initialPersonalInformation = {
  company: '',
  fullName: '',
  department: '',
  designation: '',
} as IPersonalInformation;
