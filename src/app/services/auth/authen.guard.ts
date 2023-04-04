import { RECOVERY_PREV_PATH, USE_DUMMY_LOGIN } from 'app/const/env.const';
import { RouteMiddleware } from 'app/services/route';
import { isLoggedIn } from './';
import { isLogoutNormal } from './logout.service';

/**
 * AuthenGuard is used to prevent user who is not logged in access protected page.
 */
export class AuthenGuard implements RouteMiddleware {
  process(): boolean | string {
    if (isLoggedIn()) {
      return true;
    }

    try { localStorage.clear(); } catch (e) { }

    if (!isLogoutNormal()) {
      const prevPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      sessionStorage.setItem(RECOVERY_PREV_PATH, prevPath);
    }

    if (USE_DUMMY_LOGIN) return '/auth/login';

    // Make sure url_back saved, then redirect to login page
    setTimeout(() => {
      // const urlParams = new URLSearchParams(window.location.search);
      // const preApiUri = urlParams.get('preApiUri') || '';

      window.location.href = '/auth/login';
    })
  }
}
