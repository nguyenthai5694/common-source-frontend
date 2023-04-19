import { ComponentType, MutableRefObject } from 'react'
import { BehaviorSubject } from 'rxjs';

export interface SortableQueries {
  dataKey: string,
  type: 'asc' | 'desc';
}

/**
 * Sample data table query structure
 * ```js
 * {
 *   page: 1,
 *   size: 20,
 *   sort: {
 *     key: 'data_key',
 *     type: 'asc',
 *   },
 *   filter: {
 *     filter_key_1: 'any type',
 *     filter_key_2: 'any type',
 *     ...
 *   }
 * }
 * ```
 */
export interface DataTableQueries<F = any> {
  /**
   * Default: 1
   */
  page: number;

  /**
   * Default: from API setting.
   */
  size: number;

  /**
   * Default: null
   */
  sort?: SortableQueries;

  /**
   * Default: null
   */
  filter?: F;
}

export interface HeaderMiddleProps<D = any> {
  /**
   * `filter` is `DataTableQueries.filter`.
   */
  onSearch?: (filter: { [filterKey: string]: any }) => void;

  /**
   * Set initial filter value
   */
  setFilter?: (filter: { [filterKey: string]: any }) => void;

  setRef?: (name, ref: any) => void;

  /**
   * Data is defined by `DataTableProps.headerMiddleData`.
   */
  data?: D;
}

export interface HeaderLowerProps {
  columnsConfig: ColumnsConfig<any>,
}

export interface CellComponentProps<DataItem = any, CustomData = any> {
  dataItem: DataItem;
  dataKey?: string;
  customData?: CustomData;
  /**
   * Current data item index;
   */
  index: number;
  clickAction?: (e?: any) => void;
  buttons?: string;
}

export type TablePageSizes = { label: string, value: number }[];

export type ColumnGroups = { startColumn: number, endColumn: number, label: string, }[];

export interface TableConfig<DataItem> {
  /**
  * This property must be used when you want to hidden header.
  */
  hideHeader?: boolean;

  /**
   * This property must be used when you want to override middle header block.
   */
  headerMiddle?: ComponentType<HeaderMiddleProps>;

  /**
   * This property must be used when you want to override lower header block.
   * - null: hide headerLower.
   * - ComponentType: use this component to render headerLower.
   *
   * By default, it have:
   * - pagination
   * - column display setting
   */
  headerLower?: ComponentType<HeaderLowerProps>;

  /**
   * Default: [{ label: 20件, value: 20 }, { label: 50件, value: 50 }, { label: 2100件, value: 100 }]
   * @deprecated Page size options will be getting from API.
   */
  pageSizes?: TablePageSizes;

  /**
   * _Weird but work_
   * Note: fixed column will not be able to setting as hidden.
   *
   * Default: 1
   */
  fixedColumnNumber?: number;

  /**
   * This property must be used when you don't want any fixed column
   */
  disableFixedColumn?: boolean;

  /**
   * TODO: support default value + rename.
   */
  rowSizes?: number[];

  /**
   * The unique property name from `DataItem`. Usually you will use something like `id`.
   *
   * "For goodness, please give me the truth - your real id" - someone cried.
   */
  idProp: keyof DataItem & string;

  columnGroups?: ColumnGroups;

  screenCd?: string;
  tableId?: number;

  /**
   * Callback to custom condition to display radio input.
   */
  showRadio?: (dataItem: DataItem) => boolean;

  /**
    * Callback to custom condition to display checkbox input.
  */
  showCheckBox?: (dataItem: DataItem) => boolean;

  fixedLastColunm?: boolean;
}

export interface ColumnConfig<DataItem = any> {
  /**
   * Column name/label.
   */
  label: string;

  /**
   * Value must be a property key of `DataItem`.
   */
  dataKey?: keyof DataItem & string;

  /**
   * Whether this column must be displayed.
   *  _(User can use "setting display column" feature to change this value)._
   *
   * Default: true
   */
  isVisible?: boolean;

  /**
   * Define whether this column can be setting as hidden.
   * IMPORTANT: There is new logic, fixed column will not be able to setting as hidden.
   *
   * Default: false(user can setting this column as hidden column).
   * @see TableConfig.fixedColumnNumber
   */
  disabled?: boolean;

  /**
   * Specify component that will be used to display cell content.
   * By defaut, it display plain text, so there is no need to use this property
   * if you don't want to custom cell content.
   */
  component?: ComponentType<CellComponentProps<DataItem>>;

  /**
   * Custom data will be passed to component(`ColumnConfig.component`) as a property named `customData`.
   */
  customData?: any;

  isSorted?: any;

  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';

  width: string;

  disableSort?: boolean;

  buttons?: string;
}

export type ColumnsConfig<DataItem = any> = ColumnConfig<DataItem>[];

export interface DataTableProps {
  innerRef?: MutableRefObject<DatatableContextProps>;

  tableConfig: TableConfig<any>;

  columnsConfig: ColumnsConfig<any>;

  dataItems: any[];

  currentPage?: number;

  totalItem?: number;

  pageSize?: number;

  /** TODO: refactor, too detail. */
  hasUpperContent?: boolean;

  /**
   * TODO: refactor, too detail.
   * @deprecated use `maxHeight` instead.
   */
  isUsedInModal?: boolean;

  hasDrag?: true;

  /**show warning when not record */
  disableShowWarning?: boolean;

  /**
   * TODO: refactor, too detail.
   * @deprecated remove later, use `hasDrag` is enough.
   */
  hasBorder?: boolean

  /**
   * Check show/hide table header template
   * Default: false
   */
  isHiddenTableHeader?: boolean;

  /**
  * Define how to select data item on datatable.
  * - 'radio': display radio input, user can choose only one data item.
  * - 'checkbox': display checkbox input, user can choose many data items.
  * - undefined: hide.
  *
  * Default: undefined
  */
  selectItemType?: 'radio' | 'checkbox';

  /**
   * This props allow client to remove selected value from data table.
   *
   * Example:
   * ```
   * Given: Datatable have 2 selected items.
   * When: Client set selectedItems = [].
   * Then: Datatable will update selected items to [].
   * ```
   *
   * _Notice: For now, this property is only allow client to remove selected items.
   * You can not control which item is selected._
   *
   * @deprecated it is useless now, it will be removed later.
   */
  selectedItems?: any[];

  /**
   * Callback to get selected data items.
   */
  onItemSelect?: (selectedItems: any[], isSelectedAllItems?: boolean) => void;

  headerMiddleData?: any;

  /**
   * Triggered when:
   * - DataTable componentDidMount.
   * - user apply search - click search button(**Notice**: `DataTableQueries.page` will be reset to 1).
   * - user apply sort(if there is no `onLocalSearch`).
   * - user change page number(if there is no `onLocalSearch`).
   * - user change page size(if there is no `onLocalSearch`).
   */
  onSearch?: (queries: DataTableQueries) => void;

  /**
   * When `onLocalSearch` exist, fetching data workflow will be changed as below:
   * - first(once time): run `onSearch` on componentDidMount to get all data.
   * - next time: sort, paging will invoke `onLocalSearch` instead of `onSearch`.
   */
  onLocalSearch?: (queries: DataTableQueries) => void;

  /**
   *  Callback to get order rows when add property: hasDrag = true
   */
  onUpdateOrderRows?: (e?) => void;

  /**
   * Callback that allow client to set class for table row
   */
  rowClass?: (dataItem) => string | void;

  /**
   * Usage:
   * ```tsx
   * import { useContext } from 'react'
   * import { DatatableContext } from 'common/blocks/datatable/datatable.component.tsx'
   *
   * useContext(DatatableContext).tableData;
   * ```
   */
  tableData?: any;

  defaultSortedColumn?: any;

  selectItemTitle?: string;

  /**
   * This prop is usefull when your modal display on a modal.
   *
   * NOTE: this value should be fixed.
   */
  maxHeight?: number;

  /**
   * TODO: refactor, it only work for one item.
   * @deprecated lack of many features; use `setSelectedItems` or `selectItemSubject` instead.
   */
  defaultItemSelected?: any;

  /**
   * TODO: refactor, like `defaultItemSelected`, only work for one item.
   */
  hiddenCheck?: number

  /**
   * Check show/hide checkbox all in table header template
   * Default: false
   */
  isHiddenCheckboxAll?: boolean;

  /**
   * Check show/hide pulldown checkbox all in table header template
   * Default: false
   */
  isHiddenPulldownCheckAll?: boolean;

  /**
   * If this value is provided, datatable will show 一覧表を広げる/元に戻す button
   * that allow user to expand datatable.
   *
   * Default: false.
   */
  enableExpandTable?: boolean;

  /**
   * Callback to get table expand state.
   */
  onToggleExpandTable?: (isExpand: boolean) => void;

  /**
   * If this value is provided, datatable will show 列の表示設定 button
   * that allow user to config header.
   *
   * Default: false.
   */
  disableConfigHeader?: boolean;

  /**
   * disable all checkbox
   *
   * TODO: refactor.
   */
  disableAllCheck?: boolean;
  /**
   * setting call api init
   */
  isCallApiInit?: boolean;
  /**
   * hidden all checkbox
   * Default: false.
   */
  isHiddenAllCheck?: boolean;
  /**
   * Case reset sort if page parent change screen using same table config
   * Default: undefined.
   */
  uuid?: string;
}

export interface LocalSearchHelper {
  paging: <D>(queries: DataTableQueries, allDataItems: D[], isPaging?: { isPaging: boolean }) => {
    dataItems: D[];
    currentPage?: number;
    // TODO: rename
    isPaging?: { isPaging: boolean };
  };
}

export interface DataTableState {
  sortData: SortableQueries;
  columnsConfig: ColumnConfig<any>[];
  tableConfig: TableConfig<any>;
  isTableExpand: boolean;
  settingData: string;
}

export interface HeaderLowerTemplateProps {
  columnsConfig: ColumnsConfig<any>;
  tableConfig: TableConfig<any>;
  pageSizeOptions: { label: string, value: number }[];
  onPageChange: (pageData: any) => void;
  changeColumns?: (columns: ColumnConfig<any>[]) => void;
  pageSize: number;
  totalItem: number;
  currentPage: number,
}

export interface DatatableContextProps<TableData = any> {
  currentPage: number;
  pageSize: number;
  totalItem?: number;
  tableData?: TableData;
  columnsConfig: ColumnConfig<any>[];
  tableConfig: TableConfig<any>;

  isTableExpand: boolean;

  /**
   * Whether table expand is enable.
   */
  enableTableExpand: boolean;

  toggleTableExpand: () => void;

  setTableExpand: (isTableExpand: boolean) => void;

  /**
   * Callback that allow client to set class for table row
   */
  rowClass?: (dataItem: any) => string | void;

  /**
   * @see DataTableProps.disableConfigHeader
   */
  disableConfigHeader: boolean;

  /**
   * Default: {}.
   */
  datatableRefs?: { [key: string]: any };

  /**
   * This prop is usefull when your modal display on a modal.
   *
   * NOTE: this value should be fixed.
   */
  maxHeight?: number;

  changeColumnsConfig?: () => void;

  setFilter: (filter: any) => void;

  setSort: (sort: SortableQueries) => void;

  storeFilter?: (currentPath, customData?) => void;
  removeDataSetting?: () => void;

  /**
   * You can control selected items with this object, but usually you only need to use setSelectedItems.
   */
  readonly selectItemSubject: BehaviorSubject<{ checkedList: any[], isSelectedAllItems: boolean }>;

  /**
   * Use this function when you want to select items after dataItems props is updated.
   */
  setSelectedItems: (checkedItems: any[], isSelectedAllItems: boolean) => void;
}
