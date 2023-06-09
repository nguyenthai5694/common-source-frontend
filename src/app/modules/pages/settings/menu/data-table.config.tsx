
import TableAction from 'common/blocks/datatable-ui/datatable.action';
import { ColumnsConfig, TableConfig } from 'common/blocks/datatable-ui/datatable.type';
import DatatableSearch from './components/datatable-search.component';
// import { ShokangaeData } from './type/shokangae.type';
export interface SettingMenuData {
  id: number
  name: string;
  path: number;
  icon: number;
}

export const tableConfig: TableConfig<SettingMenuData> = {
  headerMiddle: DatatableSearch,
  idProp: 'id',
  pinnedColumnsLeft: ['id', 'name'],
  pinnedColumnsRight: ['actions'],
};

export const columnsConfig: ColumnsConfig<SettingMenuData> = [
  {
    headerName: 'Id',
    field: 'id',
    align: 'center',
    width: 200,
  },
  {
    headerName: 'Name',
    field: 'name',
    align: 'left',
    width: 1000,
  },
  {
    headerName: 'Path',
    field: 'path',
    align: 'left',
    width: 200,
  },
  {
    headerName: 'Icon',
    field: 'icon',
    align: 'right',
    width: 200,

  },
  {
    headerName: 'Action',
    field: 'actions',
    align: 'center',
    width: 140,
    disableSort: true,
    component: TableAction,
    buttons: 'view,edit,delete',
  },
];
