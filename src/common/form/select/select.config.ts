import { isIE } from 'app/services/navigator';

export const ITEM_MIN_HEIGHT = 32;
export const ITEMS_VISIBLE = 10;
export const ITEMS_TOLERANCE = 12;
export const DEBOUNCE_TIMER = isIE ? 120 : 20;
