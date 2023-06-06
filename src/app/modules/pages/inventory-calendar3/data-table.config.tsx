
import React from 'react';
import { Link } from '@mui/material';
import { ColumnsConfig, TableConfig } from 'common/blocks/datatable-ui/datatable.type';
import TableAction from './components/table-action';

export interface InventoryCalendarData {
  id: string
  name: string;
  imageName: string;
}

export const tableConfig: TableConfig<InventoryCalendarData> = {
  // headerMiddle: DatatableSearch,
  idProp: 'id',
  // pinnedColumnsLeft: ['id', 'name'],
  // pinnedColumnsRight: ['actions'],
};

export const columnsConfig: ColumnsConfig<InventoryCalendarData> = [
  {
    headerName: '部屋NO',
    field: 'id',
    align: 'center',
    width: 20,
  },
  {
    headerName: '部屋名',
    field: 'name',
    align: 'center',
    width: 100,
  },
  {
    headerName: '添付ファイル',
    field: 'imageName',
    align: 'center',
    width: 40,
    disableSort: true,
    component: (item) => {
      return (
        <Link key={item.dataItem.id} href='#'>{item.dataItem.imageName}</Link>
      )
    },
  },
  {
    headerName: 'アクション',
    field: 'actions',
    align: 'center',
    width: 30,
    disableSort: true,
    component: TableAction,
  },
];
