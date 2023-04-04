import * as _ from 'lodash'
import { DataTableQueries, LocalSearchHelper } from './datatable.type'

export const localSearchHelper: LocalSearchHelper = {
  paging: (queries: DataTableQueries, dataItems: any[], options: { isPaging: boolean }) => {
    let tmpDataItems = dataItems;

    if (queries?.sort) {
      tmpDataItems = _.orderBy(tmpDataItems, queries.sort.dataKey, [queries.sort.type || null]);
    }

    if (options && options.isPaging === false) {
      return {
        dataItems: tmpDataItems,
      }
    }

    if (!queries.size) {
      return {
        dataItems: tmpDataItems,
        currentPage: queries.page,
      }
    }

    const from = (queries.page - 1) * queries.size;

    tmpDataItems = tmpDataItems.slice(from, from + queries.size);

    if (tmpDataItems.length === 0 && queries.page !== 1) {
      return localSearchHelper.paging(
        { ...queries, page: queries.page - 1 },
        dataItems,
      );
    }

    return {
      dataItems: tmpDataItems,
      currentPage: queries.page,
    }
  },
};