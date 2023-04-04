
import { ColumnsConfig, TableConfig } from 'soumu/blocks/datatable/datatable.component';
import DatatableSearch from './components/datatable-search.component';
// import { ShokangaeData } from './type/shokangae.type';
interface DemoData {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export const tableConfig: TableConfig<DemoData> = {
  headerMiddle: DatatableSearch,
  idProp: 'name',
  fixedColumnNumber: 1,
  rowSizes: [309, 310, 310, 310, 312],
};

export const columnsConfig: ColumnsConfig<DemoData> = [
  {
    label: 'Dessert (100g serving)',
    dataKey: 'name',
    align: 'left',
    width: '',
  },
  {
    label: 'Calories',
    dataKey: 'calories',
    align: 'right',
    width: '200px',
  },
  {
    label: 'Fat (g)',
    dataKey: 'fat',
    align: 'right',
    width: '200px',
  },
  {
    label: 'Carbs (g)',
    dataKey: 'carbs',
    align: 'right',
    width: '200px',
  },
  {
    label: 'Protein (g)',
    dataKey: 'protein',
    align: 'right',
    width: '200px',
  },
];
