import {
  IAccountDetails,
  IAccountPhotos,
  IContactDetails,
  IPersonalDetails,
} from './interface';

export const initialContactDetails: IContactDetails = {
  email: '',
  mobile: '',
  websiteUrl: '',
  companyLogo: '',
  companyAddress: '',
  profilePicture: '',
};

export const initialAccountDetails: IAccountDetails = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const initialPersonalDetails: IPersonalDetails = {
  name: '',
  phone: '',
  websiteUrl: '',
  department: '',
  companyName: '',
  designation: '',
};

export const initialAccountPhotos: IAccountPhotos = {
  profilePicture: '',
  companyLogo: '',
};
