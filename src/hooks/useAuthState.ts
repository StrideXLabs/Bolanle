import {useEffect, useRef, useState} from 'react';
import {AuthStateKey, refreshTokenTime} from '../constants';
import {flushStorage, getDataFromAsyncStorage} from '../lib/storage';
import {initialAuthState, useAuth} from './useAuth';
import {IAuthState} from './useAuth/interface';
import authService from '../services/auth.service';

export default function useAuthState() {
  const timeId = useRef<number | null>(null);
  const authed = useAuth(state => state.authed);
  const [loading, setLoading] = useState(authed);
  const setAuthState = useAuth(state => state.setAuthState);
  const redirectToLogin = useAuth(state => state.redirectToLogin);

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin});
  };

  const handleRefreshToken = async (data: IAuthState) => {
    try {
      const response = await authService.getCurrentUser();

      setLoading(false);
      if (!response.success) {
        await handleLogout();
        return;
      }

      setAuthState({
        authed: true,
        redirectToLogin,
        user: data.user,
        token: data.token,
      });
    } catch (error) {
      setLoading(false);
      await handleLogout();
    }
  };

  const handleRefreshUserData = async () => {
    const data = await getDataFromAsyncStorage<IAuthState>(AuthStateKey);

    if (!data || !data.authed) {
      setLoading(false);
      await handleLogout();
      return;
    }

    await handleRefreshToken(data);
  };

  useEffect(() => {
    if (!authed) handleRefreshUserData();
  }, [authed]);

  useEffect(() => {
    if (authed && !timeId.current) {
      timeId.current = setInterval(handleRefreshUserData, refreshTokenTime);
    }

    return () => {
      timeId.current && clearInterval(timeId.current);
      timeId.current = null;
    };
  }, [authed]);

  return {loading, authed, redirectToLogin};
}
