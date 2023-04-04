import { RouteData, RouteMiddleware } from 'app/services/route';

/**
 * AuthorGuard is used to check logged in user's authority.
 * @deprecated "Maybe" useless
 */
export class AuthorGuard implements RouteMiddleware {
  process(routeData: RouteData, router): Promise<boolean | string> {
    // console.log('data, router', routeData, router)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
        // resolve('/access-forbidden');
        // resolve(() => <div>access forbidden component</div>)
      }, 0);
    });
  }
}
