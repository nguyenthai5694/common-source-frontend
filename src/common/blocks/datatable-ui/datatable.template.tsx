import React from 'react'
import { DataGridPro, GRID_CHECKBOX_SELECTION_COL_DEF, GridEventListener } from '@mui/x-data-grid-pro';
import DataTable from 'common/blocks/datatable-ui/datatable.component';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  const handleEvent: GridEventListener<'columnHeaderClick'> = (
    params,  // GridColumnHeaderParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log('ok');
  }

  return (

    <div style={{ height: 'auto', width: '100%' }}>
      <DataGridPro
        rows={props.dataItems}
        columns={state.columns}
        onColumnHeaderClick={handleEvent}
        checkboxSelection={props.selectItemType === 'checkbox' ? true : false}
        initialState={{
          pinnedColumns: {
            left: props.selectItemType === 'checkbox' && props.tableConfig.pinnedColumnsLeft ? [
              GRID_CHECKBOX_SELECTION_COL_DEF.field,
              ...props.tableConfig.pinnedColumnsLeft,
            ] : props.tableConfig.pinnedColumnsLeft,
            right: props.tableConfig.pinnedColumnsRight,
          },
        }}
      />
    </div>
  )
}
