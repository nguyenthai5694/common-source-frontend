import React from 'react'
import { cloneDeep } from 'lodash'
import { shallowEqual } from 'react-redux';
import { BehaviorSubject } from 'rxjs';
import { addToast, clearAllToast } from 'common/parts/toast/toast.service';
import GenericComponent from 'common/utils/generic/generic.component';
// import { isIE } from 'app/services/navigator';
import { setFilterScreenList, getFilterStored, StoreData } from 'app/services/store-filter-screen'
import { DatatableContext } from './datatable.context'
import DataTableTemplate from './datatable.template';
import {
  ColumnsConfig,
  DataTableState, DataTableProps, DataTableQueries,
  SortableQueries, TableConfig,
} from './datatable.type'

export * from './datatable.type';
export * from './datatable.context'
export * from './datatable.helper'

const defaultQueries: DataTableQueries = {
  page: 1,
  size: 10,
  sort: null,
  filter: null,
};

export class DataTable extends GenericComponent<DataTableProps, DataTableState>{
  private dataTableQueries: DataTableQueries = { ...defaultQueries };

  private originalColumnsConfig: ColumnsConfig<any>;

  private originalTableConfig: TableConfig<any>;

  private originalDefaultSortedColumn: SortableQueries;

  // Case reset sort if page parent change screen using same table config
  private originalTableUUID: string;

  private filterStored: StoreData | null = null;

  private isClickButtonSearch: boolean = false;

  /**
   * Contain of type of ref(Eg: formik ref, ...)
   */
  private datatableRefs = {}

  private defaultSort = {};

  private selectItemSubject = new BehaviorSubject({
    checkedList: [],
    isSelectedAllItems: false,
  });

  readonly pageSizeOptions = [];

  constructor(props) {
    super(props);

    this.state = {
      sortData: null,
      columnsConfig: this.props.columnsConfig,
      tableConfig: this.props.tableConfig,
      isTableExpand: false,
      settingData: '',
    };

    this.filterStored = getFilterStored();

    let pageSizeOptions = []
      .filter(item => item.yukouFlg !== 0);

    // if (isIE) {
    //   pageSizeOptions = pageSizeOptions.filter(item => Number(item.key) <= 100);
    // }

    const defaultPageSize = pageSizeOptions.find(item => item.default) || pageSizeOptions[pageSizeOptions.length - 1];

    this.dataTableQueries.page = this.filterStored ? this.filterStored.page : this.props.currentPage;
    this.dataTableQueries.size = this.filterStored ? this.filterStored.size : parseInt(defaultPageSize.key, 10);

    if (this.filterStored && this.filterStored.sort) {
      this.dataTableQueries.sort = this.filterStored.sort;
    }

    // this.originalDefaultSortedColumn = this.props.defaultSortedColumn;
    this.originalColumnsConfig = this.props.columnsConfig;
    this.originalTableConfig = this.props.tableConfig;
    this.originalTableUUID = this.props.uuid;

    this.pageSizeOptions = pageSizeOptions
      .map(item => ({
        label: item.longName,
        value: parseInt(item.key, 10),
      }))
  }

  componentDidMount() {
    const { onSearch, isCallApiInit = true } = this.props;

    if (this.props.tableConfig.screenCd && this.props.tableConfig.tableId) {
      this.fetchScreenSetting();
    }

    if (isCallApiInit) {
      onSearch && this.onApplySearch(false, false);
    }
  }

  componentDidUpdate() {
    this.handleShowWarning(this.props.dataItems)

    this.setTableConfig();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  }

  setSelectedItems = (checkedList, isSelectedAllItems = false) => {
    // The reason to use setTimeout here is for compatible with exist feature.
    // By default, when `dataItems` prop changed, all selected items will be cleared.
    // `setTimeout` is used to bypass this feature.
    setTimeout(() => {
      this.selectItemSubject.next({
        checkedList,
        isSelectedAllItems,
      });
    });
  }

  render() {
    const { props, state } = this;
    const columnsConfig = this.state.settingData ?
      getDataSettingStored(
        state.columnsConfig,
        this.state.settingData.split(','),
        props.tableConfig.fixedColumnNumber,
      ) :
      modifyColumnConfig(state.columnsConfig);

    return (
      <DatatableContext.Provider
        value={{
          selectItemSubject: this.selectItemSubject,
          setSelectedItems: this.setSelectedItems,
          columnsConfig,
          currentPage: props.currentPage,
          pageSize: props.pageSize || this.dataTableQueries.size, // search local not need props.pageSize
          totalItem: props.totalItem,
          tableData: props.tableData,
          enableTableExpand: !!props.enableExpandTable,
          tableConfig: state.tableConfig,
          setFilter: this.setFilter,
          setSort: this.setSort,
          storeFilter: this.storeFilter.bind(this),
          datatableRefs: this.datatableRefs,
          isTableExpand: state.isTableExpand,
          toggleTableExpand: this.toggleTableExpand,
          setTableExpand: this.setTableExpand,
          rowClass: props.rowClass,
          disableConfigHeader: !!props.disableConfigHeader,
          removeDataSetting: this.removeDataSetting,
          maxHeight: props.maxHeight,
        }}
      >
        <DataTableTemplate
          self={this}
          headerMiddleData={props.headerMiddleData}
          pageSize={props.pageSize || this.dataTableQueries.size} // search local not need props.pageSize
          totalItem={props.totalItem}
          hasUpperContent={props.hasUpperContent}
          isHiddenCheckboxAll={props.isHiddenCheckboxAll}
          isHiddenPulldownCheckAll={props.isHiddenPulldownCheckAll}
          isHiddenTableHeader={props.isHiddenTableHeader}
          hiddenCheck={props.hiddenCheck}
          disableAllCheck={props.disableAllCheck}
          isHiddenAllCheck={props.isHiddenAllCheck}
        />
      </DatatableContext.Provider>
    )
  }

  toggleTableExpand = () => {
    const { props, state } = this;
    const isTableExpand = !state.isTableExpand;

    this.setState({
      ...this.state,
      isTableExpand,
    }, () => {
      props.onToggleExpandTable &&
        props.onToggleExpandTable(isTableExpand);
    });
  }

  setTableExpand = (isTableExpand: boolean) => {
    this.setState({
      isTableExpand,
    })
  }

  setFilter = filters => {
    this.dataTableQueries.filter = filters;
  }

  setSort = (sort: SortableQueries) => {
    this.dataTableQueries.sort = sort;
  }

  setRef = (name: string, ref) => {
    this.datatableRefs[name] = ref;
  }

  onSort = (sort: SortableQueries) => {
    if (!this.dataTableQueries.sort) {
      this.dataTableQueries.sort = {} as SortableQueries;
    }

    this.dataTableQueries.sort.dataKey = sort.dataKey;
    this.dataTableQueries.sort.type = sort.type;

    this.setState({
      ...this.state,
      sortData: this.dataTableQueries.sort,
    });

    this.onApplySearch();
  }

  handleShowWarning = (data: Array<any> = []): void => {
    !this.props.disableShowWarning &&
      this.isClickButtonSearch && data && !data.length && addToast({ status: 'warn', title: text('DAECE220') });
    this.isClickButtonSearch = false
  }

  onSearch = filters => {
    this.isClickButtonSearch = true
    this.dataTableQueries.filter = filters;
    this.dataTableQueries.page = 1;
    clearAllToast();

    this.onApplySearch(true);
  }

  onPageChange = (pageData: any) => {
    clearAllToast();
    this.dataTableQueries.page = pageData.page;
    this.dataTableQueries.size = pageData.size;

    const { onSearch, onLocalSearch, dataItems } = this.props;

    this.resetSelectedItems();

    if (onLocalSearch && dataItems.length) {
      onLocalSearch(this.dataTableQueries);

      return;
    }

    onSearch(this.dataTableQueries);
  }

  onApplySearch = (forceCallApi = false, shouldResetSelected = true) => {
    const { onSearch, onLocalSearch, dataItems } = this.props;

    shouldResetSelected && this.resetSelectedItems();

    const queries = {
      ...this.dataTableQueries,
      page: !forceCallApi
        ? (this.filterStored ? this.filterStored.page : this.props.currentPage)
        : 1,
    };

    if (!forceCallApi && onLocalSearch && dataItems.length) {
      onLocalSearch(queries);

      return;
    }

    onSearch(queries);
  }

  onChangeColumns = (columnsConfig) => {
    this.setState({
      columnsConfig,
    });
  }

  getDefaultSortedColumn = () => {
    if (this.filterStored && this.filterStored.sort) {
      return this.filterStored.sort;
    }

    return this.defaultSort;
  }

  storeFilter = (path, customData) => {
    setFilterScreenList({
      ...this.dataTableQueries,
      path,
      customData,
      columnsVisible: this.state.columnsConfig
        .reduce((columns, item) => item.isVisible ? [...columns, item.dataKey] : columns, []),
    });
  }

  // ???????????
  updateColumnsVisible = (columnsVisible: Array<any>) => {
    if (columnsVisible) {
      const cloneColumns = cloneDeep(this.state.columnsConfig);
      const columns = cloneColumns.map(column => {
        if (columnsVisible.indexOf(column.dataKey) > -1) {
          column.isVisible = true;
        } else {
          column.isVisible = false;
        }

        return column;
      });

      this.onChangeColumns(columns);
    }
  }

  updateOrderRows = (items: Array<any>) => {
    if (items) {
      this.props.onUpdateOrderRows(items)
    }
  }

  private resetSelectedItems = () => {
    this.props.onItemSelect?.([], false);
  }

  private setTableConfig() {
    const { props } = this;

    if (
      !_.isEqual(this.originalColumnsConfig, props.columnsConfig) ||
      !_.isEqual(this.originalTableConfig, props.tableConfig) ||
      (this.originalTableConfig?.tableId !== props.tableConfig?.tableId) ||
      (this.originalTableUUID !== props.uuid)
    ) {
      const isNewTable =
        (this.originalTableConfig.tableId !== props.tableConfig.tableId &&
          props.tableConfig.tableId &&
          props.tableConfig.screenCd
        ) ||
        this.originalTableUUID !== props.uuid;

      // compatible with old code that use `defaultSortedColumn`
      const shouldResetSort =
        props.defaultSortedColumn !== this.originalDefaultSortedColumn;

      if (isNewTable || shouldResetSort) {
        this.defaultSort = {}
      }

      if (isNewTable) {
        this.fetchScreenSetting();
      }

      this.originalDefaultSortedColumn = props.defaultSortedColumn;
      this.originalColumnsConfig = props.columnsConfig;
      this.originalTableConfig = props.tableConfig;
      this.originalTableUUID = props.uuid;

      this.setState({
        columnsConfig: props.columnsConfig,
        tableConfig: props.tableConfig,
      });
    }
  }

  private fetchScreenSetting() {

  }

  removeDataSetting = () => {
    this.setState({
      ...this.state,
      settingData: '',
    })
  }
}

/**
 * Note: Currently, it is only looking for changing of 4 props.
 * All other props are considered as fixed or being changed together with these 4 props.
 *
 * Eg: When `dataItems` is changed, `totalItems`, `currentPage` and `defaultItemSelected` will be changed.
 */
function detectChanges(prevProps: DataTableProps, nextProps: DataTableProps) {
  return prevProps.dataItems === nextProps.dataItems &&
    prevProps.tableConfig === nextProps.tableConfig &&
    prevProps.columnsConfig === nextProps.columnsConfig &&
    prevProps.defaultItemSelected === nextProps.defaultItemSelected &&
    prevProps.uuid === nextProps.uuid;
}

export default React.memo(DataTable, detectChanges);

// TODO: move to service
function modifyColumnConfig(columnsConfig: ColumnsConfig) {
  return columnsConfig.map(column => {
    column.isVisible = column.isVisible === undefined ? true : column.isVisible;

    return column;
  });
}

// TODO: move to service
function getDataSettingStored(
  columnsConfig: ColumnsConfig,
  settingData: string[],
  fixedColumnNumber: number,
) {
  const normalFixNumber = fixedColumnNumber === -1 ?
    columnsConfig.length :
    fixedColumnNumber

  return columnsConfig.map((item, index) => {
    if (settingData.includes(item.dataKey)) {
      return {
        ...item,
        isVisible: true,
      }
    }

    if (index < normalFixNumber) {
      return {
        ...item,
        isVisible: true,
      }
    }

    return {
      ...item,
      isVisible: false,
    }
  })
}
