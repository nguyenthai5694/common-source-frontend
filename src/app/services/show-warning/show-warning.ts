import { addToast } from 'soumu/parts/toast/toast.service';

export const handleShowWarning = (self, data: Array<any> = []): void => {
  setTimeout(() => {
    self.isClickButtonSearch && data && !data.length && addToast({ status: 'warn', title: text('DAECE220') });
    self.isClickButtonSearch = false
  }, 0)
}
