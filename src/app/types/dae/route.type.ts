
export interface GeneralRouteUser {
  /**
   * Temporary ID. It is not an ID from datatable, it can be an unique array index or
   * a combination of many stuff to make it unique.
   */
  id: string | number;

  /** katakana name of atesakiShimei, this is only exist when "route user" is individual */
  lblName?: string;

  /** ~ name of route user(it may be name of individual, group, ...) */
  lblName2: string;

  /** ~ atesakiBusho ~ department of approver */
  lblDepartment: string;

  /** ~ atesakiYakushoku */
  lblResponsible: string;

  /** ??? */
  lblResponsible2?: string;

  /** ??? */
  lblMail?: string;

  fullBushoName?: string;

  /** department name ??? */
  soshikiName?: string;

  /**
   * Whether this user is current person in charge(UI: highlight in route).
   */
  ankenFlag: AnkenFlag;

  /**
   * Whether this user/group did kessai(~ approval) before.
   */
  kessaiFlag: KessaiFlag;

  init: RouteDetail;

  editableByEndFlg?: boolean;
  //fake Position depends on Time with increasing value
  updatePositionAsTime?: number

  checkBeforeKessaiFlg?: boolean
}

export interface UserGroup {
  /**
   * It is NOT a status, it IS preview type.
   * - 0: なし
   * - 1: 回議時
   * - 2: 起案時
   *
   * _World has too many colors._
   */
  step?: number,
  status: KianPreviewType;

  users: GeneralRouteUser[];

  /** Original route group data. */
  originGroup?: RouteGroup;
  /** is Before current approval turn user group*/
  isBeforeEndFlg?: boolean;
  /** is current approval turn user group*/
  isHasEndFlag?: boolean;
  position?: RoutePosition,
}

export type StartUserInRoute = GeneralRouteUser;

/**
 * Fuzai type ~ Type of action to do when approver is absence ??? => need more information.
 */
export enum FuzaiTypeAsText {
  NONE = '',

  /** 後閲 ~ Read back ~ View(???) later. */
  READ_BACK = 'koetsu',

  /** 同報 ~ Broadcast ~ Send(???) for many people. */
  BROADCAST = 'doho',

  /** 代理 ~ Representative. */
  REPRESENTATIVE = 'dairi',

  /** 代決 ~ Representative of final approver. */
  FINAL_APPROVER_REPRESENTATIVE = 'daiketsu',
}

/**
 * Whether urge is needed
 */
export enum TokusokuTuchiUmu {
  YES = 1,
  NO = 0,
}

export enum RouteBoxType {
  /** 決裁ルート ~ Approval route. */
  APPROVAL_ROUTE = 0,

  /** 決裁ルート後ろ ~ Behind the approval route. */
  BEHIND_THE_APPROVAL_ROUTE = 1,

  /** 最終決裁者 ~ Final approver. */
  FINAL_APPROVER = 2,
}

/**
 * Backend has another standard to differentiate box type:
 * - `APIBoxType.DRAFT` is only relevant for backend API, it is the box that contain kiansha(~ drafter) information.
 * - `APIBoxType.APPROVER` include both `RouteBoxType.APPROVAL_ROUTE` and `RouteBoxType.BEHIND_THE_APPROVAL_ROUTE`.
 * - `APIBoxType.FINAL_APPROVER` === `RouteBoxType.FINAL_APPROVER`
 *
 * _(APIBoxType is not a good name)._
 */
export enum APIBoxType {
  /** 起案者 ~ Kiansha ~ Draft. */
  DRAFT = 0,

  /** 承認者 ~ Approver. */
  APPROVER = 1,

  /** 最後決裁者 ~ Final approver. */
  FINAL_APPROVER = 2,
}

export interface RouteBoxData {
  /**
   * Whether person in charge of this box(???) is drafter.
   */
  kiansha: boolean;

  /**
   * Wt*
   */
  non: boolean;

  saishukessaisha: boolean;

  /** 初任者 ~ Novice ??? */
  shoninsha: boolean;

  /** API box type. */
  type: APIBoxType;

  /**
   * Route box type in string(why it exists on earth, i have no idea).
   * __Note__: this value may be deprecated later because it is used nowhere.
   */
  typeString: string;
}

/**
 * Actually, it is NOT always a "user" as you think.
 * It can be an individual person or a group of people.
 */
export enum RouteUserType {
  /** 個人 ~ Indivisual. */
  INDIVIDUAL = 'kojin',

  /** 所属 ~ Affiliation. */
  AFFILIATION = 'busho',

  /** 役職 ~ Position ~ Job title. */
  POSITION = 'yakushoku',

  /** 他府省 ~ Other provinces. */
  OTHER_PROVINCES = 'doho',

  /** 紙処理へ ~ Kami processing change. */
  KAMI = 'kami',
}

export enum IncludePerson {
  YES = 1,
  NO = 0
}

/**
 * Whether this user is current person in charge(UI: highlight in route).
 */
export type AnkenFlag = boolean;

/**
 * Whether this user/group did kessai(~ approval) before.
 */
export type KessaiFlag = boolean;

/**
 * Route detail may contain information of 個人(~ individual), 所属(~ ???), 役職(~ Job title) or
 * 他府省(~ Other ministries) that take responsibility in route.
 */
export interface RouteDetail {
  fuzaiType?: FuzaiTypeAsText;

  /** Name of approver. */
  atesakiShimei?: string;

  /** Department of approver. */
  atesakiBusho?: string;
  atesakiBushoFullName?: string;

  /** Position(~ job title) of approver. */
  atesakiYakushoku?: string;

  atesakiBushoCode?: string;
  atesakiShimeiCode?: string;
  atesakiYakushokuCode?: string;
  atesakiHoshokuCode?: string;
  atesakiHoshoku?: string;
  atesakiEmail?: string;
  atesakiType: RouteUserType,

  /** Name of representative. */
  dairiShimei?: string;

  /** Position(~ job title) of representative. */
  dairiYakushoku?: string;

  /** Department of representative. */
  dairiBusho?: string;
  dairiBushoFullName?: string;

  dairiBushoCode?: string;
  dairiEmail?: string;
  dairiHoshoku?: string;
  dairiHoshokuCode?: string;
  dairiShimeiCode?: string;
  dairiYakushokuCode?: string;
  dairiYakuwari?: string;
  dairiYakuwariCode?: string;

  /**
   * Whether urge is needed
   */
  tokusokuTuchiUmu?: TokusokuTuchiUmu;

  /** ??? */
  step?: number;
  line?: number;
  row?: number;
  box?: number;

  // /**
  //  * @deprecated endFlag = 1
  //  */
  // ankenFlag?: AnkenFlag;

  // /**
  //  * @deprecated endFlag = 2
  //  */
  // kessaiFlag?: KessaiFlag;

  /**
   * - 1: ankenFlag = true
   * - 2: kessaiFlag = true
   */
  endFlag?: 0 | 1 | 2;

  /** ??? */
  dohoListId?: any;
  /** FushoCode. */
  atesakiFushoCode?: string;
  /** 府省名. */
  atesakiFusho?: string;
  /** */
  outOfDateNodeFlg?: boolean;
  // 閲覧状態フラグ
  etsuranJotaiFlg?: number;
  position?: PositionParamObj;
  ankenFlag?: boolean
  /**差し戻されたチェック */
  remand?: boolean;
  changedDeptFlg?: boolean;
}

export interface PositionParamObj {
  box: number,
  firstOfRouteGroup: boolean,
  line: number,
  row: number,
  step: number,
  stepLineKey: string,
}
export enum KianPreviewType {
  /** なし ~ None. */
  NONE = 0,

  /** 回議時 ~ When reconsidering. */
  WHEN_RECONSIDERING = 1,

  /** 起案時 ~ At the time of drafting. */
  WHEN_DRAFTING = 2,
}
/**
 * Route group ~ route box.
 */
export interface RouteGroup {
  /** 督促 ~ Urge. */
  tokusokuTuchiUmu: TokusokuTuchiUmu;

  /**
   * 事前閲覧 ~ Preview type
   */
  kianPreviewFlg: KianPreviewType;

  listRouteDetail: RouteDetail[];

  /** Actually, it contain route box data, it must be renamed to boxData. */
  boxType: RouteBoxData;

  /**
   * Step may be considered as big group of tasks. Step 0 done, go to step 1 and so on.
   * - step look like x y coordinates, it may contain many rows(x), lines(~ y ~ line is column).
   * - step count from 0.
   * - the first step(step = 0) is starting point, listRouteDetail array will has only one `RouteDetail`.
   */
  step: number;

  /**
   * Row in step.
   * - row count from 0.
   */
  row: number;

  /**
   * Actually, it is column in step(why it is named as line, i don't know, world has many colors).
   * - line count from 0.
   */
  line: number;
}

/**
 * This is whole route data interface.
 */
export interface RouteStructure {
  startUser: StartUserInRoute,
  kessaiRoot: UserGroup[][][],
  endUserGroup: UserGroup,
  afterKessaiRoot: UserGroup[][][],
}

export enum RouteLevel {
  /** 編集時、階層無視して上書き ~ When editing, ignore the hierarchy and overwrite. */
  WHEN_EDITING = -1,

  /** 1階層目 ~ 1st layer. */
  FIRST_LAYER = 0,

  /** 2階層目 ~ 2nd layer. */
  SECOND_LAYER = 1,

  /** 3階層目 ~ 3rd layer. */
  THIRD_LAYER = 2,
}

export type ChangeKessaiRouteFunc = (
  kessaiRoot: UserGroup[][][] | ((kessaiRoot: UserGroup[][][]) => UserGroup[][][])
) => void;

export type ChangeAfterKessaiRouteFunc = (
  kessaiRoot: UserGroup[][][] | ((kessaiRoot: UserGroup[][][]) => UserGroup[][][])
) => void;

export type ChangeEndUserGroupFunc = (
  userGroup: UserGroup | ((userGroup: UserGroup) => UserGroup)
) => void;

export type ChangeAssigningBeforeEndFlgUsersFunc = (
  newUserGroup: RouteDetail[]
) => void;
interface ArrayTuple<V1, V2, V3> extends Array<V1 | V2 | V3> {
  0: V1, 1: V2, 2: V3,
}

/**
 * RoutePosition is related to RouteLevel:
 * - First number: `RouteLevel.FIRST_LAYER`.
 * - Second number: `RouteLevel.SECOND_LAYER`.
 * - Thrid number: `RouteLevel.THIRD_LAYER`.
 * 
 * @see RouteLevel 
 */
export type RoutePosition = ArrayTuple<number, number, number>;

export enum RouteSettingStatus {
  INIT = 0,

  CURRENT_FUSHO = 1,

  TAFUSHO = 2,

  ASSIGNING = 3,
}

/**
 * 現決裁者有無
 */
export enum END_FLAG {
  NONE = undefined,
  INIT = 0,
  CURRENT_TURN = 1,
  PASS_TURN = 2,
}

/**
 * ルールノード位置
 */
export type RouteNotePosition = {
  step: number;
  box: number;
  line: number;
  row: number;
}

export const TAFUSHO_CD_DEFAULT = 0;

/**
 * 位置変更・削除ました同報・後閲ユーザリスト
 */
export interface DohoKoetsuUser {
  //同報・後閲
  fuzaiType?: FuzaiTypeAsText;
  //部署コード
  atesakiBushoCode?: string;
  //ユーザコード
  atesakiShimeiCode?: string;
  //ルール位置
  step?: number;
  line?: number;
  row?: number;
  box?: number;
}

//閲覧状態フラグ
export enum EtsuranJotaiFlg {
  /* 閲覧状態フラグ: 0:閲覧なし*/
  ETSURAN_JOTAI_FLG_NONE = 0,
  /* 閲覧状態フラグ: 1:未閲覧*/
  ETSURAN_JOTAI_FLG_WAITING = 1,
  /* 閲覧状態フラグ: 2:閲覧済*/
  ETSURAN_JOTAI_FLG_COMPLETED = 2,
}