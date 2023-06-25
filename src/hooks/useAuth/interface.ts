export interface IAuthState {
  authed: boolean;
  user: IUser | null;
  token: string | null;
  redirectToLogin?: boolean;
}

export interface IUser {
  id: string;
  email: string;
  expires: number;
}

export interface IAuthStateActions {
  setAuthState: (data: IAuthState) => void;
}
