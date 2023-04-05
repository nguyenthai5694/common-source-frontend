import React from 'react'
import clsx from 'clsx'
import { LeftTableContent } from './left-table-content.component'
import { TableHeader } from './table-header.template'
import { hasLeftTableOnly } from './table.helper'

// TODO: add type
export function LeftTable({
  allItemsRef,
  hasCheckBox,
  handleHeadCheckClick,
  items,
  displayItemsSubject,
  selectItemSubject,
  menuRef,
  addAllCheckInAll,
  addAllCheckInPage,
  hasRadio,
  hasDrag,
  columnsConfig,
  fixedNum,
  sortChange,
  sortedColumn,
  toggleCheck,
  changeRadio,
  handleTableScroll,
  rowSizeList,
  tableWrapRef,
  handleRowResize,
  handleMarkerMove,
  selectItemTitle,
  defaultItemSelected,
  idProp,
  handleMoveItems,
  onRowDrop,
  isHiddenCheckboxAll,
  isHiddenTableHeader,
  hiddenCheck,
  disableAllCheck,
  showRadio,
  isHiddenPulldownCheckAll,
  isHiddenAllCheck,
  showCheckBox,
}) {
  const tableWrapEle = tableWrapRef.current;
  const isHasLeftTableOnly = hasLeftTableOnly(fixedNum, columnsConfig);

  return (
    <div
      className='b-table-wrap-left'
      data-table-wrap-left
      onScroll={handleTableScroll}
    //style={{ overflow: items.length === 1 ? 'unset' : 'auto' }}//its necessary?
    >
      <table className={clsx('b-table', {
        'border-right': !isHasLeftTableOnly,
      })} data-table-left>
        {!isHiddenTableHeader && (
          <TableHeader
            allItemsRef={allItemsRef}
            selectItemSubject={selectItemSubject}
            handleTableScroll={handleTableScroll}
            hasCheckBox={hasCheckBox}
            isHiddenCheckboxAll={isHiddenCheckboxAll}
            handleHeadCheckClick={handleHeadCheckClick}
            disableAllCheck={disableAllCheck}
            items={items}
            hiddenCheck={hiddenCheck}
            menuRef={menuRef}
            addAllCheckInAll={addAllCheckInAll}
            addAllCheckInPage={addAllCheckInPage}
            hasRadio={hasRadio}
            hasDrag={hasDrag}
            selectItemTitle={selectItemTitle}
            columnsConfig={columnsConfig}
            fixedNum={fixedNum}
            sortedColumn={sortedColumn}
            sortChange={sortChange}
            handleRowResize={handleRowResize}
            handleMarkerMove={handleMarkerMove}
            rowSizeList={rowSizeList}
            isHiddenPulldownCheckAll={isHiddenPulldownCheckAll}
            isHiddenAllCheck={isHiddenAllCheck}
            showCheckBox={showCheckBox}
          />
        )}

        <tbody className='b-table__body' data-table-left-body>
          <LeftTableContent
            hasCheckBox={hasCheckBox}
            displayItemsSubject={displayItemsSubject}
            selectItemSubject={selectItemSubject}
            hasRadio={hasRadio}
            hasDrag={hasDrag}
            columnsConfig={columnsConfig}
            fixedNum={fixedNum}
            toggleCheck={toggleCheck}
            changeRadio={changeRadio}
            rowSizeList={rowSizeList}
            defaultItemSelected={defaultItemSelected}
            idProp={idProp}
            handleMoveItems={handleMoveItems}
            onRowDrop={onRowDrop}
            hiddenCheck={hiddenCheck}
            disableAllCheck={disableAllCheck}
            showRadio={showRadio}
            tableWrapEle={tableWrapEle}
            isHiddenAllCheck={isHiddenAllCheck}
            showCheckBox={showCheckBox}
          />
        </tbody>
      </table>
    </div>
  )
}
