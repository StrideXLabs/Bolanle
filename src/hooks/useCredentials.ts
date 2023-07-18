import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface ICredentialsState {
  email: string;
  password: string;
}

export interface ICredentialsStateActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const useCredentials = create<
  ICredentialsState & ICredentialsStateActions
>()(
  immer<ICredentialsState & ICredentialsStateActions>(set => ({
    email: '',
    password: '',
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
  })),
);
