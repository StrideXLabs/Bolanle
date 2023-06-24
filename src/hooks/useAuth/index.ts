import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware/persist';
import {IAuthState, IAuthStateActions} from './interface';

export const useAuth = create<IAuthState & IAuthStateActions>()(
  persist(
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
      removeAuthState: () => {
        set(state => {
          state.user = null;
          state.token = null;
          state.authed = false;
        });
      },
    })),
    {
      name: 'authState',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
