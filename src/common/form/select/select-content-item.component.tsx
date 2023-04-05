import React, { MutableRefObject, useEffect, useLayoutEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { ITEM_MIN_HEIGHT } from './select.config';
import { getTopHeight } from './select.helper';

interface SelectContentItemProps {
  mapOptionItem: (...args) => any;
  displayItemsObs: BehaviorSubject<any>;
  spaceObs: BehaviorSubject<any>;
  heightCachedRef: MutableRefObject<any>;
  selectBoxRef: MutableRefObject<any>;
  allOptionsRef: MutableRefObject<any>;
  displayHeightRef: MutableRefObject<any>;
}

export function SelectContentItem(
  {
    mapOptionItem,
    displayItemsObs,
    spaceObs,
    heightCachedRef,
    selectBoxRef,
    allOptionsRef,
    displayHeightRef,
  }: SelectContentItemProps,
) {
  const [items, changeItems] = useState(null);

  useEffect(() => {
    const selectItemSub = displayItemsObs.subscribe(data => {
      changeItems(data);
    });

    return () => selectItemSub.unsubscribe();
  }, [displayItemsObs])

  useLayoutEffect(() => {
    if (!items || !items.length) {
      spaceObs.next([0, 0, 0]);

      return;
    }

    let totalHeight = spaceObs.value[2];
    let totalDisplayHeight = 0;

    const itemsVisibleEl = (selectBoxRef.current as HTMLElement).querySelectorAll('.item-pulldown');

    for (let i = 0; i < itemsVisibleEl.length; i++) {
      const id = `${items[i]['_actualIndex']}`;

      if (heightCachedRef.current[id]) {
        totalDisplayHeight += heightCachedRef.current[id];
        continue;
      }

      const height = itemsVisibleEl[i].clientHeight + 1; // 1: border top of pulldown item

      totalDisplayHeight += height;
      totalHeight = totalHeight - ITEM_MIN_HEIGHT + height;
      heightCachedRef.current[id] = height;
    }

    const topHeight = getTopHeight(allOptionsRef.current, heightCachedRef.current, items[0]['_actualIndex']);
    const bottomHeight = Math.max(0, totalHeight - totalDisplayHeight - topHeight);

    spaceObs.next([topHeight, bottomHeight, totalHeight]);
    displayHeightRef.current = totalDisplayHeight;
    // eslint-disable-next-line
  }, [items])

  return <>{items && !!items.length && items.map(mapOptionItem)}</>
}
