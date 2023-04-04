import { AuthCookies, validAuthCookies, activeCookieHeader, CookieSource } from 'app/const/auth.const';
import { getCookie } from 'app/services/cookie'
import { rsConfirm, rsHaiki, rsTransfer } from './special-path.const';

// TODO handle add referrerSwitchDepartment for case switch department (need update late)
const referrerSwitchDepartment = 'gamenKbn=FD_NSelectAuthLogoutAll';
let isSettedActiveCookie = false;

export function getActiveCookie() {
  const activeCookie = sessionStorage.getItem(activeCookieHeader);

  if (!_.includes(validAuthCookies, activeCookie)) {
    // Update active cookie if not exist
    return handleGetActiveCookie();
  }

  // FAKE for development
  // if (window.location.search === '?CC=FD_NCustomSessionNAJ2') {
  //   return 'FD_NCustomSessionNAJ2';
  // }

  if (window) window.__active_cookie__ = `${activeCookie}_`;

  return activeCookie;
}

/**
 * Set active cookie base on path.
 */
export function setActiveCookie(path: string) {
  const referrer = document.referrer;
  const isMatchRefer = (cookieSource) => {
    return (referrer.lastIndexOf(cookieSource) === referrer.length - cookieSource.length) ||
      (referrer.includes(cookieSource + referrerSwitchDepartment));
  }

  if (
    referrer && !isSettedActiveCookie &&
    (
      isMatchRefer(CookieSource.CAO1) ||
      isMatchRefer(CookieSource.NAJ1) ||
      isMatchRefer(CookieSource.NAJ2) ||
      isMatchRefer(CookieSource.COMMON)
    )
  ) {
    const activeCookie = specifyActiveCookie(path);

    isSettedActiveCookie = true;
    sessionStorage.setItem(activeCookieHeader, activeCookie);
  }
}

/////////////// TMP SMOKE (Delete late) ---------------------------------
// NEED change function name _setActiveCookie
export function _setActiveCookie(path: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const activeCC = urlParams.get('CC');

  if (activeCC && !isSettedActiveCookie) {
    isSettedActiveCookie = true;
    sessionStorage.setItem(activeCookieHeader, activeCC);
  }
}
/////////////// END SMOKE ------------------------------------------------

function specifyActiveCookie(path) {
  let newPath = path;

  if (path && (path as string).lastIndexOf('/') === path.length - 1) {
    newPath = path.substr(0, path.length - 1)
  }

  if (_.includes(rsConfirm, newPath)) {
    return getDisposalConsultationCookie();
  }

  if (_.includes(rsHaiki, newPath)) {
    return getDisposalConsultationCookie();
  }

  if (_.includes(rsTransfer, newPath)) {
    return AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT;
  }

  // fallback: COMMONログイン(~ common login).
  return AuthCookies.NORMAL_ACCOUNT;
}

function getDisposalConsultationCookie() {
  if (getCookie(AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION)) {
    return AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION;
  }

  return AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION;
}

function handleGetActiveCookie() {
  let authCookie = '';

  const cookieType = specifyActiveCookie(window.location.pathname);

  if (
    getCookie(AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT) &&
    cookieType === AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT
  ) {
    authCookie = AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT;
  }

  if (
    getCookie(AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION) &&
    cookieType === AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION
  ) {
    authCookie = AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION;
  }

  if (
    getCookie(AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION) &&
    cookieType === AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION
  ) {
    authCookie = AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION;
  }

  if (getCookie(AuthCookies.NORMAL_ACCOUNT) && (cookieType === AuthCookies.NORMAL_ACCOUNT || !authCookie)) {
    authCookie = AuthCookies.NORMAL_ACCOUNT;
  }

  // FAKE for development
  // if (window.location.search === '?CC=FD_NCustomSessionNAJ2') {
  //   authCookie = 'FD_NCustomSessionNAJ2';
  // }

  // Check exist valid cookie
  if (authCookie) {
    // Stored cookie new first tab
    sessionStorage.setItem(activeCookieHeader, authCookie);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isViewOnlyMode = urlParams.get('viewMode') === 'true';

  if (isViewOnlyMode) {
    // get active cookie high priority query url
    const activeCookieExist = urlParams.get('activeCookie');

    if (activeCookieExist) return activeCookieExist;

    if (authCookie) return authCookie;

    if (getCookie(AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT)) {
      return AuthCookies.NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT;
    }

    if (getCookie(AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION)) {
      return AuthCookies.NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION;
    }

    if (getCookie(AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION)) {
      return AuthCookies.CABINET_OFFICE_DISPOSAL_CONSULTATION;
    }

    return AuthCookies.NORMAL_ACCOUNT;
  }

  return authCookie;
}
