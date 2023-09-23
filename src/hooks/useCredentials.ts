import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface ICredentialsState {
  email: string;
  password: string;
  isThirdParty?: boolean;
}

export interface ICredentialsStateActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsThirdParty: (isThirdParty: boolean) => void;
}

export const useCredentials = create<
  ICredentialsState & ICredentialsStateActions
>()(
  immer<ICredentialsState & ICredentialsStateActions>(set => ({
    email: '',
    password: '',
    isThirdParty: false,
    setEmail: email => {
      set(state => {
        state.email = email;
      });
    },
    setPassword: password => {
      set(state => {
        state.password = password;
      });
    },
    setIsThirdParty: isThirdParty => {
      set(state => {
        state.isThirdParty = isThirdParty;
      });
    },
  })),
);
