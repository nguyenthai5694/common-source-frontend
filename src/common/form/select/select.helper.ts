import { ITEM_MIN_HEIGHT } from './select.config'

export function getTopHeight(
  allItems: any[],
  heightCached,
  firstId,
) {
  let topHeight = 0;

  for (let i = 0; i < allItems.length; i++) {
    const currentItem = allItems[i];
    const currentId = currentItem['_actualIndex'];

    if (currentId === firstId) {
      return topHeight;
    }

    topHeight += heightCached[currentId]
      ? heightCached[currentId]
      : ITEM_MIN_HEIGHT;
  }
}

export function getCurrentDisplayIndex(
  scrollTop: number,
  allItems: any[],
  heightCached,
) {
  let tmpTopHeight = 0;

  for (let i = 0; i < allItems.length; i++) {
    const currentItem = allItems[i];
    const currentId = currentItem['_actualIndex'];

    if (scrollTop <= tmpTopHeight) {
      return i;
    }

    tmpTopHeight += heightCached[currentId]
      ? heightCached[currentId]
      : ITEM_MIN_HEIGHT;
  }
}
