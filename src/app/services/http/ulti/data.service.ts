import { addToast } from 'soumu/parts/toast/toast.service';
import { HTTPOptions, SoumuResponse } from '..';

export function limitDataWarning(response: SoumuResponse<any>, options: HTTPOptions) {
  if (response?.meta?.exceeding) {
    if (options?.useMessageLimitFromBE && response?.message) {
      return addToast({
        title: response.message,
        status: 'inValid',
      })
    }
  }
}
