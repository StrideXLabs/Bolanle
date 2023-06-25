import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import FieldSocialIconsList from '../../constants/socials';
import {initialContactDetails, initialPersonalInformation} from './constants';
import {
  ICreateBusinessCardActions,
  ICreateBusinessCardState,
} from './interface';

export const useCreateBusinessCard = create<
  ICreateBusinessCardState & ICreateBusinessCardActions
>()(
  immer<ICreateBusinessCardState & ICreateBusinessCardActions>(set => ({
    step: 0,
    setStep: step =>
      set(state => {
        state.step = step <= 3 ? step : state.step;
      }),

    contactDetails: initialContactDetails,
    setContactDetails: contactDetails =>
      set(state => {
        state.contactDetails = contactDetails;
      }),

    personalInformation: initialPersonalInformation,
    setPersonalInformation: personalInfo =>
      set(state => {
        state.personalInformation = personalInfo;
      }),

    // SOCIAL ITEMS
    socialItems: [],
    setSocialItem: item => {
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

    // SOCIAL LINKS
    socialLinks: [],
    setSocialLink: data => {
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
  })),
);
