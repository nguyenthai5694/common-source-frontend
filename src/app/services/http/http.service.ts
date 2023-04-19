import { throwError } from 'rxjs'
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { addToast } from 'common/parts/toast/toast.service';
import { activeCookieHeader } from 'app/const/auth.const';
import { getActiveCookie } from 'app/services/active-cookie'
import { HTTPOptions, SoumuResponse } from 'app/services/http'
import { getCurrentRouteId, getRoute } from 'app/services/route'
import {
  handleError, handleErrorBlob, validateCharactersRequest, catchErrorWithData,
} from './http.util'
import { limitDataWarning } from './ulti/data.service';

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const pageCodeHeader = 'page-code';

class HttpService {
  public send<DataShape>(ajaxRequest: AjaxRequest, options: HTTPOptions = {} as HTTPOptions) {
    if (!validateCharactersRequest(ajaxRequest, options)) return throwError(null);

    ajaxRequest.withCredentials = true;
    ajaxRequest.headers = {
      ...defaultHeaders,
      ...ajaxRequest.headers,
      [activeCookieHeader]: getActiveCookie(),
    };

    return ajax(ajaxRequest).pipe(
      catchError(handleError(options)),

      map<AjaxResponse, SoumuResponse<DataShape>>(res => {
        catchErrorWithData(res);

        // check limit data
        !options.shouldLimitDataManual && limitDataWarning(res.response, options);

        return res.response
      }),
    )
  }

  public upload<DataShape>(ajaxRequest: AjaxRequest, options: HTTPOptions = {} as HTTPOptions) {
    ajaxRequest.withCredentials = true;

    const route = getRoute(getCurrentRouteId());

    ajaxRequest.headers = {
      ...ajaxRequest.headers,
      [activeCookieHeader]: getActiveCookie(),
    };

    if (route && route.data && route.data.pageCode) {
      ajaxRequest.headers[pageCodeHeader] = route.data.pageCode;
    }

    return ajax(ajaxRequest).pipe(
      catchError(handleError(options)),
      map<AjaxResponse, SoumuResponse<DataShape>>(res => {
        const { response } = res;

        if (response?.message && response?.type === 'warn') {
          addToast({
            title: response.message,
            status: 'warning',
          })
        }

        return response;
      }),
    );
  }

  /**
   * Download file and check sum.
   */
  public export(
    ajaxRequest: AjaxRequest,
    options: HTTPOptions = { isSaved: true } as HTTPOptions,
  ) {
    ajaxRequest.withCredentials = true;
    ajaxRequest.responseType = 'blob';
    ajaxRequest.headers = {
      ...defaultHeaders,
      ...ajaxRequest.headers,
      [activeCookieHeader]: getActiveCookie(),
    };

    const route = getRoute(getCurrentRouteId());

    if (route && route.data && route.data.pageCode) {
      ajaxRequest.headers[pageCodeHeader] = route.data.pageCode;
    }

    return ajax(ajaxRequest).pipe(
      mergeMap(async (res) => {
        // Exist error with export
        if (options.isCheckMsgHeader) {
          const msgKeyError = res.xhr.getResponseHeader('X-Msg-Error') || '';

          !!msgKeyError && addToast({ title: text(msgKeyError as any), status: 'warning' });
        }

        return res
      }),
      catchError(handleErrorBlob(options)),
    );
  }

  public get<DataShape>(url: string, options: HTTPOptions = {} as HTTPOptions) {
    if (!validateCharactersRequest(url)) return throwError(null);

    return this.send<DataShape>({
      url,
      method: 'GET',
    }, options);
  }
}

/**
 * Instance of HttpService
 */
export const http = new HttpService();
