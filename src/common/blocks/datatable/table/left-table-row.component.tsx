/**
 * TODO: refactor, remove "any"
 */

/* eslint-disable complexity */
import React, { useEffect, useRef, useState, useContext } from 'react';
import clsx from 'clsx';
import { Subject } from 'rxjs';
import { DatatableContext } from 'common/blocks/datatable/datatable.component';
import { ColumnsConfig } from '../datatable.type';
import { Cell } from './cell.component'

interface LeftTableRowProps {
  displayColumns: ColumnsConfig,
  rowSizeList: number[],
  selectItemSubject: Subject<any>,
  item,
  index: number,
  tableWrapEle: HTMLDivElement,
  hasCheckBox: boolean,
  hasRadio: boolean,
  hasDrag: boolean,
  toggleCheck,
  defaultItemSelected,
  changeRadio,
  handleMoveItems,
  onRowDrop: () => void,
  idProp: string,
  hiddenCheck: number,
  disableAllCheck: boolean,
  showRadio,
  isHiddenAllCheck: boolean,
  showCheckBox,
}

/**
 * Note: For now, it only support d&d with fixed height item.
 * If you change this value, please have a look at _table.scss(search .-dragging-up and .-dragging-down).
 */

export function LeftTableRow({
  displayColumns,
  rowSizeList,
  selectItemSubject,
  item,
  index,
  tableWrapEle,
  hasCheckBox,
  hasRadio,
  hasDrag,
  toggleCheck,
  defaultItemSelected,
  changeRadio,
  handleMoveItems,
  onRowDrop,
  idProp,
  hiddenCheck,
  disableAllCheck,
  showRadio,
  isHiddenAllCheck,
  showCheckBox,
}: LeftTableRowProps) {
  const rowRef = useRef(null);

  const [isChecked, setIsChecked] = useState(false);
  const dataInput = (defaultItemSelected ?
    (Array.isArray(defaultItemSelected)
      ? defaultItemSelected : [defaultItemSelected]) : undefined)

  const conditionCheck = dataInput && dataInput.map(e => e[idProp]).includes(item[idProp])

  useEffect(() => {
    const selectItemSub = selectItemSubject.subscribe(data => {
      const { checkedList, isSelectedAllItems } = data;
      let checked

      if (showCheckBox) {
        const checkedListFilter = checkedList.filter((item) => showCheckBox(item))

        checked =
          (!!checkedListFilter.find((_item) => _item[idProp] === item[idProp]) ||
            (isSelectedAllItems && !item?.disabled)) && index !== hiddenCheck && showCheckBox(item);
      } else {
        checked =
          (!!checkedList.find((_item) => _item[idProp] === item[idProp]) ||
            (isSelectedAllItems && !item?.disabled)) && index !== hiddenCheck;
      }

      setIsChecked(checked);
    });

    return () => selectItemSub.unsubscribe();
  }, [selectItemSubject, hiddenCheck, idProp, index, item, showCheckBox])

  /**
   * Instead of update state immediately when hovering over item(that cause slow render, especially on IE),
   * the bellow code make use of CSS and modify DOM directly to simulate normal "drag&drop".
   */

  const datatableCtx = useContext(DatatableContext);
  const rowClass =
    (datatableCtx.rowClass && datatableCtx.rowClass(item)) ||
    null;

  return (
    <tr
      className={clsx('b-table__row -left', rowClass, `row-index-${index}`, `row-id-${item[idProp]}`, {
        '-checked': isChecked || conditionCheck,
        '-border-radius': hasDrag,
      })}
      ref={rowRef}
      data-table-left-row
      key={index}
      data-index={item._actualIndex}
      onMouseOver={() => {
        if (!tableWrapEle) return;

        tableWrapEle.querySelector(`.b-table__body .b-table__row.-left:nth-child(${index + 1})`)
          ?.classList.add('-hover')
        tableWrapEle.querySelector(`.b-table__body .b-table__row.-right:nth-child(${index + 1})`)
          ?.classList.add('-hover')
      }}
      onMouseOut={() => {
        if (!tableWrapEle) return;

        tableWrapEle.querySelector(`.b-table__body .b-table__row.-left:nth-child(${index + 1})`)
          ?.classList.remove('-hover')
        tableWrapEle.querySelector(`.b-table__body .b-table__row.-right:nth-child(${index + 1})`)
          ?.classList.remove('-hover')
      }}
    >
      {hasCheckBox && !isHiddenAllCheck && (
        <td className='b-table__cell -checkbox'>
          {(!showCheckBox || showCheckBox(item)) && (
            <label
              className='b-table__checkbox'
              hidden={index === hiddenCheck}
            >
              <input
                type='checkbox'
                value={item}
                checked={isChecked || conditionCheck}
                onChange={toggleCheck(item)}
                disabled={item?.disabled || index === hiddenCheck || false || disableAllCheck}
              />

              <span className='b-table__check-label-text'>
                <span className='b-table__hidden-text'>選択</span>
              </span>
            </label>)}
        </td>
      )}

      {isHiddenAllCheck &&
        <td className='b-table__cell -checkbox'>
        </td>
      }

      {hasDrag && (
        <td className='b-table__cell -drag' >
          <div className='b-table__row-border'>
            <span className='position-relative t-8'>
              <img
                id='icoDragIndicatorForDetailsOfTheInquiry'
                className='b-attachment-item__upload-drag-icon'
                src='/public/assets/images/icons/drag-primary-36.svg'
                alt=''
              />
            </span>
          </div>
        </td>
      )}

      {hasRadio && (
        <td className='b-table__cell -radio'>
          {(!showRadio || showRadio(item)) && (
            <label className='b-table__radio'>
              <input
                type='radio'
                checked={isChecked || conditionCheck}
                value={item}
                name='radio'
                onChange={changeRadio(item)}
              />

              <span className='b-table__radio-label-text'>
                <span className='b-table__hidden-text'>選択</span>
              </span>
            </label>
          )}
        </td>
      )}

      {displayColumns.map((colConfig, cellIndex) => (
        <Cell
          width={rowSizeList[cellIndex]}
          key={cellIndex}
          dataItem={item}
          colConfig={colConfig}
          rowIndex={index}
          hasDrag={hasDrag}
        />
      ))}
    </tr>
  )
}

