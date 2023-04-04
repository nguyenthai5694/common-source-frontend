import React, { useContext, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Subject, Subscriber } from 'rxjs';
import { ColumnsConfig } from '../datatable.type';
import { Cell } from './cell.component'
import { TableContext } from './table.ctx';

interface RightTableRowProps {
  rowSizeList: number[],
  selectItemSubject: Subject<any>,
  columnsConfig: ColumnsConfig,
  fixedNum: number,
  idProp: string,
  item,
  index: number,
  tableWrapEle: HTMLDivElement,
  hasDrag: boolean,
  hiddenCheck: number,
  displayColumns: ColumnsConfig,
  rightTableRowSize: number[],
  rowClassCb,
  defaultItemSelected,
}

export function RightTableRow({
  rowSizeList,
  selectItemSubject,
  columnsConfig,
  fixedNum,
  idProp,
  item,
  index,
  tableWrapEle,
  hasDrag,
  hiddenCheck,
  displayColumns,
  rightTableRowSize,
  rowClassCb,
  defaultItemSelected,
}: RightTableRowProps) {
  const [dragIdx, setDragIdx] = useState(undefined);
  const tableCtx = useContext(TableContext);
  const [isChecked, setIsChecked] = useState(false);

  const dataInput = (defaultItemSelected ?
    (Array.isArray(defaultItemSelected)
      ? defaultItemSelected : [defaultItemSelected]) : undefined);

  const conditionCheck = dataInput && dataInput.map(e => e[idProp]).includes(item[idProp]);

  useEffect(() => {
    const dragIdxSub = tableCtx.dragIdxSubject.subscribe(dragIdx => {
      setDragIdx(dragIdx);
    });

    return () => {
      dragIdxSub.unsubscribe();
    }
  }, [tableCtx.dragIdxSubject])

  useEffect(() => {
    const selectItemSub = selectItemSubject.subscribe(data => {
      const { checkedList, isSelectedAllItems } = data;
      const checked =
        (!!checkedList.find((_item) => _item[idProp] === item[idProp]) ||
          (isSelectedAllItems && !item?.disabled)) && index !== hiddenCheck;

      setIsChecked(checked);
    });

    return () => (selectItemSub as Subscriber<any>).unsubscribe();
    // eslint-disable-next-line
  }, [])

  const onMouseOver = useMemo(() => onMouseOverFunc(tableWrapEle, index), [tableWrapEle, index]);
  const onMouseOut = useMemo(() => onMouseOutFunc(tableWrapEle, index), [tableWrapEle, index]);

  const rowClass = rowClassCb && rowClassCb(item);

  return (
    <tr
      className={clsx(
        'b-table__row -right', rowClass, {
        '-checked': isChecked || conditionCheck,
        '-dragging': index === dragIdx,
      })}
      data-table-right-row
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      data-index={item._actualIndex}
    >
      {/* TODO: optimize */}

      {/* {console.log(tableChildren(item, index).props)}
      {tableChildren(item, index).props.children.filter(
        (_, i) => i >= fixedNum && columnsConfig[i].isVisible,
      )} */}

      {displayColumns.map((colConfig, cellIndex) => (
        <Cell
          width={rightTableRowSize[cellIndex]}
          key={cellIndex}
          hasDrag={hasDrag}
          dataItem={item}
          colConfig={colConfig}
          rowIndex={index}
        />
      ))}

      {/* placeholder for vertical scroll */}

      {columnsConfig.filter((cell) => cell.isVisible).length <= fixedNum
        ? <td className='b-table__cell--placeholder'></td>
        : null
      }
    </tr>
  )
}

const onMouseOverFunc = (tableWrapEle, index) => () => {
  if (!tableWrapEle) return;

  tableWrapEle
    .querySelector(
      `.b-table__body .b-table__row.-left:nth-child(${index + 1})`, // +1: ignore header
    )
    ?.classList.add('-hover')
  tableWrapEle
    .querySelector(
      `.b-table__body .b-table__row.-right:nth-child(${index + 1})`,
    )
    ?.classList.add('-hover')
}

const onMouseOutFunc = (tableWrapEle, index) => () => {
  if (!tableWrapEle) return;

  tableWrapEle
    .querySelector(
      `.b-table__body .b-table__row.-left:nth-child(${index + 1})`,
    )
    ?.classList.remove('-hover')
  tableWrapEle
    .querySelector(
      `.b-table__body .b-table__row.-right:nth-child(${index + 1})`,
    )
    ?.classList.remove('-hover')
}
