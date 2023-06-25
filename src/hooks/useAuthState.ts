import jwtDecode from 'jwt-decode';
import {useEffect, useState} from 'react';
import {AuthStateKey} from '../constants';
import {flushStorage, getDataFromAsyncStorage} from '../lib/storage';
import {useAuth} from './useAuth';
import {IAuthState} from './useAuth/interface';

export default function useAuthState() {
  const [loading, setLoading] = useState(true);
  const {authed, token, user, redirectToLogin, setAuthState} = useAuth();

  useEffect(() => {
    (async function () {
      try {
        const data = await getDataFromAsyncStorage<IAuthState>(AuthStateKey);

        if (!data) {
          await flushStorage();
          setAuthState({
            user: null,
            token: null,
            authed: false,
            redirectToLogin,
          });
          setLoading(false);
          return;
        }

        jwtDecode(data.token || '');
        setAuthState({...data, redirectToLogin});
      } catch (error) {
        await flushStorage();
        setAuthState({authed: false, token: null, user: null, redirectToLogin});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {loading, user, token, authed, redirectToLogin};
}
