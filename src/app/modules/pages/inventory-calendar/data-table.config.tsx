
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
    width: 200,
  },
  {
    headerName: '棚卸日',
    field: 'date',
    align: 'center',
    width: 200,
  },
  {
    headerName: '作成者',
    field: 'name',
    align: 'center',
    width: 200,
  },
  {
    headerName: 'ステータス',
    field: 'typeName',
    align: 'center',
    width: 200,

  },
  {
    headerName: 'アクション',
    field: 'actions',
    align: 'center',
    width: 200,
    disableSort: true,
    component: TableAction,
    buttons: 'view,edit,delete',
  },
];
