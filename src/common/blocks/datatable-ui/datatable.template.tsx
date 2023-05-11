import React from 'react'
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import { DataGridPremium } from 'common/mui/x-data-grid-premium';
import TableToolbar from './table-toolbar';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  return (

    <div style={{ height: 'auto', width: '100%' }}>
      <TableToolbar onSearch={props.onSearch} />

      {/* <DataGrid
        loading={false}
        apiRef={apiRef}
        rows={props.dataItems}
        columns={state.columns}
        onColumnHeaderClick={self.handleModelSort}
        onPaginationModelChange={self.handPaginationModelChange}
        checkboxSelection={props.selectItemType === 'checkbox' ? true : false}
        pageSizeOptions={[10, 20, 50, 100]}
        paginationMode='server'
        paginationModel={{
          page: props.queries.page - 1,
          pageSize: props.queries.size,
        }}
        sortingMode='server'
        sortModel={[{
          field: props.queries.sort?.dataKey,
          sort: props.queries.sort?.type,
        }]}
        rowCount={props.queries.size}
      /> */}

      <DataGridPremium
        rows={props.dataItems}
        columns={state.columns}
      />
    </div>
  )
}
