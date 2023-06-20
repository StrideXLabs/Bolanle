import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

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
  })),
);
