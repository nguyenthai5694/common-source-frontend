import React from 'react'
import ColumnResize from './resize.component'
import { RightTableContent } from './right-table-content.component'

// TODO: add type
export function RightTable({
  allItemsRef,
  displayItemsSubject,
  selectItemSubject,
  columnsConfig,
  fixedNum,
  sortChange,
  sortedColumn,
  handleTableScroll,
  rowSizeList,
  tableWrapRef,
  handleRowResize,
  handleMarkerMove,
  idProp,
  hasDrag,
  hiddenCheck,
  defaultItemSelected,
  isUseHozScroll,
  tbWrapLeftRef,
}) {
  const tableWrapEle = tableWrapRef.current;
  const normalizedFixedNum = fixedNum === -1 ? 0 : fixedNum;

  return (
    <div
      className='b-table-wrap-right'
      data-table-wrap-right
      onScroll={handleTableScroll}
    >
      <table className='b-table' data-table-right>
        <thead
          className='b-table__header'
          data-table-right-head
          onScroll={e => {
            e.stopPropagation()
            handleTableScroll(e)
          }}

        >
          <tr className='b-table__row' data-table-right-row>
            {columnsConfig.map((column, i) =>
              i >= normalizedFixedNum && columnsConfig[i].isVisible ? (
                <th className='b-table__cell' key={i} style={{ width: rowSizeList[i] }}>
                  <div className='b-table__col-resize'>
                    <span className='b-table__hidden-text'>resize</span>
                  </div>

                  <span className='b-table__header-label'>{column.label}</span>

                  {(column.isSorted === undefined || column.isSorted) && <button
                    type='button'
                    className='b-table__sort'
                    onClick={sortChange(column)}
                  >
                    <img
                      src={`/public/assets/images/icons/sort${sortedColumn && sortedColumn?.type
                        && column.dataKey === sortedColumn.dataKey
                        ? sortedColumn.type === 'asc'
                          ? '-asc'
                          : '-desc'
                        : '-primary-36'
                        }.svg`}
                      alt='Sort'
                    />
                  </button>}

                  <ColumnResize
                    onResize={handleRowResize}
                    onMarkerMove={handleMarkerMove}
                    index={i}
                    size={rowSizeList[i]}
                  />
                </th>
              ) : null,
            )}
          </tr>
        </thead>

        <tbody className='b-table__body' data-table-right-body>
          <RightTableContent
            displayItemsSubject={displayItemsSubject}
            selectItemSubject={selectItemSubject}
            columnsConfig={columnsConfig}
            fixedNum={normalizedFixedNum}
            rowSizeList={rowSizeList}
            idProp={idProp}
            hasDrag={hasDrag}
            tableWrapEle={tableWrapEle}
            hiddenCheck={hiddenCheck}
            defaultItemSelected={defaultItemSelected}
            isUseHozScroll={isUseHozScroll}
            tbWrapLeftRef={tbWrapLeftRef}
          />

          {/* placeholder for horizontal scroll */}

          {!allItemsRef.current.length &&
            <tr>
              {columnsConfig.map((_, i) =>
                i >= normalizedFixedNum && columnsConfig[i].isVisible ? (
                  <td key={i} className='b-table__cell--placeholder' />
                ) : null,
              )}
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
