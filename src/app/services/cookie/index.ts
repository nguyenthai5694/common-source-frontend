import { BASE_DOMAIN } from 'app/const/env.const'

export function getCookie(name) {
  // const nameEQ = name + '=';
  // const listCookies = document.cookie.split(';');

  // for (let i = 0; i < listCookies.length; i++) {
  //   var c = listCookies[i];

  //   while (c.charAt(0) === ' ')
  //     c = c.substring(1, c.length);

  //   if (c.indexOf(nameEQ) === 0)
  //     return c.substring(nameEQ.length, c.length);
  // }
  const cookie = window.localStorage.getItem('token')

  return cookie || null;
}

/**
 * @see https://stackoverflow.com/a/44945595
 */
export function removeAllCookies(excludes: Array<string> = []) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const spcook = cookies[i].split('=');

    !excludes.includes(spcook[0].trim()) && deleteCookie(spcook[0]);
  }
}

export function deleteCookie(cookieName) {
  // Fix ie: use fixed expire date instead of dynamic
  document.cookie = `${cookieName}=;expires=Sat Jan 01 00:00:00 2000; domain=${BASE_DOMAIN}; path=/`;

  // Current document location
  document.cookie = `${cookieName}=;expires=Sat Jan 01 00:00:00 2000`;
  document.cookie = `${cookieName}=;expires=Sat Jan 01 00:00:00 2000; path=/`;
}

export function replaceCookie(cookieName, cookieValue) {
  const date = new Date();

  date.setTime(date.getTime() + (10 * 60 * 1000));

  document.cookie = `${cookieName}=${cookieValue};expires=${date}; domain=${BASE_DOMAIN}; path=/`;
}
