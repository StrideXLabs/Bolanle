export interface IAuthState {
  authed: boolean;
  user: IUser | null;
  token: string | null;
}

export interface IUser {
  email: string;
}

export interface IAuthStateActions {
  setAuthState: (data: IAuthState) => void;
}
