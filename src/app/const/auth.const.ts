export enum AuthCookies {
  NORMAL_ACCOUNT = 'FD_NinshoSessionID',

  /** 内閣府　RS確認・廃棄協議 */
  CABINET_OFFICE_DISPOSAL_CONSULTATION = 'FD_NCustomSessionCAO1',

  /** 国立公文書館　RS確認・廃棄協議 */
  NATIONAL_ARCHIVES_DISPOSAL_CONSULTATION = 'FD_NCustomSessionNAJ1',

  /** 国立公文書館　移管受領 */
  NATIONAL_ARCHIVES_OF_JAPAN_TRANSFER_RECEIPT = 'FD_NCustomSessionNAJ2',
}

export const validAuthCookies = Object.values(AuthCookies);

export const activeCookieHeader = 'activeCookie';

/*
 * Path end of url cookie source auth
 */
export enum CookieSource {
  CAO1 = '/eAccess/FD_Ninsho/CAO1/',
  NAJ1 = '/eAccess/FD_Ninsho/NAJ1/',
  NAJ2 = '/eAccess/FD_Ninsho/NAJ2/',
  COMMON = '/eAccess/FD_Ninsho/',
}

export const E_ACCESS_PATH_AUTH = '/eAccess/FD_Ninsho';
