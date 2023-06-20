import { ColumnsConfig, DataTableQueries, TableConfig } from './datatable.type';

export default interface TableProps {
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
   * 
   * @param items 
   * all function onSelectItem in Component
   */
  onSelectItem?: (items: any[]) => void;
  /**
   * 
   * @param items 
   * all function onActionClick in Component
   */
  onActionClick?: (items: any) => void;
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
