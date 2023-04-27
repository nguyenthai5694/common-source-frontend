import React, { useState } from 'react'
import { DataGrid, GridEventListener, useGridApiEventHandler } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import DataTable from 'common/blocks/datatable-ui/datatable.component';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  let apiRef = useGridApiRef();

  const handleEvent: GridEventListener<'columnHeaderClick'> = (
    params,  // GridColumnHeaderParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log('ok');
  }

  React.useEffect(() => {
    const handleEvent2: GridEventListener<'scrollPositionChange'> = (
      params,  // GridScrollParams
      event,   // MuiEvent<React.UIEvent | MuiBaseEvent>
      details, // GridCallbackDetails
    ) => {
      const listTh = document.querySelectorAll('.column-fixed-left')

      //Set position colunm fixed
      listTh.forEach((item: HTMLElement, index) => {
        item.style.left = Math.abs(params.left) + 'px'
        // paddingLeft += item.offsetWidth
      })

      props.tableConfig.pinnedColumnsLeft && props.tableConfig.pinnedColumnsLeft.forEach(item => {
        const listColumn = document.querySelectorAll(`.MuiDataGrid-cell[data-field="${item}"]`)

        listColumn.forEach(e => {
          e.classList.add('column-fixed')
        })
      })

      // setleftColumnFixed(params.left)
    }

    return apiRef.current.subscribeEvent('scrollPositionChange', handleEvent2);
  }, [apiRef, props.tableConfig.pinnedColumnsLeft]);

  return (

    <div style={{ height: 'auto', width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        rows={props.dataItems}
        columns={state.columns}
        onColumnHeaderClick={handleEvent}
        checkboxSelection={props.selectItemType === 'checkbox' ? true : false}
      // initialState={{
      //   pinnedColumns: {
      //     left: props.selectItemType === 'checkbox' && props.tableConfig.pinnedColumnsLeft ? [
      //       GRID_CHECKBOX_SELECTION_COL_DEF.field,
      //       ...props.tableConfig.pinnedColumnsLeft,
      //     ] : props.tableConfig.pinnedColumnsLeft,
      //     right: props.tableConfig.pinnedColumnsRight,
      //   },
      // }}
      />
    </div>
  )
}
