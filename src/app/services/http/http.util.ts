import { throwError, NEVER, Observable } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { addToast } from 'soumu/parts/toast/toast.service'
import { rootHistory, replaceUrl } from 'app/services/route'
import { SoumuResponse } from '.'
import { HTTPOptions, RESPONSE_ERROR } from './http.type'

export function displayError(response) {
  if (!response) {
    addToast({ title: text('ERROR_NETWORK_CONNECTION'), status: 'inValid' });

    return;
  }

  addToast({ title: response.message || text('ERROR_UNEXPECTED'), status: 'inValid' });
}

export const handleError = (options: HTTPOptions) => (error: AjaxResponse) => {
  const { response } = error;

  if (error.status === 403) {
    const prevUrl = window.location.pathname + window.location.search;

    rootHistory.replace('/auth/forbidden');
    replaceUrl(prevUrl);

    return NEVER;
  }

  if (options.customError === 'throwOnly') {
    return throwError(response);
  }

  if (options.customError === 'throwAndNotify') {
    displayError(response);

    return throwError(response);
  }

  if (options.customError === 'throwAndNotifyFromMIM') {
    if (error.response.code !== 'GENCE034') {
      displayError(response);
    }

    return throwError(response);
  }

  displayError(response);

  return NEVER;
}

export const handleErrorBlob = (options: HTTPOptions) => (error: AjaxResponse) => {
  if (!error?.response) {
    const errorNetwork = {
      response: {
        message: text('ERROR_NETWORK_CONNECTION'),
      },
    } as AjaxResponse;

    return handleError(options)(errorNetwork);
  }

  if (error?.response?.message) {
    return handleError(options)(error);
  }

  const reader = new FileReader();
  const obs = new Observable((observer) => {
    reader.onloadend = () => {
      try {
        error.response = JSON.parse(reader.result as string);
      } catch (parseErr) {
        observer.error(parseErr);

        return;
      }

      observer.error(error);
    }
  });

  reader.readAsText(error.response);

  return obs.pipe(catchError(handleError(options)));
}

/**
 * Util function to parse list of data items from web service response:
 *
 * ```ts
 * //// Given:
 * // JSON response from web service:
 * {
 *   type: null,
 *   code: 0,
 *   message: null,
 *   data: [
 *     { title: 'lorem 1', content: 'any content', publishDate: 98979789789789 },
 *     { title: 'lorem 2', content: 'any content', publishDate: 98979789283289 }
 *   ],
 *   meta: {
 *     totalItems: 10
 *   }
 * }
 *
 * // Data model:
 * export interface Post {
 *   title: string;
 *   content: string;
 *   publishDate: Date;
 * }
 *
 * export class Post extends DataModel {
 *   constructor(data) {
 *     super(data);
 *     this.publishDate = new Date(data.publishDate);
 *   }
 * }
 *
 * //// WHEN:
 * // Running parseDataList(Post)
 *
 * //// THEN:
 * // Response will become:
 * {
 *   type: null,
 *   code: 0,
 *   message: null,
 *   data: [
 *     Post,
 *     Post
 *   ],
 *   meta: {
 *     totalItems: 10
 *   }
 * }
 * ```
 * _(For more information about mapping data, please refer to C.5)_
 */
export const parseDataList = <T>(DataShape: { new(...args: any[]): T }) => map((res: SoumuResponse<T[]>) => {
  res.data = res.data.map(
    (dataItem, index) => new DataShape(dataItem, index),
  );

  return res;
});

/**
 * Util function to parse data item from web service response.
 * _(For more information about mapping data, please refer to C.5)_
 */
export const parseDataItem = <T>(DataShape: { new(data: any): T }) => map((res: SoumuResponse<T>) => {
  res.data = new DataShape(res.data);

  return res;
});

/**
 * Extract file name from content-disposition header.
 */
export function extractFileName(res: AjaxResponse) {
  const contentDiposition = res.xhr.getResponseHeader('content-disposition') as string;
  const startRmIndex = contentDiposition.indexOf('filename=') + 9;
  const rawFileName = contentDiposition.slice(startRmIndex, contentDiposition.length);

  return decodeURIComponent(rawFileName);
}

/**
 * Filter characters denied
 */
export const validateCharactersRequest = (request: any, options?: HTTPOptions): boolean => {
  return true;
}

export const catchErrorWithData = (res: AjaxResponse) => {
  if (res?.response?.type === RESPONSE_ERROR && res?.response?.message) {
    addToast({ status: 'inValid', title: res.response.message });
  }
}
