import {useEffect, useRef, useState} from 'react';
import {AuthStateKey, refreshTokenTime} from '../constants';
import {flushStorage, getDataFromAsyncStorage} from '../lib/storage';
import authService from '../services/auth.service';
import {initialAuthState, useAuth} from './useAuth';
import {IAuthState} from './useAuth/interface';

export default function useAuthState() {
  const timeId = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const authed = useAuth(state => state.authed);
  const setAuthState = useAuth(state => state.setAuthState);
  const redirectToLogin = useAuth(state => state.redirectToLogin);

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin});
  };

  const handleRefreshToken = async (data: IAuthState) => {
    try {
      const response = await authService.getCurrentUser();

      if (!response.success) {
        await handleLogout();
        setLoading(false);
        return;
      }

      setAuthState({
        authed: true,
        redirectToLogin,
        user: data.user,
        token: data.token,
      });
      setLoading(false);
    } catch (error) {
      await handleLogout();
      setLoading(false);
    }
  };

  const handleRefreshUserData = async () => {
    const data = await getDataFromAsyncStorage<IAuthState>(AuthStateKey);

    if (!data || !data.authed) {
      await handleLogout();
      setLoading(false);
      return;
    }

    await handleRefreshToken(data);
  };

  useEffect(() => {
    if (!authed) handleRefreshUserData();
    else setLoading(false);
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
