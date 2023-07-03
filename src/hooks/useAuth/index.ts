import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IAuthState, IAuthStateActions} from './interface';

export const initialAuthState = {
  user: null,
  token: null,
  authed: false,
  redirectToLogin: false,
} as IAuthState;

export const useAuth = create<IAuthState & IAuthStateActions>()(
  immer<IAuthState & IAuthStateActions>(set => ({
    ...initialAuthState,
    setAuthState: data => {
      set(state => {
        state.user = data.user || null;
        state.token = data.token || '';
        state.authed = data.authed ?? false;
        state.redirectToLogin = data.redirectToLogin ?? false;
      });
    },
  })),
);
