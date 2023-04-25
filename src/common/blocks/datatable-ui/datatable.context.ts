import { createContext } from 'react'
import { DataTableQueries } from '../datatable/datatable.type';
import { ColumnsConfig, TableConfig } from './datatable.type';

interface DatatableContextProps {
  /**
     * Colunms Config with Table
     */
  columnsConfig: ColumnsConfig<any>;
  /**
   * Data source with Table
   */
  dataItems: any[];
  /**
   * Table Config
   */
  tableConfig: TableConfig<any>;
  /**
   * 
   * @param queries 
   * call function onSearch in Component
   */
  onSearch?: (queries: DataTableQueries) => void;

  /**
   * Info table: page, sort, size
   */
  dataTableQueries: DataTableQueries;
  /**
   * total item
   */
  totalItem: number;
  /**
   * Check display checkbox or radio of table
   */
  checkType?: 'checkbox' | 'radio';

}

export const DatatableContext = createContext<DatatableContextProps>(null);