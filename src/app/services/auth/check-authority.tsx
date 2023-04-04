
export const AUTHORITY_MANAGER_CODES_10 = '10';
export const AUTHORITY_MANAGER_CODES_15 = '15';
export const AUTHORITY_MANAGER_CODES_11 = '11';
export const AUTHORITY_MANAGER_CODES_12 = '12';
export const AUTHORITY_MANAGER_CODES_13 = '13';
export const AUTHORITY_MANAGER_CODES_14 = '14';
export const AUTHORITY_MANAGER_CODES_20 = '20';
export const AUTHORITY_MANAGER_CODES_21 = '21';
export const AUTHORITY_MANAGER_CODES_22 = '22';
export const AUTHORITY_MANAGER_CODES_23 = '23';
export const AUTHORITY_MANAGER_CODES_30 = '30';
export const AUTHORITY_MANAGER_CODES_31 = '31';
export const AUTHORITY_MANAGER_CODES_40 = '40';
export const AUTHORITY_MANAGER_CODES_50 = '50';
export const AUTHORITY_MANAGER_CODES_51 = '51';
export const AUTHORITY_MANAGER_CODES_80 = '80';
export const AUTHORITY_MANAGER_CODES_81 = '81';
export const AUTHORITY_MANAGER_CODES_82 = '82';
export const AUTHORITY_MANAGER_CODES_83 = '83';
export const AUTHORITY_MANAGER_CODES_90 = '90';
export const AUTHORITY_MANAGER_CODES_91 = '91';
export const AUTHORITY_MANAGER_CODES_100 = '100';
export const AUTHORITY_MANAGER_CODES_101 = '101';

export const AUTHORITY_MANAGER_CODES_82_CAO1 = '82(cao1)'
export const AUTHORITY_MANAGER_CODES_82_NAJ1 = '82(naj1)';

const user = {} as any;

export function checkAuthority(authority: any[]) {
  let check = false;

  if (authority.length !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user.hoshokuCodes && user.hoshokuCodes.forEach((item) => {
      if (authority.indexOf(item) !== -1) {
        check = true;
      }
    });
  }

  return check;
}

export function getAuthorityManager82() {
  const checkUser = checkAuthority([AUTHORITY_MANAGER_CODES_82]);
  let userAuthority = '';

  if (checkUser) {
    if (user.userId.indexOf('cao1') !== -1) {
      userAuthority = AUTHORITY_MANAGER_CODES_82_CAO1;
    } else {
      userAuthority = AUTHORITY_MANAGER_CODES_82_NAJ1;
    }
  }

  return userAuthority;
}
