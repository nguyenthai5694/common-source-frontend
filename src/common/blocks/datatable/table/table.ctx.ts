import React, { MutableRefObject } from 'react';
import { BehaviorSubject } from 'rxjs';

interface TableContextProps {
  dragIdxSubject: BehaviorSubject<number>;
  startDragIdx: MutableRefObject<number>;
  currentDragIdx: MutableRefObject<number>;
  prevAction: MutableRefObject<'up' | 'down' | undefined>;
}

/**
 * NOTE: `TableContext` contain only values that will be updated together or fixed.
 * DO NOT add other group of prop to this context.
 */
export const TableContext = React.createContext<TableContextProps>(undefined);
