// import {IContactDetails, IPersonalInformation} from './interface';

// export const initialContactDetails = {
//   email: '',
//   mobile: '',
//   websiteUrl: '',
//   companyLogo: null,
//   companyAddress: '',
//   profilePicture: null,
// } as IContactDetails;

// export const initialPersonalInformation = {
//   name: '',
//   department: '',
//   designation: '',
//   companyName: '',
// } as IPersonalInformation;

import {IAccountDetails, IAccountPhotos, IPersonalDetails} from './interface';

export const initialAccountDetails: IAccountDetails = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const initialPersonalDetails: IPersonalDetails = {
  name: '',
  phone: '',
  websiteUrl: '',
};

export const initialAccountPhotos: IAccountPhotos = {
  profilePicture: null,
  companyLogo: null,
};
