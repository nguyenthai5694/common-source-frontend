import { ComponentType } from 'react';
import { Route } from 'app/services/route';

export async function runMiddleware(route: Route, routerProps): Promise<boolean | ComponentType | string> {
  for (let i = 0; i < route.middlewares.length; i++) {
    const shouldRunNext = await new route.middlewares[i]().process(
      route.data || {},
      routerProps,
    );

    if (shouldRunNext === true) {
      continue;
    }

    return shouldRunNext;
  }

  return true;
}
