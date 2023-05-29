import React from 'react'
import DataTable from 'common/blocks/datatable-ui/datatable.component';
// import { DataGridPremium, GridToolbar } from 'common/mui/x-data-grid-premium';
import { DataGridPremium, GridToolbar, useGridApiRef, GridEventListener } from '@mui/x-data-grid-premium';
import TableToolbar from './table-toolbar';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  var apiRef = useGridApiRef();

  React.useEffect(() => {
    const handleEvent: GridEventListener<'renderedRowsIntervalChange'> = (
      params,  // GridRenderedRowsIntervalChangeParams
      event,   // MuiEvent<{}>
      details, // GridCallbackDetails
    ) => {
      if (props.columnGroupingModel) {
        setTimeout(() => {
          const a = apiRef.current.rootElementRef.current

          const b = a.getElementsByClassName('MuiDataGrid-columnHeader')

          const columnGroupingItems = []
          const columnGroupingParent = []

          props.columnGroupingModel.forEach(e => {
            columnGroupingParent.push(e.field)
            e.children.forEach(e2 => {
              columnGroupingItems.push(e2.field)
            })
          })

          // console.log(a.getElementsByClassName('MuiDataGrid-columnHeader'));
          const columnHeaders = a.getElementsByClassName('MuiDataGrid-columnHeaders')[0] as HTMLElement

          for (let index = 0; index < b.length; index++) {
            const classList = b[index].classList as any
            const dataField = b[index].getAttribute('data-field')
            const dataFields = b[index].getAttribute('data-fields')
            const c = b[index] as HTMLElement

            if (classList && !classList.value.includes('MuiDataGrid-columnHeader--filledGroup')) {
              if (columnGroupingItems && dataField
                && !columnGroupingItems.includes(dataField)) {
                c.style.height = columnHeaders.offsetHeight + 'px'
                c.style.marginTop = -(columnHeaders.offsetHeight / 2) + 'px'
              }
            }

            if (dataField || dataFields) {
              c.classList.add('table-hearder-border')

              if (dataFields) {
                c.classList.add('hearder-group')
              }
            }
          }
        }, 0);
      }
    }

    return apiRef.current.subscribeEvent('renderedRowsIntervalChange', handleEvent);
  }, [apiRef, props.columnGroupingModel]);

  return (

    <div style={{ height: 'auto', width: '100%' }}>
      <TableToolbar onSearch={self.onHeaderSearch} />

      <DataGridPremium
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
          pageSize: props.queries.size | 10,
        }}
        sortingMode='server'
        sortModel={[{
          field: props.queries.sort?.dataKey,
          sort: props.queries.sort?.type,
        }]}
        rowCount={props.queries.size}
        initialState={state.initialState}
        pinnedColumns={state.pinnedColumns}
        slots={{
          toolbar: GridToolbar,
        }}
        columnGroupingModel={props.columnGroupingModel}
        experimentalFeatures={{ columnGrouping: true }}
      />
    </div>
  )
}
