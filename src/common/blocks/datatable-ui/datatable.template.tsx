import React, { useCallback, useEffect } from 'react'
import { Box, TablePaginationProps } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { GridPagination } from '@mui/x-data-grid';
import DataTable from 'common/blocks/datatable-ui/datatable.component';
// import { DataGridPremium, GridToolbar } from 'common/mui/x-data-grid-premium';
import { DataGridPremium, useGridApiRef, GridEventListener } from '@mui/x-data-grid-premium';
import TableToolbar from './table-toolbar';

interface DataTableTemplate {
  self: DataTable,
}

export default function DataTableTemplate({ self }: DataTableTemplate) {
  const { state, props } = self

  var apiRef = useGridApiRef();

  /**
   * Event set height table
   * */
  const handSetHeight = useCallback(
    () => {
      if (self.canvasRef && (!props.height || props.height === 'auto')) {
        const hearderElement = self.canvasRef.current as HTMLElement

        hearderElement.style.height = 'auto'

        let dataTableElement = hearderElement.getElementsByClassName('data-table')[0] as HTMLElement

        dataTableElement.style.height = 'auto'

        if (hearderElement.offsetHeight > window.innerHeight - dataTableElement.offsetTop)
          dataTableElement.style.height = (window.innerHeight - dataTableElement.offsetTop) + 'px'
        else
          dataTableElement.style.height = 'auto'
      }
    },
    [props.height, self.canvasRef],
  )

  /**
   * Event resize window
   */
  window.addEventListener('resize', handSetHeight)

  React.useEffect(() => {
    const handleEvent: GridEventListener<'renderedRowsIntervalChange'> = (
      params,  // GridRenderedRowsIntervalChangeParams
      event,   // MuiEvent<{}>
      details, // GridCallbackDetails
    ) => {
      setTimeout(() => {
        const hearderElement = apiRef.current.rootElementRef.current

        if (props.columnGroupingModel) {
          const columnHeader = hearderElement.getElementsByClassName('MuiDataGrid-columnHeader')

          const columnGroupingItems = []
          const columnGroupingParent = []

          props.columnGroupingModel.forEach(e => {
            columnGroupingParent.push(e.field)
            e.children.forEach(e2 => {
              columnGroupingItems.push(e2.field)
            })
          })

          const columnHeaders = hearderElement.getElementsByClassName('MuiDataGrid-columnHeaders')[0] as HTMLElement

          for (let index = 0; index < columnHeader.length; index++) {
            const classList = columnHeader[index].classList as any
            const dataField = columnHeader[index].getAttribute('data-field')
            const dataFields = columnHeader[index].getAttribute('data-fields')
            const columnElement = columnHeader[index] as HTMLElement

            if (classList && !classList.value.includes('MuiDataGrid-columnHeader--filledGroup')) {
              if (columnGroupingItems && dataField
                && !columnGroupingItems.includes(dataField)) {
                columnElement.style.height = columnHeaders.offsetHeight + 'px'
                columnElement.style.marginTop = -(columnHeaders.offsetHeight / 2) + 'px'
              }
            }

            if (dataField || dataFields) {
              columnElement.classList.add('table-hearder-border')

              if (dataFields) {
                columnElement.classList.add('hearder-group')
              }
            }
          }
        }
      }, 0);
    }

    return apiRef.current.subscribeEvent('renderedRowsIntervalChange', handleEvent);
  }, [apiRef, props.columnGroupingModel]);

  /**
   * Event check render
   */
  useEffect(() => {
    const intervel = setInterval(() => {
      if (apiRef && apiRef.current && apiRef.current.rootElementRef.current) {
        const refHTML = apiRef.current.rootElementRef.current as HTMLElement
        const tableBody = refHTML.querySelector('.MuiDataGrid-virtualScrollerRenderZone')

        if (tableBody && tableBody.querySelectorAll('.MuiDataGrid-row').length === props.dataItems.length) {
          clearInterval(intervel)
          handSetHeight()
        }
      }
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataItems])

  /**
   * Custom Pagination
   * @param param0 
   * @returns 
   */
  function Pagination({
    page,
    onPageChange,
    className,
  }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    // const apiRef = useGridApiContext();
    const pageCount = Math.ceil(props.totalItem / props.queries.size);

    return (
      <MuiPagination
        color='primary'
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  return (

    <div style={{ width: '100%' }} ref={self.canvasRef}>
      {props.tableConfig.headerMiddle && <TableToolbar onSearch={self.onHeaderSearch} />}

      <Box sx={{ width: '100%', mb: 2, height: props.height || 'auto' }} className='data-table' >
        <DataGridPremium
          apiRef={apiRef}
          rows={props.dataItems}
          columns={state.columns}
          onColumnHeaderClick={self.handleModelSort}
          onPaginationModelChange={self.handPaginationModelChange}
          checkboxSelection={props.selectItemType === 'checkbox' ? true : false}
          pageSizeOptions={[10, 20, 50, 100]}
          paginationMode='server'
          paginationModel={state.paginationModel}
          sortingMode='server'
          sortModel={[{
            field: props.queries.sort?.dataKey,
            sort: props.queries.sort?.type,
          }]}
          rowCount={props.totalItem}
          initialState={state.initialState}
          pinnedColumns={state.pinnedColumns}
          columnGroupingModel={props.columnGroupingModel}
          experimentalFeatures={{ columnGrouping: true }}
          pagination={true}
          slots={{
            pagination: CustomPagination,
          }}
          getRowHeight={() => 'auto'}
          hideFooterSelectedRowCount
        />
      </Box>

    </div>
  )
}
