import {IContactDetails, IPersonalInformation} from './interface';

export const initialContactDetails = {
  email: '',
  mobile: '',
  websiteUrl: '',
  companyLogo: '',
  profileImage: '',
  companyAddress: '',
} as IContactDetails;

export const initialPersonalInformation = {
  company: '',
  fullName: '',
  department: '',
  designation: '',
} as IPersonalInformation;
