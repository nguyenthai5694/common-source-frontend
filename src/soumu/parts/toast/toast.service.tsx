import { BehaviorSubject } from 'rxjs'
import { formikFormControlErrors } from 'soumu/form';
import { routeChangeSubject } from 'app/services/route';
import { ToastData, ToastOpts, ToastSubject } from './toast.type'

let toastId = 0;

export const toast$ = new BehaviorSubject<ToastSubject>({
  toasts: [],
});

export function addToast({
  title,
  html,
  link,
  linkText,
  status = 'valid',
  duration = 6000,
  type,
  totalItemsFormError = 0,
  removeOnNextNavigating = true,
}: ToastOpts) {
  toastId++;
  const toasts = toast$.getValue().toasts;
  const id = toastId;

  const newToast: ToastData = {
    id,
    title,
    html,
    link,
    linkText,
    status,
    type,
    removeOnNextNavigating,
    totalItemsFormError: totalItemsFormError ?? formikFormControlErrors,
  };

  toast$.next({
    toasts: [
      ...toasts,
      newToast,
    ],
  });

  // if (duration !== 0) {
  //   setTimeout(() => {
  //     removeToast(id);
  //   }, duration)
  // }

  return newToast;
}

export function removeToast(toastId: number) {
  const toasts = toast$.getValue().toasts;

  toast$.next({ toasts: toasts.filter((toast) => toast.id !== toastId) });
}

export function toastWithSameTypeExist(type) {
  const { toasts } = toast$.getValue();

  return !!toasts.find(toast => toast.type === type);
}

export function removeToastByType(type) {
  const { toasts } = toast$.getValue();

  toast$.next({
    toasts: toasts.filter(toast => toast.type !== type),
  });
}

export function clearAllToast() {
  toast$.next({ toasts: [] });
}

/**
 * Clear all toasts after route changed.
 */
routeChangeSubject.subscribe(() => {
  const { toasts } = toast$.getValue();
  const newToasts = toasts
    .filter(toast => !toast.removeOnNextNavigating && !toast.shouldRemoveNextNavigating)
    .map(toast => {
      toast.shouldRemoveNextNavigating = true;

      return toast;
    });

  toast$.next({ toasts: newToasts });
});
