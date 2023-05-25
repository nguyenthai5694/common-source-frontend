import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { GridEventListener } from '@mui/x-data-grid';
import GenericComponent from 'common/utils/generic/generic.component';
import { DatatableContext } from './datatable.context';
import DataTableTemplate from './datatable.template';
import { DataTableProps, DataTableQueries, DataTableState } from './datatable.type';

export default class DataTable extends GenericComponent<DataTableProps, DataTableState>{
  /**
   * Table queies
   */
  state: DataTableState = {
    columns: [],
    rows: [],
    tableConfig: null,
    columnsConfig: null,
    settingData: null,
    sortData: null,
    initialState: {},
    pinnedColumns: {},
  };

  canvasRef = React.createRef() as any;

  queries: DataTableQueries

  /**
   * Event DidMount
   */
  componentDidMount(): void {
    this.queries = this.props.queries

    let totalWidth = 0
    const refWidth = this.canvasRef.current.offsetWidth

    this.props.columnsConfig.forEach(item => {
      totalWidth += item.width
    })

    this.setState({
      ...this.state,
      pinnedColumns: {
        left: this.props.tableConfig.pinnedColumnsLeft,
        right: this.props.tableConfig.pinnedColumnsRight,
      },
      columns: this.props.columnsConfig.map(item => {
        return {
          field: item.field,
          headerName: item.headerName,
          align: item.align,
          width: totalWidth >= refWidth ? item.width : (item.width * refWidth / totalWidth),
          editable: item.editable || false,
          type: item.field === 'actions' ? 'actions' : '',
          renderCell: item.component ? () => {
            return <>
              <item.component
                index={1} dataItem={{}}
                dataKey='233'
                buttons={item.buttons}
                onActionClick={this.props.onActionClick}
              />
            </>
          } : undefined,
        } as GridColDef
      }),
    })
  }

  /**
   * Event change pagination
   * @param model 
   * @param details 
   */
  handPaginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
    this.queries.page = model.page + 1
    this.queries.size = model.pageSize

    this.props.onSearch(this.queries)
  }

  /**
   * Event sort
   * @param params 
   * @param event 
   * @param details 
   */
  handleModelSort: GridEventListener<'columnHeaderClick'> = (
    params,  // GridColumnHeaderParams
    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    if (params.field === this.queries.sort.dataKey) {
      this.queries.sort.type = this.queries.sort.type === 'asc' ? 'desc' : 'asc'
    } else {
      this.queries.sort.dataKey = params.field
    }

    this.props.onSearch(this.queries)
  }

  /**
   * 
   * @param filter Event search filter
   */
  onHeaderSearch = (filter: any) => {
    this.queries.filter = filter

    this.props.onSearch(this.queries)
  }

  render() {
    const { props } = this;

    return (
      <Box sx={{ width: '100%' }} ref={this.canvasRef}>
        <Paper sx={{ width: '100%', mb: 2 }} className='data-table'>
          <DatatableContext.Provider
            value={{
              dataItems: props.dataItems,
              columnsConfig: props.columnsConfig,
              tableConfig: props.tableConfig,
              onSearch: props.onSearch,
              dataTableQueries: {} as any,
              totalItem: props.totalItem,
              checkType: props.selectItemType,
            }}
          >
            <DataTableTemplate self={this} />
          </DatatableContext.Provider>
        </Paper>

      </Box >
    )
  }
}
