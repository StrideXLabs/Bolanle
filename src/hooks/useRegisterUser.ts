import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface IRegisterUserState {
  email: string;
  password: string;
}

export interface IRegisterUserStateActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const useRegisterUser = create<
  IRegisterUserState & IRegisterUserStateActions
>()(
  immer<IRegisterUserState & IRegisterUserStateActions>(set => ({
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
