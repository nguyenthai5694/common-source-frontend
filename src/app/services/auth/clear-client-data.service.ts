import { removeAllCookies } from 'app/services/cookie';

export function clearClientData(excludeCookies) {
  removeAllCookies(excludeCookies);
  sessionStorage.clear();
  localStorage.clear();
}
