/**
 * ルートの種別 ~ Route type
 * - kessai : 「決裁」ルート
 * - kyoran : 「供覧」ルート
 */
export enum RouteType {
  /**
   * 決裁 ~ Approval.
   */
  APPROVAL = 'kessai',

  /**
   * 供覧 ~ Exhibition.
   */
  EXHIBITION = 'kyoran',

}

/**
 * ルートの共有範囲 ~ Route share range
 */
export enum RouteShareRange {
  /**
   * すべて ~ All.
   */
  ALL = '',

  /**
   * 個人 ~ Personal.
   */
  PERSONAL = 'kojin',

  /**
   * 所属 ~ Department
   */
  DEPARTMENT = 'kyotsu',

  /**
   * 全庁共有 ~ Common.
   */
  COMMON = 'zencho',

  BUSHO = 'busho',

  POSITION = 'yakushoku',

  DOHO = 'doho',
}

export enum RootPathRouterModuleUnlock {
  ADM = '/adm',
  DAE = '/dae',
  REC = '/rec',
  USP = '/usp',
  MIM = '/mim',
}
