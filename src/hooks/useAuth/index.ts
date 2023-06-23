import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IAuthState, IAuthStateActions} from './interface';

export const useAuth = create<IAuthState & IAuthStateActions>()(
  immer<IAuthState & IAuthStateActions>(set => ({
    user: null,
    token: null,
    authed: false,
    setAuthState: data => {
      set(state => {
        state.user = data.user || null;
        state.token = data.token || '';
        state.authed = data.authed || false;
      });
    },
  })),
);
