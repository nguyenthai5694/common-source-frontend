import { addToast } from 'soumu/parts/toast/toast.service';
import { MIM_MESSAGE } from 'app/const/mim.const';

// Used for SC013902, SC021401
export const checkStatusPerform = (status: number, screenName: string) => {
  let isOk = true;

  switch (status) {
    case 0:
    case -1:
      addToast({ title: MIM_MESSAGE.ERROR.CHECK_STATUS(screenName), status: 'inValid' });
      isOk = false;
      break;
    case 2:
      addToast({ title: MIM_MESSAGE.ERROR.CHECK_REGIST(screenName), status: 'inValid' });
      isOk = false;
      break;
    default:
      break;
  }

  return isOk;
};
