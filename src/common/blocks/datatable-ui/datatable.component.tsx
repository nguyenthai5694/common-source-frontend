import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { GridActionsCellItem, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
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
      columns: this.props.columnsConfig.map(item => {
        return {
          field: item.field,
          headerName: item.headerName,
          align: item.align,
          width: totalWidth >= refWidth ? item.width : (item.width * refWidth / totalWidth),
          editable: item.editable || false,
          getActions: () => item.field === 'actions' ? [
            <GridActionsCellItem icon={<EditIcon />} label='Edit' />,
            <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />,
          ] : [],
          type: item.field === 'actions' ? 'actions' : '',
          headerClassName: this.getClassColumnFixed(item.field),

        } as GridColDef
      }),
    })
  }

  /**
   * Add class fixed in header table
   * @param field 
   * @returns 
   */
  getClassColumnFixed = (field: string) => {
    return this.props.tableConfig.pinnedColumnsLeft.includes(field) ? 'column-head-fixed column-fixed-left' : '' ||
      this.props.tableConfig.pinnedColumnsRight.includes(field) ? 'column-head-fixed column-fixed-right' : ''
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
