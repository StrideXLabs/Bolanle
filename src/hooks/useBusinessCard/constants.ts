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
  companyName: '',
  name: '',
  department: '',
  designation: '',
} as IPersonalInformation;
