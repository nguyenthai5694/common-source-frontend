/**
 * Standard meta response from web service
 */
export interface ResponseMeta {
  total: number;
  pageNum: number;
  pageSize: number;
  [k: string]: any;
  realTotal: number;
}

/**
 * Standard response from web service
 */
export interface SoumuResponse<DataShape> {
  type?: 'ok' | 'info' | 'warn' | 'error';
  message?: string;
  code: '0' | string;
  data: DataShape;
  meta?: ResponseMeta;
  // ...
  init?: any;
  kaisoList?: any
}

export type CustomErrorOption = 'throwOnly' | 'notifyOnly' | 'throwAndNotify' | 'throwAndNotifyFromMIM';

export interface HTTPOptions {
  /**
   * Available options:
   * - 'throwOnly': Client will handle error.
   * - 'notifyOnly': Error will be handled by http service. For now, it will display error message as toast.
   * - 'throwAndNotify': Client will handle error, http service will display error message as toast.
   *
   * Default: 'notifyOnly'
   *
   * TODO: use 'throwAndNotify' as default value.
   */
  customError: CustomErrorOption;

  /**
   * Custom file name for exporting file. If this value is not provided,
   * file name will be get from API header(content-disposition).
   *
   * Usage:
   * ```ts
   * import { http } from 'app/services/http'
   * http.export(
   *  {
   *    method: 'POST', // GET, DELETE, ... any
   *    url: '...',
   *  },
   *  {
   *    fileName: 'yourCustomFileName.txt'
   *  },
   * ).subcribe();
   * ```
   */
  fileName?: string;

  /**
   * Flag to check to save file or not
   * default value : true
   * * Usage:
   * ```ts
   * import { http } from 'app/services/http'
   * http.export(
   *  {
   *    method: 'POST', // GET, DELETE, ... any
   *    url: '...',
   *  },
   *  {
   *    isSaved: false
   *  },
   * ).subcribe();
   */
  isSaved?: boolean;

  /**
   * Type of file not to download
   *
   * * Usage:
   * ```ts
   * import { http } from 'app/services/http'
   * http.export(
   *  {
   *    method: 'POST', // GET, DELETE, ... any
   *    url: '...',
   *  },
   *  {
   *    invalidSaveType: 'pdf'
   *  },
   * ).subcribe();
   */
  invalidSaveType?: string;

  /**
   * Flag to check if the dev wants to handle data limiting manually
   */
  shouldLimitDataManual?: boolean;

  /**
   * If it's true, it will display the message check limit data from response.message
   */
  useMessageLimitFromBE?: boolean

  /**
   * If it's true, it will display the message follow task #173289
   */
  useTypeCustomMessage?: boolean;

  /**
   * Use it when you has custom kanCode. follow task #176382
   */

  useCustomM90Kancode?: string;

  /**
   * Use it when you want to ignore validate special character
   */

  nonValidateChar?: boolean

  /**
   * Check msg key error with header response
   */
  isCheckMsgHeader?: boolean;
}

/**
 * type 'warn' of response
 */
export const RESPONSE_ERROR = 'error';
