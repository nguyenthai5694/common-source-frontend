import React, { useState, useEffect, useMemo } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { ColumnsConfig } from '../datatable.type';
import { LeftTableRow } from './left-table-row.component';
import { DisplayItemsData } from './type';

interface LeftTableContentProps {
  hasCheckBox: boolean,
  displayItemsSubject: BehaviorSubject<DisplayItemsData>,
  selectItemSubject: Subject<any>,
  hasRadio: boolean,
  hasDrag: boolean,
  columnsConfig: ColumnsConfig,
  fixedNum: number,
  toggleCheck,
  changeRadio,
  rowSizeList: number[],
  defaultItemSelected,
  idProp: string,
  handleMoveItems,
  onRowDrop: () => void,
  hiddenCheck: number,
  disableAllCheck,
  showRadio,
  tableWrapEle: HTMLDivElement,
  isHiddenAllCheck: boolean,
  showCheckBox,
}
// TODO: add type
export function LeftTableContent({
  hasCheckBox,
  displayItemsSubject,
  selectItemSubject,
  hasRadio,
  hasDrag,
  columnsConfig,
  fixedNum,
  toggleCheck,
  changeRadio,
  rowSizeList,
  defaultItemSelected,
  idProp,
  handleMoveItems,
  onRowDrop,
  hiddenCheck,
  disableAllCheck,
  showRadio,
  tableWrapEle,
  isHiddenAllCheck,
  showCheckBox,
}: LeftTableContentProps) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const selectItemSub = displayItemsSubject.subscribe(data => {
      setItems(data.items);
    });

    return () => selectItemSub.unsubscribe();
  }, [displayItemsSubject])

  const leftTableDisplayColumns = useMemo(
    () =>
      (columnsConfig)
        .slice(0, fixedNum)
        .filter(conf => conf.isVisible),
    [columnsConfig, fixedNum],
  );

  return (
    <>
      {items.map((item, i) => (
        <LeftTableRow
          // Adding "i" to make sure key will be unique no matter people use fa ke "idProp".
          key={`${i}.${item[idProp]}`}
          displayColumns={leftTableDisplayColumns}
          rowSizeList={rowSizeList}
          item={item}
          selectItemSubject={selectItemSubject}
          index={i}
          tableWrapEle={tableWrapEle}
          hasCheckBox={hasCheckBox}
          hasDrag={hasDrag}
          hasRadio={hasRadio}
          toggleCheck={toggleCheck}
          defaultItemSelected={defaultItemSelected}
          changeRadio={changeRadio}
          handleMoveItems={handleMoveItems}
          onRowDrop={onRowDrop}
          idProp={idProp}
          hiddenCheck={hiddenCheck}
          disableAllCheck={disableAllCheck}
          showRadio={showRadio}
          isHiddenAllCheck={isHiddenAllCheck}
          showCheckBox={showCheckBox}
        />
      ))}
    </>
  )
}