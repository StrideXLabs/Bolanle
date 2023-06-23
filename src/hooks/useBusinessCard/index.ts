import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import SOCIALS from '../../constants/socials';
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
    currentSocialStep: 0,
    contactDetails: initialContactDetails,
    personalInformation: initialPersonalInformation,
    setStep: step =>
      set(state => {
        state.step = step <= 3 ? step : state.step;
      }),
    setContactDetails: contactDetails =>
      set(state => {
        state.contactDetails = contactDetails;
      }),
    setPersonalInformation: personalInfo =>
      set(state => {
        state.personalInformation = personalInfo;
      }),

    socialItems: [SOCIALS[0], SOCIALS[1]],
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
    socialLinks: [],
    setCurrentSocialStep: step => {
      set(state => {
        if (step < 0) return;
        if (step > state.socialItems.length - 1) return;

        state.currentSocialStep = step;
      });
    },
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
  })),
);
