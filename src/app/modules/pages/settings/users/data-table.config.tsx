
import TableAction from 'common/blocks/datatable-ui/datatable.action';
import { ColumnsConfig, TableConfig } from 'common/blocks/datatable-ui/datatable.type';
import DatatableSearch from './datatable-search.component';
// import { ShokangaeData } from './type/shokangae.type';
export interface SettingMenuData {
  id: number;
  firstName: string
  lastName: string
  date: string;
  phone: string;
  sex: string;
  email: string;
  name: string;
}

export const tableConfig: TableConfig<SettingMenuData> = {
  headerMiddle: DatatableSearch,
  idProp: 'firstName',
  pinnedColumnsLeft: ['id', 'firstName', 'lastName'],
  // pinnedColumnsRight: ['actions'],
};

export const columnGroupingModel = [
  {
    groupId: 'naming',
    headerName: 'Full name (freeReordering)',
    freeReordering: false,
    children: [{ field: 'lastName' }, { field: 'firstName' }],
  },
];

export const columnsConfig: ColumnsConfig<SettingMenuData> = [
  {
    headerName: 'ID',
    field: 'id',
    align: 'center',
    width: 200,
  },
  {
    headerName: 'First Name',
    field: 'firstName',
    align: 'center',
    width: 200,
  },
  {
    headerName: 'Last Name',
    field: 'lastName',
    align: 'left',
    width: 200,
  },
  {
    headerName: 'Birth Day',
    field: 'date',
    align: 'left',
    width: 400,
  },
  {
    headerName: 'Gender',
    field: 'sex',
    align: 'right',
    width: 200,

  },
  {
    headerName: 'Phone',
    field: 'phone',
    align: 'right',
    width: 200,

  },
  {
    headerName: 'Email',
    field: 'email',
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
