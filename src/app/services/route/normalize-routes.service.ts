import BlankLayout from 'soumu/blocks/layout/blank-layout/blank-layout.component'
import Loading from 'soumu/parts/loading/loading.component'
import { Routes, NormalizedRoute } from 'app/services/route';
import { setRoute } from './route.store'

export function normalizeRoutes(routes: Routes, basePath: string) {
  routes.forEach(route => {
    const normalizedRoute = route as NormalizedRoute;
    const path = (basePath + route.path).replace('//', '/');

    normalizedRoute.fullPath = path;
    route.component = route.component || BlankLayout;
    route.exact = route.exact || false;
    route.fallback = route.fallback || Loading;

    if (route.id) {
      setRoute(route.id, {
        ...route,
        fullPath: path,
      });
    }

    if (route.redirectTo) {
      const redirectToPath = route.redirectTo[0] === '/'
        ? route.redirectTo
        : basePath + route.redirectTo;

      route.redirectTo = redirectToPath;
    }

    if (route.children) {
      route.children = normalizeRoutes(route.children, path + '/');
    }
  });

  return routes as NormalizedRoute[];
}