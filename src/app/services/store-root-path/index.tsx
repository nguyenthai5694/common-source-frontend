
export const storePathNavigation = 'store_navigation_path';
export const routerNav = {}
interface StoreData {
  rootPath: string,
}
export function getPathNavigation(): StoreData | null {
  if (typeof (Storage) === undefined) return;

  let data;

  try {
    data = JSON.parse(sessionStorage.getItem(storePathNavigation));
  } catch (error) { }

  return data || null;
}

export function setPathNavigation(data): void {
  if (typeof (Storage) === 'undefined') return;

  sessionStorage.setItem(storePathNavigation, JSON.stringify(data));
}

export function getQueryStringRootPath(hasQueries = false): string {
  const pathStored = getPathNavigation();

  if (!pathStored && !(pathStored?.rootPath in routerNav)) return ''

  let pathStr: string = ''

  if (pathStored.rootPath === '/') {
    pathStr = '/'
  } else {
    pathStr = pathStored?.rootPath.split('/').filter(Boolean).slice(1).join('/');
  }

  const param = {
    fromTo: pathStr,
  }
  const queryString = new URLSearchParams({ ...param }).toString();

  return queryString ?
    hasQueries ?
      '&' + queryString :
      '?' + queryString :
    '';
}
