export interface IAuthState {
  authed: boolean;
  user: IUser | null;
  token: string | null;
}

export interface IUser {
  id: string;
  email: string;
  expires: number;
}

export interface IAuthStateActions {
  removeAuthState: () => void;
  setAuthState: (data: IAuthState) => void;
}
