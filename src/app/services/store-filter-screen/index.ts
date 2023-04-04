import { navPagesTitle } from 'app/const/common.const';
import 'soumu/utils/extension/storage-extensions.component';
import 'soumu/utils/extension/array-extensions.component';

interface DataTableScroll {
  top: number;
  tableLeftScroll: number;
  tableRightScroll?: number;
}

export interface StoreData {
  path: string;
  page: number;
  size: number;
  sort?: any;
  filter?: any;
  table?: DataTableScroll;
  columnsVisible?: Array<string>;
  customData?: any,
}

interface Breadcrumb {
  url: string;
  label: string;
}

const storeFilterScreen = 'store_filter_screen';
const forceUpdateFilterScreen = 'force_update_filter_screen';

export const getFilterScreenList = (): StoreData | null => {
  if (typeof (Storage) === 'undefined') return;

  return sessionStorage.getItems(storeFilterScreen).getLast();
}

const getPathForceFilter = (): string | null => {
  if (typeof (Storage) === 'undefined') return;

  return sessionStorage.getItems(forceUpdateFilterScreen).getLast();
}

export function setFilterScreenList(data: StoreData): void {
  if (typeof (Storage) === 'undefined') return;

  const tableLeft = document.querySelector('[data-table-wrap-left]');
  const tableRight = document.querySelector('[data-table-wrap-right]');

  if (tableLeft) {
    data.table = {
      top: tableLeft.scrollTop,
      tableLeftScroll: tableLeft.scrollLeft,
    }
  }

  if (tableRight) {
    data.table.tableRightScroll = tableRight.scrollLeft;
  }

  const storeFilters = sessionStorage.getItems(storeFilterScreen).filter(i => i.path !== data.path);

  storeFilters.push(data)

  sessionStorage.setItems(storeFilterScreen, storeFilters);
}

export function removeFilterScreenList(): void {
  if (typeof (Storage) === 'undefined') return;

  let storeFilters = sessionStorage.getItems(storeFilterScreen)
  let forceUpdateFilters;

  if (storeFilters.length) {
    sessionStorage.setItems(storeFilterScreen, storeFilters.removeLast());

    forceUpdateFilters = sessionStorage.getItems(forceUpdateFilterScreen)
    sessionStorage.setItems(forceUpdateFilterScreen, forceUpdateFilters.removeLast());
  }
}

export function getPathGoBackWithFilter(): string | null {
  if (typeof (Storage) === 'undefined') return null;

  const data = getFilterScreenList();

  if (data && data.path) {
    const forceUpdateFilters = sessionStorage.getItems(forceUpdateFilterScreen).filter(i => i !== data.path);

    forceUpdateFilters.push(data.path)
    sessionStorage.setItems(forceUpdateFilterScreen, forceUpdateFilters);

    return data.path;
  }

  return null;
}

export function getFilterStored(): StoreData | null {
  if (typeof (Storage) === 'undefined') return;

  const filterStored = getFilterScreenList();

  if (!filterStored) {
    return null;
  }

  const forceFilter = getPathForceFilter();

  if (forceFilter !== filterStored.path || !window.location.href.includes(filterStored.path)) {
    return null;
  }

  return filterStored;
}

export function getPathStored(): string | null {
  if (typeof (Storage) === 'undefined') return;

  const filterStored = getFilterScreenList();

  if (filterStored && filterStored.path) {
    return filterStored.path;
  }

  return null;
}

export function updateScrollTable(tableWrapperEle: HTMLElement, data: DataTableScroll): void {
  const tableLeft = tableWrapperEle.querySelector('[data-table-wrap-left]');
  const tableRight = tableWrapperEle.querySelector('[data-table-wrap-right]');
  const tableHeadLeft = tableWrapperEle.querySelector('[data-table-left-head]')
  const tableHeadRight = tableWrapperEle.querySelector('[data-table-right-head]')

  if (data.top) {
    tableLeft.scrollTop = data.top;
    tableLeft.scrollLeft = data.tableLeftScroll;
    tableHeadLeft.scrollLeft = data.tableLeftScroll;
  }

  if (data.tableRightScroll) {
    tableRight.scrollLeft = data.tableRightScroll;
    tableHeadRight.scrollLeft = data.tableRightScroll;
  }
}

export function getBreadcrumbStored(module): Breadcrumb | null {
  const pathStored = getPathStored();
  let breadcrumbItem = null;

  if (pathStored && navPagesTitle[module]) {
    for (let i = 0; i < navPagesTitle[module].length; i++) {
      if (pathStored === navPagesTitle[module][i].path) {
        breadcrumbItem = {
          url: navPagesTitle[module][i].path,
          label: navPagesTitle[module][i].title,
        }
        break;
      }
    }
  }

  return breadcrumbItem;
}

