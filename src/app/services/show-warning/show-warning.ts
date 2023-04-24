import { addToast } from 'common/parts/toast/toast.service';

export const handleShowWarning = (self, data: Array<any> = []): void => {
  setTimeout(() => {
    self.isClickButtonSearch && data && !data.length && addToast({ status: 'warning', title: 'Warnning' });
    self.isClickButtonSearch = false
  }, 0)
}
