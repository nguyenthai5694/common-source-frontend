import { ComponentType, LazyExoticComponent } from 'react';

export interface RouteData {
  pageCode?: string;
  [key: string]: any,
}

export interface RouteMiddleware {
  /**
   * - boolean:
   *  * true: allow to run next middleware
   *  * false: stop middleware pipeline. **NOTE**: this value may be removed in the future.
   * - ComponentType: a component to render error information.
   * - string: string will be treated as url for redirecting on failure.
   */
  process: (routeData: RouteData, routerData: any) =>
    boolean | ComponentType | string | Promise<boolean | ComponentType | string>;
}

export type RouteMiddlewareClass = { new(): RouteMiddleware };

export interface Route {
  /**
   * Unique route identifier.
   * 
   * Note: You can use any unique string for ID but once it is created, for consistency, DO NOT modify it.
   * 
   * Sample usage: use id to get route config.
   * ```ts
   * import { getRoute } from 'app/services/route'
   * 
   * getRoute('your route id');
   * ```
   */
  id?: string;

  path: string;

  exact?: boolean;

  /**
   * Example:
   * ```ts
   * // don't have '/' as prefix
   * 'login' => '/auth/login' // (If parent path is '/auth')
   * 
   * // has '/' as prefix
   * '/login' => '/login'
   * ```
   */
  redirectTo?: string;

  /**
   * Data will be passed into middleware as argument for `process(routeData, router)`.
   * It is also useful for configuring data that only relevant to this route.
   * 
   * Sample usage: get route data with `getRoute`.
   * ```ts
   * import { getRoute } from 'app/services/route'
   * 
   * getRoute('your route id').data;
   * ```
   */
  data?: RouteData;

  middlewares?: RouteMiddlewareClass[];

  /**
   * Default: BlankLayout
   */
  component?: ComponentType | LazyExoticComponent<any>;

  fallback?: ComponentType;

  children?: Route[];
}

export interface NormalizedRoute extends Route {
  fullPath: string;

  exact: boolean;

  children?: NormalizedRoute[];

  component: ComponentType | LazyExoticComponent<any>;

  fallback: ComponentType;
}

export type Routes = Route[];