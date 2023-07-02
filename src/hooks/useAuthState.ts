import {useEffect, useRef, useState} from 'react';
import {AuthStateKey, refreshTokenTime} from '../constants';
import {getDataFromAsyncStorage} from '../lib/storage';
import {initialAuthState, useAuth} from './useAuth';
import {IAuthState} from './useAuth/interface';

export default function useAuthState() {
  const timeId = useRef<number | null>(null);
  const authed = useAuth(state => state.authed);
  const [loading, setLoading] = useState(authed);
  const setAuthState = useAuth(state => state.setAuthState);
  const redirectToLogin = useAuth(state => state.redirectToLogin);

  const handleRefreshToken = async (data: IAuthState) => {
    try {
      setAuthState({...data, redirectToLogin});
    } catch (error) {
      setAuthState({...initialAuthState, redirectToLogin});
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshUserData = async () => {
    const data = await getDataFromAsyncStorage<IAuthState>(AuthStateKey);

    if (!data) {
      setAuthState({...initialAuthState, redirectToLogin});
      setLoading(false);
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
