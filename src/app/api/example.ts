import { DataTableQueries } from 'soumu/blocks/datatable/datatable.component'
import { ADM_MOCK_API } from 'app/const/env.const'
import { http } from 'app/services/http'

interface KanriInfoResponse {
  kanriInfo: KanriInfo[],
}

export interface KanriInfo {
  id: number,
  gyoNendo: number,
  kanKaNo: string,
  gyoBJoiKjnBan: number,
  gyoBruiKjnBan: number,
  gyoBruiLevel: number,
  gyoBruiCd: string,
  gyoBruiFnm: string,
  gyoJoiKjnBan: number,
  gyoBruiKyFlg: number,
  gyoBruiMemo: string,
  gyoBruiKctr: number,
  gyoBruiOrder: number,
  dispFlg: number,
  status: number,
  lastUpdate: string,
  hznKikanUnm: string,
  hznKikanTxt: string,
}

export function getDaibunruiListApi(queries: DataTableQueries, endPoint: string, isEnforced: boolean) {
  let filter = null

  filter = {
    ...queries.filter,
    pageNum: queries.page,
    pageSize: queries.size,
    sortBy: queries.sort?.dataKey || queries.filter?.sortBy || 'gyoBruiCd',
    sortType: queries.sort?.type?.toLocaleUpperCase() || queries.filter.sortType?.toLocaleUpperCase() || 'ASC',
    admType: +!isEnforced,
  }

  if (isEnforced) {
    filter.busyoFlg = '0';
  }
}

export function getDaibunruiList(queries: DataTableQueries, endPoint: string) {
  const filter = {
    ...queries.filter,
    pageNum: queries.page,
    pageSize: queries.size,
    sortBy: queries.sort?.dataKey || queries.filter.sortBy,
    sortType: queries.sort?.type.toLocaleUpperCase() || 'ASC',
  }

  const queryStr = new URLSearchParams(filter).toString();

  //TODO: remove this line when actual API works
  endPoint = 'daibunrui-list.json'

  return http.get<KanriInfoResponse>(`${ADM_MOCK_API}/${endPoint}?${queryStr}`, {
    customError: 'throwAndNotify',
  });
}
