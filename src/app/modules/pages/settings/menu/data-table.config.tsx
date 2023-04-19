
import { ColumnsConfig, TableConfig } from 'common/blocks/datatable/datatable.component';
import TableAction from 'common/blocks/table-ui/table-action';
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
  fixedColumnNumber: 0,
  fixedLastColunm: true,
  // rowSizes: [309, 310, 310, 310, 312],
};

export const columnsConfig: ColumnsConfig<SettingMenuData> = [
  {
    label: 'Id',
    dataKey: 'id',
    align: 'center',
    width: '200',
  },
  {
    label: 'Name',
    dataKey: 'name',
    align: 'left',
    width: '1500px',
  },
  {
    label: 'Path',
    dataKey: 'path',
    align: 'left',
    width: '200px',
  },
  {
    label: 'Icon',
    dataKey: 'icon',
    align: 'right',
    width: '200px',
  },
  {
    label: 'Action',
    align: 'center',
    width: '140px',
    disableSort: true,
    component: TableAction,
    buttons: 'view,edit,delete',
  },
];
