import {IContactDetails, IPersonalInformation} from './interface';

export const initialContactDetails = {
  email: '',
  mobile: '',
  websiteUrl: '',
  companyLogo: null,
  companyAddress: '',
  profilePicture: null,
  lat: null,
  lng: null,
} as IContactDetails;

export const initialPersonalInformation = {
  name: '',
  department: '',
  designation: '',
  companyName: '',
} as IPersonalInformation;
