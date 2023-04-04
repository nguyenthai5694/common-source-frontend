import { validAuthCookies } from 'app/const/auth.const';
import { getCookie } from 'app/services/cookie';

export function isLoggedIn() {
  for (let i = 0; i < validAuthCookies.length; i++) {
    const authCookieName = validAuthCookies[i];
    const authCookie = getCookie(authCookieName);

    if (authCookie) return true;
  }

  return false;
}