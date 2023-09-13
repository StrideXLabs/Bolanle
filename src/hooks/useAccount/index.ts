import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {
  initialAccountDetails,
  initialAccountPhotos,
  initialContactDetails,
  initialPersonalDetails,
} from './constants';
import {
  ICreateAccountState,
  ICreateAccountActions,
  IPersonalDetails,
  IAccountPhotos,
  IContactDetails,
  ISocialLink,
} from './interface';
import {ISocial} from '../../constants/socials';

export const useAccount = create<ICreateAccountState & ICreateAccountActions>()(
  immer<ICreateAccountState & ICreateAccountActions>(set => ({
    step: 0,
    setStep: step =>
      set(state => {
        state.step = step <= 2 ? step : state.step;
      }),

    fromDashBoard: false,
    setFromDashBoard: val => {
      set(state => {
        state.fromDashBoard = val;
      });
    },

    accountDetails: initialAccountDetails,
    setAccountDetails: accountDetails =>
      set(state => {
        state.accountDetails = accountDetails;
      }),

    personalDetails: initialPersonalDetails,
    setPersonalDetails: (personalDetails: IPersonalDetails) =>
      set(state => {
        state.personalDetails = personalDetails;
      }),

    accountPhotos: initialAccountPhotos,
    setAccountPhotos: (accountPhotos: IAccountPhotos) =>
      set(state => {
        state.accountPhotos = accountPhotos;
      }),

    contactDetails: initialContactDetails as IContactDetails,
    setContactDetails: (contactDetails: IContactDetails) =>
      set(state => {
        state.contactDetails = contactDetails;
      }),

    // personalInformation: initialPersonalInformation,
    // setPersonalInformation: personalInfo =>
    //   set(state => {
    //     state.personalInformation = personalInfo;
    //   }),

    // SOCIAL ITEMS
    socialItems: [] as ISocial[],
    setSocialItem: (item: ISocial) => {
      set(state => {
        const exist = state.socialItems.find(i => i.id === item.id);
        if (exist) return;
        state.socialItems = [item].concat(state.socialItems);
      });
    },
    removeSocialItem: id => {
      set(state => {
        state.socialItems = state.socialItems.filter(i => i.id !== id);
      });
    },
    setSocialItems: (items: ISocial[]) => {
      set(state => {
        state.socialItems = items;
      });
    },

    // SOCIAL LINKS
    socialLinks: [] as ISocialLink[],
    setSocialLink: (data: ISocialLink) => {
      set(state => {
        const exist = state.socialLinks.find(item => item.id === data.id);

        if (exist) {
          exist.url = data.url || '';
          exist.title = data.title || '';
          return;
        }

        state.socialLinks.push(data);
      });
    },
    removeSocialLink: id => {
      set(state => {
        state.socialLinks = state.socialLinks.filter(item => item.id !== id);
      });
    },
    setSocialLinks: (data: ISocialLink[]) => {
      set(state => {
        state.socialLinks = data;
      });
    },
  })),
);
