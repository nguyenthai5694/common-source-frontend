import { Route } from './route.type'

interface RouteData extends Route {
  fullPath: string;
}

/**
 * DO NOT export this variable
 */
const _store: { [key: string]: RouteData } = {};

/**
 * Get route config by ID
 */
export function getRoute(id: string) {
  return _store[id];
}

/**
 * Given:
 * {
 *   id: 'shiko',
 *   path: 'shiko/:bunsyoNo',
 *   exact: true,
 *   component: any,
 * }
 * 
 * When:
 * getFullPath('shiko', { bunsyoNo: 123 }, { ping: 'pong' })
 * 
 * Then:
 * you have "/dae/shiko/123?ping=pong"
 */
export function getFullPath(
  /**
   * Route ID.
   */
  id: string,

  /**
   * Route params.
   */
  params?: { [key: string]: string | number },

  /**
   * Route query.
   */
  query?: { [key: string]: string | number },
) {
  const routeCnf = getRoute(id);
  let { fullPath } = routeCnf;

  if (params) {
    Object.keys(params).forEach(key => {
      fullPath = fullPath.replace(`:${key}`, params[key] as string);
    });
  }

  if (query) {
    const queryStr = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key])}`)
      .join('&');

    fullPath += `?${queryStr}`
  }

  return fullPath;
}

export function setRoute(id: string, routeData: RouteData) {
  _store[id] = routeData;
}

let currentRouteId;

export function setCurrentRouteId(id) {
  currentRouteId = id;
}

export function getCurrentRouteId() {
  return currentRouteId;
}