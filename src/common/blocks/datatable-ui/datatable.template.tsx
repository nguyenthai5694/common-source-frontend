import React from 'react'
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import TableToolbar from './table-toolbar';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  let apiRef = useGridApiRef();

  React.useEffect(() => {
    const handleEvent2: GridEventListener<'scrollPositionChange'> = (
      params,  // GridScrollParams
      event,   // MuiEvent<React.UIEvent | MuiBaseEvent>
      details, // GridCallbackDetails
    ) => {
      //Set position colunm fixed
      let position = 0;
      //column fixed left
      const listTh = document.querySelectorAll('.column-fixed-left')

      listTh.forEach((item: HTMLElement, index) => {
        item.style.left = position + Math.abs(params.left) + 'px'
        position += item.offsetWidth

        if (index === listTh.length - 1) item.style.borderRight = '1px solid #fff'
      })

      //column fixed right
      const listThRight = document.querySelectorAll('.column-fixed-right')

      position = 0
      listThRight.forEach((item: HTMLElement, index) => {
        item.style.right = position - Math.abs(params.left) + 'px'
        position += item.offsetWidth

        if (index === listThRight.length - 1) item.style.borderLeft = '1px solid #fff'
      })

      //column body fixed left
      position = 0
      props.tableConfig.pinnedColumnsLeft && props.tableConfig.pinnedColumnsLeft.forEach((item, index) => {
        const listColumn = document.querySelectorAll(`.MuiDataGrid-cell[data-field="${item}"]`) as any

        listColumn.forEach((e: HTMLElement) => {
          e.classList.add('column-fixed')
          e.style.left = position + 'px'

          if (index === listTh.length - 1) e.style.borderRight = '1px solid #e0e0e0'
        })

        if (listColumn.length) position += listColumn[0].offsetWidth
      })

      //column body fixed right
      position = 0
      props.tableConfig.pinnedColumnsRight && props.tableConfig.pinnedColumnsRight.forEach((item, index) => {
        const listColumn = document.querySelectorAll(`.MuiDataGrid-cell[data-field="${item}"]`) as any

        listColumn.forEach((e: HTMLElement) => {
          e.classList.add('column-fixed')
          e.style.right = position + 'px'

          if (index === props.tableConfig.pinnedColumnsRight.length - 1) e.style.borderLeft = '1px solid #e0e0e0'
        })

        if (listColumn.length) position += listColumn[0].offsetWidth
      })
    }

    return apiRef.current.subscribeEvent('scrollPositionChange', handleEvent2);
  }, [apiRef, props.tableConfig.pinnedColumnsLeft, props.tableConfig.pinnedColumnsRight]);

  return (

    <div style={{ height: 'auto', width: '100%' }}>
      <TableToolbar onSearch={props.onSearch} />

      <DataGrid
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
      />
    </div>
  )
}
