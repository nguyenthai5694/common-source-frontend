
import React from 'react';
import { Link } from '@mui/material';
import { ColumnsConfig, TableConfig } from 'common/blocks/datatable-ui/datatable.type';
import DatatableSearch from './components/datatable-search.component';
import TableAction from './components/table-action';

export interface InventoryCalendarData {
  id: number
  colectDate: string;
  date: string;
  name: string;
  type: number;
  typeName: string;
  action1: string;
  action2: string;
}

export const tableConfig: TableConfig<InventoryCalendarData> = {
  headerMiddle: DatatableSearch,
  idProp: 'id',
  // pinnedColumnsLeft: ['id', 'name'],
  // pinnedColumnsRight: ['actions'],
};

export const columnsConfig: ColumnsConfig<InventoryCalendarData> = [
  {
    headerName: '棚卸回目',
    field: 'colectDate',
    align: 'center',
    width: 100,
  },
  {
    headerName: '棚卸日',
    field: 'date',
    align: 'center',
    width: 100,
  },
  {
    headerName: '作成者',
    field: 'name',
    align: 'center',
    width: 100,
  },
  {
    headerName: 'ステータス',
    field: 'typeName',
    align: 'center',
    width: 100,

  },
  {
    headerName: '部屋のレイアウト',
    field: 'action1',
    align: 'center',
    width: 100,
    disableSort: true,
    component: (item) => {
      return (
        <Link key={item.dataItem.id} href='#'>詳細</Link>
      )
    },
  },
  {
    headerName: '棚卸表',
    field: 'action2',
    align: 'center',
    width: 100,
    disableSort: true,
    component: (item) => {
      return (
        <Link key={item.dataItem.id} href='#'>詳細</Link>
      )
    },
  },
  {
    headerName: 'アクション',
    field: 'actions',
    align: 'center',
    width: 100,
    disableSort: true,
    component: TableAction,
  },
];
