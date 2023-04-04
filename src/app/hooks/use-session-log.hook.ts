import { useEffect } from 'react';
import { isLoggedIn } from 'app/services/auth';

/**
 * Send request to log user login session in frontend, ok ok ok :V
 * 
 * NOTE: In production, there is no need to listen for route change
 * to send request for logging user session. This is because eAccess
 * and soumu are 2 different sites. So this `useEffect` will always
 * run when redirecting from eAccess.
 */
export function useSessionLog() {
  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }

    if (localStorage.getItem('sessionLogged')) {
      return;
    }
  }, []);
}