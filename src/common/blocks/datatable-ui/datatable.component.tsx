import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-pro';
import GenericComponent from 'common/utils/generic/generic.component';
import { DatatableContext } from './datatable.context';
// import { DataTableQueries } from './datatable.type';
import DataTableTemplate from './datatable.template';
import { DataTableProps, DataTableState } from './datatable.type';
// import TableProps from './table-config';

// export default function DataTable({
//   dataItems,
//   columnsConfig,
//   tableConfig,
//   dataTableQueries,
//   onSearch,
//   totalItem,
//   checkType,
//   onSelectItem,
//   onActionClick,
// }: TableProps) {
export default class DataTable extends GenericComponent<DataTableProps, DataTableState>{
  /**
   * Table queies
   */
  // const tableQueries: DataTableQueries = { ...dataTableQueries };
  state: DataTableState = {
    columns: [],
    rows: [],
    tableConfig: null,
    columnsConfig: null,
    settingData: null,
    sortData: null,
  };

  /**
   * Event DidMount
   */
  componentDidMount(): void {
    this.setState({
      ...this.state,
      columns: this.props.columnsConfig.map(item => {
        return {
          field: item.field,
          headerName: item.headerName,
          align: item.align,
          width: item.width,
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

  getClassColumnFixed = (field: string) => {
    return this.props.tableConfig.pinnedColumnsLeft.includes(field) ? 'column-head-fixed column-fixed-left' : '' ||
      this.props.tableConfig.pinnedColumnsRight.includes(field) ? 'column-head-fixed column-fixed-right' : ''
  }

  render() {
    const { props } = this;

    return (
      <Box sx={{ width: '100%' }}>
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
