import { AuthCookies } from 'app/const/auth.const';

export const checkAccessSystemNoticeValid = () => {
  const activeCookie = sessionStorage.getItem('activeCookie');
  let isValid = true;

  if (AuthCookies.NORMAL_ACCOUNT !== activeCookie) {
    isValid = false;
  }

  return isValid
}