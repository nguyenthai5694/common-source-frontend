import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { BehaviorSubject } from 'rxjs';
import { AbsLoading } from 'soumu/parts/loading';
import { BottomSpaceMemo } from './bottom-space.component';
import { SelectContentItem } from './select-content-item.component';
import { ITEM_MIN_HEIGHT, ITEMS_VISIBLE, ITEMS_TOLERANCE, DEBOUNCE_TIMER } from './select.config';
import { getCurrentDisplayIndex } from './select.helper';
import { TopSpaceMemo } from './top-space.component';

const bufferedItems = ITEMS_VISIBLE + 2 * ITEMS_TOLERANCE;

interface SelectContentProps {
  children: any;
  isSelecting: boolean;
  width: number | string;
  selectBoxRef: MutableRefObject<any>;
  filteredOption: Array<any>;
  mapOptionItem: (...args) => any;
  fromToRef: MutableRefObject<any>;
  isLoading: boolean;

}

export function SelectContent(
  {
    children,
    isSelecting,
    width,
    selectBoxRef,
    filteredOption,
    mapOptionItem,
    fromToRef,
    isLoading,
  }: SelectContentProps,
) {
  const debounceRef = useRef(null);
  const allOptionsRef = useRef([]);
  const prevScrollTopRef = useRef(0);
  // const fromToRef = useRef([0, 0]);
  const displayHeightRef = useRef(0);
  const spaceObs = useMemo(() => new BehaviorSubject([0, 0, 0]), []);
  const displayItemsObs = useMemo(() => new BehaviorSubject([]), []);
  const heightCachedRef = useRef({});
  const filteredOptionRef = useRef([]);

  useEffect(() => {
    if (_.isEqual(filteredOption, filteredOptionRef.current)) return;

    filteredOptionRef.current = filteredOption;
    prevScrollTopRef.current = 0;
    heightCachedRef.current = {};
    fromToRef.current = [0, bufferedItems];
    spaceObs.next([
      0,
      (filteredOption.length - bufferedItems) * ITEM_MIN_HEIGHT,
      filteredOption.length * ITEM_MIN_HEIGHT,
    ]);
    allOptionsRef.current = [...filteredOption].map((item, index) => ({ ...item, _actualIndex: index }));
    displayItemsObs.next(allOptionsRef.current.slice(0, bufferedItems));
    // eslint-disable-next-line
  }, [filteredOption])

  const runScroller = useCallback(e => {
    if (!e?.target) return;

    const { scrollTop } = e.target;

    const handleScroll = () => {
      const allOptions = allOptionsRef.current;
      const totalItems = allOptions.length;
      const [topHeight] = spaceObs.value;
      const isUp = scrollTop < prevScrollTopRef.current;
      const [prevFromItem, prevToItem] = fromToRef.current;

      let minTopPrevent = Math.max(0, topHeight + (displayHeightRef.current / 3));
      let maxBottomPrevent = topHeight + (displayHeightRef.current * 2 / 3);
      let newItems = 0;

      if (isUp) {
        if (scrollTop >= topHeight && scrollTop < topHeight + displayHeightRef.current) {
          newItems = prevFromItem - ITEMS_TOLERANCE;
        } else {
          const currentDisplayIndex = getCurrentDisplayIndex(scrollTop, allOptions, heightCachedRef.current) + 1;

          newItems = (Math.floor(currentDisplayIndex / ITEMS_VISIBLE) * ITEMS_VISIBLE) - ITEMS_TOLERANCE;
        }
      } else {
        if (scrollTop < topHeight + displayHeightRef.current) {
          newItems = prevFromItem + ITEMS_TOLERANCE;
        } else {
          const currentDisplayIndex = getCurrentDisplayIndex(scrollTop, allOptions, heightCachedRef.current) + 1;

          newItems = (Math.floor(currentDisplayIndex / ITEMS_VISIBLE) * ITEMS_VISIBLE);
        }

        if (newItems > totalItems - ITEMS_TOLERANCE) {
          newItems = totalItems - ITEMS_TOLERANCE;
        }
      }

      prevScrollTopRef.current = scrollTop;

      if (
        (!isUp && (scrollTop < maxBottomPrevent || prevToItem === totalItems)) ||
        (isUp && scrollTop > minTopPrevent)
      ) return;

      let fromItem = scrollTop < (displayHeightRef.current / 2) ? 0 : newItems;
      let toItem = scrollTop < (displayHeightRef.current / 2) ? bufferedItems : fromItem + bufferedItems;

      toItem = Math.min(toItem, totalItems)
      displayItemsObs.next(allOptions.slice(fromItem, toItem))
      fromToRef.current = [fromItem, toItem];
    }

    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(handleScroll, DEBOUNCE_TIMER);
  }, [displayItemsObs, spaceObs.value, fromToRef])

  return (
    <ul
      className={clsx('p-select__options', { '-show': isSelecting })}
      style={{ width }}
      ref={selectBoxRef}
      onScroll={runScroller}
    >
      {isLoading && (
        <li className='item-pulldown-loading'>
          <AbsLoading />
        </li>
      )}

      {!isLoading && (
        <>
          {children}

          <TopSpaceMemo spaceObs={spaceObs} />

          <SelectContentItem
            mapOptionItem={mapOptionItem}
            displayItemsObs={displayItemsObs}
            spaceObs={spaceObs}
            heightCachedRef={heightCachedRef}
            selectBoxRef={selectBoxRef}
            allOptionsRef={allOptionsRef}
            displayHeightRef={displayHeightRef}
          />

          <BottomSpaceMemo spaceObs={spaceObs} />
        </>
      )}

    </ul>
  )
}
