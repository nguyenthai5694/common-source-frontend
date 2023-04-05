import React from 'react'
import clsx from 'clsx'
import { ColumnSize } from './column-size.hoc';
import { LeftTable } from './left-table.component'
import { RightTable } from './right-table.component'
import { hasLeftTableOnly } from './table.helper'

export const TableTemplate = ({
  allItemsRef,
  hasCheckBox,
  handleHeadCheckClick,
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
  handleMarkerMove,
  selectItemTitle,
  defaultItemSelected,
  idProp,
  handleMoveItems,
  onRowDrop,
  isHiddenCheckboxAll,
  isHiddenTableHeader,
  hiddenCheck,
  hasColumnGroups,
  disableAllCheck,
  showRadio,
  isHiddenPulldownCheckAll,
  isHiddenAllCheck,
  showCheckBox,
  tbWrapLeftRef,
}) => {
  const isHasLeftTableOnly = hasLeftTableOnly(fixedNum, columnsConfig);

  return (
    <ColumnSize
      originalColWidths={rowSizeList}
      columnsConfig={columnsConfig}
      fixedColumnNumber={fixedNum}
      hasCheckBox={hasCheckBox}
      hasRadio={hasRadio}
      hasDrag={hasDrag}
      tableWrapRef={tableWrapRef}
    >
      {({ isUseHozScroll, columnWidths, handleResizeColumn }) => (
        <div
          data-table-wrap
          className={clsx(
            'b-table-wrap',
            {
              'h-p-0': isHiddenTableHeader,
              '-has-two-table': !isHasLeftTableOnly,
              '-has-left-table-only': isHasLeftTableOnly,
              '-has-drag': hasDrag,
            },
            // how it relate ???
            { '-has-label': hasColumnGroups },
          )}
        >
          <div className='b-table-drag-marker' style={{ display: 'none' }} />

          <LeftTable
            allItemsRef={allItemsRef}
            hasCheckBox={hasCheckBox}
            hasRadio={hasRadio}
            hasDrag={hasDrag}
            handleHeadCheckClick={handleHeadCheckClick}
            items={displayItemsSubject.value}
            displayItemsSubject={displayItemsSubject}
            selectItemSubject={selectItemSubject}
            menuRef={menuRef}
            addAllCheckInAll={addAllCheckInAll}
            addAllCheckInPage={addAllCheckInPage}
            columnsConfig={columnsConfig}
            fixedNum={fixedNum}
            sortChange={sortChange}
            sortedColumn={sortedColumn}
            toggleCheck={toggleCheck}
            changeRadio={changeRadio}
            handleTableScroll={handleTableScroll}
            rowSizeList={columnWidths}
            tableWrapRef={tableWrapRef}
            handleRowResize={handleResizeColumn}
            handleMarkerMove={handleMarkerMove}
            selectItemTitle={selectItemTitle}
            defaultItemSelected={defaultItemSelected}
            idProp={idProp}
            handleMoveItems={handleMoveItems}
            onRowDrop={onRowDrop}
            isHiddenCheckboxAll={isHiddenCheckboxAll}
            isHiddenTableHeader={isHiddenTableHeader}
            hiddenCheck={hiddenCheck}
            disableAllCheck={disableAllCheck}
            showRadio={showRadio}
            isHiddenPulldownCheckAll={isHiddenPulldownCheckAll}
            isHiddenAllCheck={isHiddenAllCheck}
            showCheckBox={showCheckBox}
          />

          <RightTable
            allItemsRef={allItemsRef}
            hasDrag={hasDrag}
            displayItemsSubject={displayItemsSubject}
            selectItemSubject={selectItemSubject}
            columnsConfig={columnsConfig}
            fixedNum={fixedNum}
            sortChange={sortChange}
            sortedColumn={sortedColumn}
            handleTableScroll={handleTableScroll}
            rowSizeList={columnWidths}
            tableWrapRef={tableWrapRef}
            handleRowResize={handleResizeColumn}
            handleMarkerMove={handleMarkerMove}
            idProp={idProp}
            hiddenCheck={hiddenCheck}
            defaultItemSelected={defaultItemSelected}
            isUseHozScroll={isUseHozScroll}
            tbWrapLeftRef={tbWrapLeftRef}
          />
        </div>
      )}
    </ColumnSize>
  )
}
