import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export interface IUseOpenModalState {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useOpenModalState = create<IUseOpenModalState>()(
  immer<IUseOpenModalState>(set => ({
    open: false,
    setOpen: val => {
      set(state => {
        state.open = val;
      });
    },
  })),
);
