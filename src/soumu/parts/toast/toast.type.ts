export type ToastStatus = 'valid' | 'inValid' | 'warn';

export interface ToastItemProps {
  status: ToastStatus;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ToastSubject {
  toasts: ToastData[]
}

export interface ToastData {
  id: number;

  title: string;

  link?: string,

  linkText?: string,

  /**
   * Default: 'valid'
   */
  status: ToastStatus,

  type?: string;

  /**
   * Pass html
   */
  html?: string,

  /**
   * This flag will help you keep displaying toast of previous page.
   * - true: automatically remove toast when route changed.
   * - false: keep displaying toast when route changed(1 time),
   */
  removeOnNextNavigating: boolean;

  /**
   * Related to `removeOnNextNavigating`.
   */
  shouldRemoveNextNavigating?: boolean;

  /**
   * get total item error in form submit
   */
  totalItemsFormError?: number;
}

export interface ToastOpts {
  title: string;

  link?: string,

  linkText?: string,

  /**
   * Default: 'valid'
   */
  status?: ToastStatus,

  /**
   * Type ~ category: group of toast with same content.
   */
  type?: string;

  /**
   * Duration in milisecond.
   * If duration = 0 then toast will last forever.
   *
   * Default: 6000
   * @deprecated useless now
   */
  duration?: number,

  /**
   * Pass html
   */
  html?: string,

  /**
   * This flag will help you keep displaying toast of previous page.
   * - true: automatically remove toast when route changed.
   * - false: keep displaying toast when route changed(1 time),
   *
   * Default: true.
   */
  removeOnNextNavigating?: boolean;

  /**
   * get total item error in form submit
   */
  totalItemsFormError?: number;
}
