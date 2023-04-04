/* eslint-disable max-lines */
export enum IntegrationHistory {
  NONE = 0,
  DIVIDED = 1, // 分割
  INTEGRATED = 2, // 統合
}

export enum HiKessaiFlag {
  ADM = 1,
  OTHER_SERVICES = 0
}
export enum IraiStatus {
  APPROVAL_PENDING = 1,
  EXAMINED = 2
}

/**
 * @deprecated use KEYWORD_MAX_WORDS in common.const.ts file instead
 */
export const KEYWORD_MAX_WORDS = 10

/**
 * @deprecated use MAX_WORD_NOTES in common.const.ts file instead
 */
export const MAX_WORD_NOTES = '※文字数は最大100文字、ワードは10個までスペース区切りで入力可能'

export const OTHERS_TEXT = 'その他'

export const OFFICIAL_DOC_LAW_CATEGORY = '公文書管理法'

export const WRONG_DATE = '日付のフォーマットが異なります。'

export const MAX_LENGTH_FILE_NAME = 'ファイル名は64文字以下でなければなりません。'

export const DELETE_OR_DISCARD = '本文書の状態が削除また廃案済みであるため、再度ご確認ください。'

//ADMCE054
export const PROCESS_FAIL = '処理中にエラーが発生しました。'

export const MAX_LENGTH_CODE = 10999;

export const MAX_LENGTH_KEYWORD = 2199;

export const DEPARTMENT_FIELD_NAME = '所管換先部署'

export enum WarningMessage {
  //ADMCE038
  RETENTION_PERIOD_EXPIRED = '保存期間満了時期は期間外です。',
  //ADMCE121
  IMPORTANT_DOCUMENT = '選択された行政文書ファイルにて廃棄時に歴史資料として重要な公文書が含まれています。',
  CANCEL_CONFIRMATION = '取消します。\nよろしいですか？',
  DELETE_CONFIRMATION = '削除すると元に戻すことができません。\n本当によろしいですか？',
  DISPOSAL_CONFIRMATION = '内閣の重要政策等に関する企画立案を廃案にしてもよろしいですか？',
  UNDECIDED_IS_SELECTED = '起算日に未定が選択されています。',
  ADMCI030 = '延長取消を行います。\nよろしいですか？',
  NO_SEARCH_DATA = '検索結果：0件です。検索条件を変えて、再度検索を実施してください。',
  //ADMCI035
  REGISTER_CONFIRMATION = '登録します。\nよろしいですか？',
  HAS_CHANGED = '状態が変更されているため、修正できません。',
  REQUEST_CANCELLATION = '依頼取下げます。\nよろしいですか？',
  CONFIRM_BACK_TO_LIST = '入力状態が破棄されます。 \nよろしいですか？'
}

export enum ErrorMessage {
  MULTIPLE_ITEM_SELECTED = 'データが複数選択されています。',
  SAVE_PERIOD_EXPIRATION_NOT_ENTERED_AFTER = '保存期間満了日が入力されていません。',
  SAVE_PERIOD_EXPIRATION_NOT_ENTERED_BEFORE = '保存期間満了時期が入力されていません。',
  //ADMCE038
  RETENTION_PERIOD_EXPIRED_AFTER = '保存期間満了日は期間外です。',
  RETENTION_PERIOD_EXPIRED_BEFORE = '保存期間満了時期は期間外です。',
  RE_ENTER_SEARCH_INPUT = '検索語を再入力してください',
  NO_DATA = 'データがありません。',
  DOWNLOAD_EXPORT_NULL_DATA = 'データがありません。',
  DOWNLOAD_EXPORT_DATA_HAS_DELETED = '選択したデータは存在しません。',
  NO_TARGET_FOR_COMPLETION_PROCESSING = '完了処理待の対象が無い明細が選択されています。',
  //ADMCE037
  EXPIRATION_MEASURE_NOT_ENTERED = '保存期間満了時の措置はRSチェック項目でご設定ください。',
  ITEM_SELECTED_NOT_GOOD_STATUS = '公文書館受領審査済の対象が選択されていません。',
  ITEM_SELECTED_NOT_GOOD_STATUS_UNCONFIRMED = '公文書館未確認の対象が選択されていません。',
  NO_DATA_SELECTED = 'データが選択されていません。',
  INVALID = '状態が不正です。',
}

export enum ConfirmationMessage {
  EXTENDED_GENERAL_ADMIN_EXAM_COMPLETED = '延長審査します。\nよろしいですか？',
  EXTENDED_FINISH = '延長完了します。\nよろしいですか？',
  //ADMCE083
  SEND_BACK_UNRECEIVED_FILE = '未受領ファイルを差戻してください。',
  REVIEWED_FOR_RECEIPT = '公文書館受領審査済の対象が無い明細が選択されています。',
  //ADMCI041
  CONFIRM_SETTING_CANCEL = '設定します。\nよろしいですか？',
  //ADMCI039
  // eslint-disable-next-line max-len
  CONFIRM_DOWNLOAD_PDF = '行政文書資料構成をまとめてPDFでダウンロードします。\nよろしいですか？\n\nブラウザでPDFファイルを表示した場合は、特定のフォントに変換されます。\nフォントを正しく表示する場合は、ダウンロードしたファイルをブラウザ以外（Adobe Reader等）で表示してください。',
  //ADM-SC010610 not msg code
  CONFIRM_ONLY_DOWNLOAD_DRAFT_PAPER = '作成済み起案用紙をダウンロードします。\nよろしいですか？',
}

export const SUCCESS_MESSAGE = '処理が完了しました。'

export const RS_SUCCCESS_MESSAGE = 'RS設定が完了しました。'

export const MULTIPLE_SUCCESS_ITEM = '一括処理が完了しました。'

export enum InputErrorMessage {
  // Required field is not entered - ADMCE009
  INPUT_NOT_ENTERED = 'が入力されていません。',

  // Reason field is not entered - ADMCE018
  REASON_NOT_ENTERED = '理由が入力されていません。',

  HANDOVER_DATE_NOT_BETWEEN = '移管日が無効です。',

  RS_NOT_ENTERED = 'RSチェック項目が設定されていません。'
}

export enum ClassificationErrorMessage {
  CLASSIFICATION_REVIEW_EDIT = '分類審査中の分類は、編集できません。',
  CLASSIFICATION_REVIEW_MOVE = '分類審査中の分類は、所管換できません。',
  CLASSIFICATION_REVIEW_MOVE_MULTI = '分類審査中の分類が含まれています。所管換できません。',
  CLASSIFICATION_REVIEW_DELETE = '分類審査中の分類は、削除できません。',
  //ADMCE030
  CLASSIFICATION_HAS_CHILD_BEING_SAVED = '下位分類が存在するため削除できません。',
  CLASSIFICATION_DELETED = '既に削除されています。',
  //ADMCW001
  CLASSIFICATION_CONFIRM_CHILD_DELETE = '3カ月経過前ですが、削除しますか？',
  CLASSIFICATION_CONFIRM_CHILD_DELETE_3MONTH = '削除取消期間内の情報が含まれていますが、削除しますか？',
  //ADMCE029
  HIGHER_CLASSIFICATION_REVIEW = '上位分類が作成・修正・削除申請中のため処理できません。',
}

export enum NotValidMessage {
  //ADMCE097
  inValid_Rs_CheckItem = '総文管審査済の状態が含まれているため、RS設定できません。',
  inValid_Remand = '総文管審査済の状態が含まれているため、差し戻せません。',
  //ADMCE070
  inValid_Approve = '差戻しの状態が含まれているため、承認できません。',
  //ADMCE098
  inValid_Success = '総文管審査済の状態が含まれているため、承認できません。',
  //ADMCE096
  inValid_Rs_Setting = '総文管審査中の状態が含まれているため、内閣府へ確認依頼できません。',
  inValid_No_RsSetting = 'RS設定はまだ完了されていないため、承認できません。'
}

export enum TreeLink {
  LNK_MAJOR_CATE_TREE = 0,
  LNK_MIDDLE_CATE_TREE = 2,
  LNK_SMALL_CATE_TREE = 3,
  LNK_STANDARD_CATE_TREE = 4,
  LNK_FILE_KEEPER = 5,
  LNK_AMIN_DOCUMENT = 6,
}

export enum CreationAcquisitionStatus {
  /**
   * 1952以前"を出力 - before 1953
   */
  _1952 = 0,
  /**
   * 1953以降"を出力 - after 1953
   */
  _1953 = 1,
  /**
   * NG!
   */
  _ERROR = 2,
  /**
   * Not input
   */
  _NONE = 3,
}

export enum AuthoritySwitchingOption {
  GENERAL_STAFF = '一般職員',
  DOCUMENT_MANAGER = '文書管理者',
}

export enum AuthoritySwitchingOptionValue {
  GENERAL_STAFF = 1,
  DOCUMENT_MANAGER = 2,
}

export enum GeneralStaffStatus {
  ALL = 'すべて',
  SAVING = '保存中',
  UNDER_EXAMINATION = '文管審査中',
  UNDER_REVIEW = '総文管審査中',
  COMPREHENSIVE_EXAM_COMPLETED = '総文管審査済',
  CABINET_OFFICE_UNCONSULTED = '内閣府未協議',
  UNDER_DISCUSSION_CABINET_OFFICE = '内閣府協議中',
  UNDER_DISCUSSION_ARCHIVES = '公文書館協議中',
  UNDER_FINAL_DISCUSSION_CABINET_OFFICE = '内閣府最終協議中',
  CABINET_OFFICE_TALKS_COMPLETED = '内閣府協議完了',
  REMAND = '差戻し',
  ARCHIVES_UNEXAMINED = '公文書館受領未審査',
  UNDER_EXAMINATION_RECEIPT_ARCHIVES = '公文書館受領審査中',
  ARCHIVES_REVIEWED_RECEIPT = '公文書館受領審査済',
}

export enum GeneralStaffStatusAsValue {
  ALL = 1,
  SAVING,
  UNDER_EXAMINATION,
  UNDER_REVIEW,
  COMPREHENSIVE_EXAM_COMPLETED,
  CABINET_OFFICE_UNCONSULTED,
  UNDER_DISCUSSION_CABINET_OFFICE,
  UNDER_DISCUSSION_ARCHIVES,
  UNDER_FINAL_DISCUSSION_CABINET_OFFICE,
  CABINET_OFFICE_TALKS_COMPLETED,
  REMAND,
  ARCHIVES_UNEXAMINED,
  UNDER_EXAMINATION_RECEIPT_ARCHIVES,
  ARCHIVES_REVIEWED_RECEIPT,
}

export enum ReasonType {
  /**
   * 空欄 - Blank
   */
  BLANK = 0,

  /**
   * 誤登録 - Register error
   */
  REGISTER_ERROR = 1,

  /**
   * 誤記載 - Mistake
   */
  MISTAKE = 2,

  /**
   * 未使用 - Not used yet
   */
  NOT_USED_YET = 3,

  /**
   * その他 - Others
   */
  OTHERS = 8,
}

export enum DetailType {
  CREATE = 1,
  EDIT = 2,
  DELETE = 3,
}

export enum DisplaySwitch {
  YES = 1,
  NONE = 0
}

export enum DisplaySwitchError {
  NOT_INPUT = '本文（紙）が入力されていません。',
  ALREADY_INPUT = '本文（紙）が入力されています。'
}

export enum SourceScreen {
  SHINSABUNRUILIST = 'ADM-SC040101',
  SHINSABUNRUIKANRYO_LIST = 'ADM-SC040108',
  SHINSABUNRUI_SHINSACHOKULIST = 'ADM-SC040107',
  SHINSABUNRUILIST_DAIBUNRUI_DETAIL = 'ADM-SC040103',
  SHINSABUNRUILIST_CHUBUNRUI_DETAIL = 'ADM-SC040104',
  SHINSABUNRUILIST_HYOJYUNGYOSEI_DETAIL = 'ADM-SC040105',
  SHINSAIKANKYOGISHINCHOKUBUSHOLIST = 'ADM-SC021303',
  RSKAKUNINIRAILIST = 'ADM-SC020201',
  GYOSEBUNSYOFILE_DETAIL = 'ADM-SC010514',
  RSKAKUNINFILELIST = 'ADM-SC100104',
  GYOSEBUNSYOFILESANSHO_SEARCH = 'ADM-SC060106',
  GYOSEBUNSYO_LIST = 'ADM-SC010601',
  EXTENDED_EXAMINAION_LIST = 'ADM-SC021108',
  HAIKIKYOGISHINCHOKUREQUEST = 'ADM-SC021206',
  HAIKIKYOGISHINCHOKUREQUEST_LIST = 'ADM-SC021205',
  HIKITSUGUSHINSALISTSOKATSU_DETAIL = 'ADM-SC030202',
  HIKITSUGU_SETTING_LIST = 'ADM-SC030101',
  GYOSEI_BUNSYO_SEARCH = 'ADM-SC070101',
  HAIKIKYOGIIRAI_LIST = 'ADM-SC021101',
  HAIKIIKANHOZONKIKAN_LIST = 'ADM-SC021007',
  HAIKIFILELIST = 'ADM-SC110105',
  JYURYOIRAIFILE_LIST = 'ADM-SC120107',
  SHOUKAISETTEI = 'ADM-SC100116',
  SHOUKAIDETAILS = 'ADM-SC100117',
  RSLISTRSCHECKITEMDETAIL = 'ADM-SC020206',
  ENCHOUKANRYOU_HISTORY = 'ADM-SC021403',
  RECEIPTREQUESTLIST = 'ADM-SC021302',
  BATCHHIKITSUGU_SETTING_LIST = 'ADM-SC021023',
  GYOSEBUNSYOFILE_BUNKATSU_KATSUSAKI = 'ADM-SC010517',
  BATCHHIKITSUGUADDSEARCH = 'ADM-SC030102',
  BAT_RETENTION_PERIOD_EXTENTION_SETTING_RESULT = 'ADM-SC021028',
  BOSATSUEDIT = 'ADM-SC010521',
  GYOSEIFILEIKAN = 'ADM-SC021003',
  GYOSEBUNSYOFILEHIKITSUGI = 'ADM-SC010506',
  GYOSEIFILEIKANCANCEL = 'ADM-SC021004',
  BATCHHAIKIIKANHOZONKIKANSEARCH = 'ADM-SC021008',
  SHINSAHAIKIKYOUGISHINCHOKUBUSHO_LIST = 'ADM-SC021206',
  RSCHECKITEM_DETAIL_MODAL = 'ADM-SC040106',
  JYURYOIRAILIST = 'ADM-SC120103',
  BATCHRSSETTINGLIST = 'ADM-SC020108',
  JYURYOIRAI_HISTORY_DETAILS = 'ADM-SC120202',
  HAIKISHINSA_HISTORY_DETAILS = 'ADM-SC110202',
  FUDOUIRIYUU = 'ADM-SC110110',
  JYURYOIRAIHISTORY_LIST = 'ADM-SC120201',
  JYURYOIRAIGOUPDATEHISTORY_DETAIL = 'ADM-SC120403',
  JYURYOIRAIGOTORISAGE_DETAIL = 'ADM-SC120404',
  UNDERONEYEARFILE_HAIKIDATE_SETTING = 'ADM-SC021021',
  KAKUNINKANRYOICHIRAN = 'ADM-SC020112',
  RSSETTINGKAKUNINZUMIFILELIST = 'ADM-SC020105',
  RSKAKUNINHISTORYDETAIL = 'ADM-SC100202',
  RSKAKUNINIRAIATOUTORISAGEDETAIL = 'ADM-SC100304',
  RSSETTINGFILESHINCHOKU = 'ADM-SC100112',
  RSKAKUNINIRAIATOU_CHANGE_HISTORY_DETAIL = 'ADM-SC100303',
  TENPUBUN_KEYWORD_SEARCH = 'ADM-SC080101',
  KANAIBUNSYO_LIST = 'ADM-SC090101',
  HIKITSUGUZUMI_FILE_LIST = 'ADM-SC030202',
  GYOSEBUNSYOFILESEARCH = 'ADM-SC060101',
  HAIKIIKANFAIRUSHINCHOKUKANRI_LIST = 'ADM-SC100114',
  HAIKIZUMIKANRYO_LIST = 'ADM-SC021401',
  BOSATSUKANIDO = 'ADM-SC010522',
  CHUBUNRUILIST = 'ADM-SC010201',
  GYOSEBUNSYOFILELIST = 'ADM-SC010511',
  INQUIRYSETTINGSREFERENCESEARCH = 'ADM-SC100118',
}
/* The options for general staff and document manager is the same right now,
so I will just export an alias in case the requirements is changed */
export { GeneralStaffStatus as DocumentManagerStatus, GeneralStaffStatusAsValue as DocumentManagerStatusAsValue }

export enum KanriboFlgDisp {
  BOOK_REGIST = 0,
  BOOK_NOT_REGIST = 1,
}

export enum YokouFlg {
  KISANBI_YUKOU_FLG_0 = 0,
  KISANBI_YUKOU_FLG_1 = 1,
}

export enum HznEnchoYukouFlag {
  HZN_ENCHO_YUKOU_FLAG_0 = 0,
  HZN_ENCHO_YUKOU_FLAG_1 = 1,
}

export enum StoragePeriod {
  BLANK = -1,
  OTHER = 1000,
  LESS_THAN_A_YEAR = 0,
  EXPIRATION_DATE_SPECIFIED = 1002,
  USUALLY_USE = 1001,
  MANY_YEARS = 999,
  SPECIAL = 2000
}

export enum StorageLocation {
  OTHER = '99',
}

export enum MediumType {
  OTHER = 3,
}

export enum InfoPublicClass {
  PUBLIC = 1,
  PARTIALLY_PRIVATE = 2,
  PRIVATE = 3,
}

export enum StartDate {
  BLANK = -1,

  /**
  * 作成、取得の日（＝「作成（取得）時期」)
  */
  DATE_OF_CREATION = 1,

  /**
  * 翌年度の始期（４月１日）~ The beginning of the next chronological year(April 1st)???
  */
  BEGINNING_NEXT_YEAR_BUSINESS = 2,

  /**
   * 翌年の始期（１月１日） ~ The beginning of the following year (January 1).
   */
  BEGINNING_NEXT_YEAR = 3,

  /**
   * 翌事業年度の始期（７月１日）~ The beginning of the next business year (July 1).
   */
  BEGINNING_OF_THE_NEXT_BUSINESS_YEAR = 4,

  /**
   * 翌月の１日 ~ The beginning of the next month.
   */
  FIRST_DAY_OF_NEXT_MONTH = 5,

  /**
  * 特定の日 ~ Specific day.
  */
  SPECIFIC_DAY = 6,

  /**
   * 作成、取得の日の翌日 ~ After creation date.
   */
  AFTER_DATE_CREATION_AND_ACQUISITION = 7,

  /**
  * 未定 ~ Undecided.
  */
  UNDECIDED = 9,
}

export enum StartDateText {
  UNDECIDED = '未定'
}

export const StartDatesWithLabel = [
  StartDate.BEGINNING_NEXT_YEAR_BUSINESS,
  StartDate.BEGINNING_NEXT_YEAR,
  StartDate.FIRST_DAY_OF_NEXT_MONTH,
  StartDate.AFTER_DATE_CREATION_AND_ACQUISITION,
]

export enum TreeLevel {
  LEVEL_2 = '2',
  LEVEL_3 = '3',
  LEVEL_4 = '4',
  LEVEL_5 = '5',
  LEVEL_6 = '6',
}

export enum CabinetOfficeRSStatus {
  REQUEST_WAITING = '内閣府RS確認依頼待',
  CONFIRMING = '内閣府RS確認中',
}

export enum GyoseiFileHozonikanencho {
  APPLICATION_REASON_NOTE = '※保存期間延長の該当理由に「8.その他」を選択した場合は、その理由を上枠に入力してください。',
  REMARKS_NOTE = '※備考欄には、延長回数が２回以上になる場合、不同意の理由を参酌して保存期間満了時の措置を見直した場合などに、その旨を記入してください。'
}

export enum ReasonValue {
  OTHER = '8'
}

export enum PatternMapValue {
  NOT_USE = 2,
  USE = 1
}

export enum ScreenPath {
  KANAIBUNSYOLIST = '/adm/kanaibunsyolist',
  SHINSABUNRUILIST = '/adm/shinsabunruilist'
}

export const HOZON_TERM_CODE = 1000;
export const EXPIRATION_SPECIFIED_CODE = 1002;
export enum HozonTermCode {
  OTHER = HOZON_TERM_CODE,
  LESS_THAN_1_YEAR = 0,
}

export enum WarningCode {
  ADMSE029 = 'ADMSE029',
  ADMSE028 = 'ADMSE028',
  ADMSE073 = 'ADMSE073',
  ADMSE102 = 'ADMSE102',
  ADMSE079 = 'ADMSE079',
  ADMSE143 = 'ADMSE143',
  ADMSE144 = 'ADMSE144',
  ADMSE157 = 'ADMSE157',
  ADMSE500 = 'ADMSE500',
  ADMSE571 = 'ADMSE571',
  ADMSE179 = 'ADMSE179',
  ADMSE178 = 'ADMSE178',
  ADMSE241 = 'ADMSE241'
}

export enum MailCode {
  EXAMINE_CREATE = 44,
  EXAMINE_EDIT = 48,
  EXAMINE_DELETE = 51,
  APPROVAL_TAKEOVER_NOTIFICATION = 1,
  CANCELATION_EXAMINATION_REQUEST = 68,
}

export const LENGTH_SELECT_ALL_LAW = [0, 2]

export const DOCUMENT_REGISTRATION = '1'

export enum ValidateMessage {
  STARTING_DATE_UNDECIDED = '起算日に未定が選択されています。',
  STARTING_DATE_NOT_ENTERED = '起算日が入力されていません。',
  EXPIRATION_DATE_NOT_ENTERED = '保存期間満了時期が入力されていません。',
  STORAGE_PERIOD_NOT_ENTERED = '保存期間満了日が入力されていません。',
  LESS_THAN_ONE_YEAR_BEFORE_ENFORCEMENT = '保存期間満了時期は起算日の１年未満としてください。',
  LESS_THAN_ONE_YEAR_AFTER_ENFORCEMENT = '保存期間満了日は起算日の１年未満としてください。',
  // LESS_THAN_ONE_YEAR_BEFORE_ENFORCEMENT_OF_FINANCIAL_YEAR = '保存期間満了時期は起算日の１年未満としてください。',
  // LESS_THAN_ONE_YEAR_AFTER_ENFORCEMENT_OF_FINANCIAL_YEAR = '保存期間満了日は起算日の１年未満としてください。',
  STORAGE_PERIOD_EXPIRES_OUTSIDE = '保存期間満了時期は期間外です',
  EXPIRATION_DATE_EXPIRES_OUTSIDE = '保存期間満了日は期間外です',
  RETENTION_PERIOD_CALCULATION_IS_NOT_SET = '保存期間算出が設定されていません。',
  ONLY_NUMBERS_AND_SPACES_MESSAGE = '数字とスペースのみを入力してください'
}

export enum DepartmentErrorMessage {
  NOT_SELECTED = '管理部署が選択されていません。',
}

export enum AuthorityOption {
  CABINET_OFFICE = '内閣府',
  NATIONAL_ARCHIVE_JP = '公文書館',
}

export enum AuthorityOptionValue {
  CABINET_OFFICE = '0',
  NATIONAL_ARCHIVE_JP = '1',
}

export enum NationalArchiveStatusOption {
  CHECKING_ARCHIVES = '公文書館審査中',
}

export enum NationalArchiveStatusOptionValue {
  CHECKING_ARCHIVES = '3',
}

export enum CabinetOfficeStatusOption {
  ALL = 'すべて',
  CABINET_OFFICE_UNCONFIRMED = '内閣府未審査',
  CABINET_OFFICE_UNDER_CONFIRMATION = '内閣府審査中',
  CABINET_OFFICE_UNDER_FINAL_CONFIRMATION = '内閣府最終審査中',
}

export enum CabinetOfficeStatusOptionValue {
  ALL = '0',
  CABINET_OFFICE_UNCONFIRMED = '1',
  CABINET_OFFICE_UNDER_CONFIRMATION = '2',
  CABINET_OFFICE_UNDER_FINAL_CONFIRMATION = '4',
}

export const ENTER_KEY = 'Enter'

export const WITH_REASON = '理由あり'

export const WITHOUT_REASON = '理由なし'

export enum ExtendedStatusCode {
  ALL = -1,
  APPLY = 1,
  COMPLETE = 2,
  DEPARTMENT_CHECK = 5,
  DEPARTMENT_COMPLETE = 6,
}

export enum ExtendedRsCheckSettingStatusCode {
  CONFIGURED = '1',
  NOT_USE = '2',
  CONFIRMED = '3',
  CORRECTED = '4',
  NOT_SET = '0'
}

export enum ExtendedRsCheckSettingStatusText {
  CONFIGURED = '設定済',
  CONFIRMED = '確認済',
  CORRECTED = '修正済',
  NOT_SET = '未設定',
}

export enum ExtendedCode {
  WITH_EXTENSION = 1,
  WITHOUT_EXTENSION = 0
}

export enum BatchhaikisettingCode {
  WITH_EXTENSION = 2,
  WITHOUT_EXTENSION = 0
}

export enum ListStatus {
  ALL_ITEMS = 1,
  FILE_MANAGEMENT_BOOK_ITEM = 0
}

export enum ExtendedFilterText {
  DISPOSAL = '廃棄',
  TRANSFER = '移管',
  DECIDED = '未定',
}

export enum ExtendedFilterCode {
  DISPOSAL = 3,
  TRANSFER = 4
}

export enum RsCheckWarning {
  WARNING = '警告あり',
  NO_WARNING = '警告なし',
}

export enum RsCheckWarningValue {
  WARNING = '1',
  NO_WARNING = '0',
}

export enum HistoryStatus {
  WITH_HISTORY = '履歴あり',
  NO_HISTORY = '履歴なし',
}

export enum HistoryStatusValue {
  WITH_HISTORY = '1',
  NO_HISTORY = '0',
}

export enum BinaryStatus {
  YES = 'あり',
  NO = 'なし',
}

export enum BinaryStatusValue {
  YES = '1',
  NO = '0',
}

export enum SourceScreenFlag {
  FLG_040101 = 1,
  FLG_040107 = 2,
  FLG_040108 = 3,
  FLG_030202 = 4,
  FLG_021108 = 5,
  FLG_021008 = 6,
  FLG_021007 = 7,
  FLG_021101 = 8,
  FLG_021401 = 9,
  FLG_100114 = 10,
  FLG_110302 = 11,
  FLG_020108 = 12,
  FLG_020112 = 13,
  FLG_100104 = 14,
  FLG_020105 = 15,
  FLG_100202 = 16,
  FLG_021205 = 17,
  FLG_110105 = 18,
  FLG_060106 = 19,
}

export enum UnauthorizedErrorCode {
  NO_PAGE_CODE = '800',
  NO_PERMISSION = '801',
  NO_ACCESS_TO_ITEMS = '802',
}

export const HttpType = {
  ERROR: 'error',
  OK: 'ok',
}

export enum DocumentStatus {
  SAVING = 1,
  DELETED = 2,
  IS_CONSIDERING = 3,
  REVIEW_DELETION_3_MONTHS = 4,
  HAS_CHILD_BEING_SAVED = 5,
  HIGHER_CLASSIFICATION_REVIEW = 6,
}

export enum HznKikanParams {
  HZN_YUKOU_FLAG = 1,
  HZN_ENCHO_YUKOU_FLAG = 1,
}

export enum ExportCsvType {
  FILE_KEEPER = 1
}

export enum RS_SETTING_STATUS {
  ENABLE = 1,
  DISABLE = 0
}

export enum DisplayTree {
  IS_HIDDEN = '1',
  IS_DISPLAY = '0'
}

export const DisplayTreeState = {
  IS_HIDDEN: true,
  IS_DISPLAY: false,
}

export enum TextTime {
  YEAR = '年',
  LESS_THAN_A_YEAR = '1年未満'
}

export enum ExportFileType {
  VALUE_ALL_TRANSFER = 'ikan',
  VALUE_SPLIT = 'bessou',
  VALUE_OPINION = 'houIken'
}

export enum ShuruiValue {
  RE011 = 'ADM-RE011',
  RE012 = 'ADM-RE012',
  RE013 = 'ADM-RE013',
}

export enum BeforeType {
  SHINSABUNRUILIST = '040107'
}

export enum InquiryStatus {
  /* なし */
  NONE = 0,
  /**
   * 照会依頼前 ~ Before requesting an inquiry .
   */
  BEFORE_REQUEST_INQUIRY = 1,
  /**
   * 修正依頼前 ~ Before requesting correction .
   */
  BEFORE_REQUEST_CORRECTION = 2,
  /**
   * 照会依頼中 ~ Inquiry requesting .
   */
  INQUIRY_REQUESTING = 3,
  /**
   * 修正依頼中 ~ Requesting correction .
   */
  REQUESTING_CORRECTION = 4,
  /**
   * 照会応答 ~ Inquiry response .
   */
  INQUIRY_RESPONSE = 5,
  /**
   * 修正応答 ~ Corrective response .
   */
  CORRECTIVE_RESPONSE = 6,
  /**
   * 担当者済 ~ Person in charge .
   */
  PERSON_IN_CHARGE = 7,
  /**
   * 完了 ~ Done .
   */
  DONE = 8,
  /**
   * 照会応答前 ~ Before replying to inquiry.
   */
  BEFORE_REPLYING_INQUIRY = 9,
  /**
  * 修正応答前 ~ Before correction response.
  */
  BEFORE_CORRECTION_RESPONSE = 10,
}

export const NUMBER_OF_SUCCESS_MESSAGE = '件の差戻しが完了しました。'

export const IMPORT_CSV_EVENT = 'CSV読込'

export const DISAGREE = '不同意あり'

export const DISAGREE_FILE_MESSAGE = '不同意ファイルを差戻してください。'

export enum TopMenu {
  HAIKISHINSAIRAIGOTORISAGELIST = '1',
  HAIKIKYOGITOPMENU = '2'
}

export enum RegistryManagementBook {
  TOP_SECRET = 1,
  SECRET = 2,
  NONE = 3,
}

export enum DeptValue {
  ALL = '1',
  MANAGEMENT_DEPARTMENT = '2'
}

export enum InquiryText {
  NONE = 'なし',
  BEFORE_REQUEST = '依頼前',
  INQUIRING = '照会中',
  CORRECTING = '修正中',
  PERSON_IN_CHARGE = '担当者済',
  COMPLETED = '完了',
}

export enum RsSection {
  DISPLAY = 1,
}

export const ERROR_RETURN_KOUBUNKAN_MESSAGE = '状態ではないため、公文書館へ回答はできません。'

export const UNLOCK_CONFIRMATION_MESSAGE = '30秒で排他が解除されます。延長しますか？'

export const ERROR_STATUS_CHANGE_MESSAGE = '状態が変更されているため、削除できません。'

export const LESS_THAN_A_YEAR_TEXT = '1年未満'

export const NAME_TAIL_ERROR_MODAL = '　処理結果'

export const CONFIRM_RS_COMPLETED = '件のRS確認依頼を完了しました。'

export enum KeyboardEventValue {
  SPACE = ' ',
  ENTER = 'Enter'
}

export const pathFromGyosebunsyokose = [
  '/adm/gyosebunsyoinfoupdate', //010609
  '/adm/gyosebunsyo-create', //050101
  '/adm/gyosebunsyo-ido', //010604
  '/adm/gyosebunsyotantochange', //010608
  '/adm/shiryokosechange', //010611
  '/adm/gyosebunsyosanshokenfuyo', //010612
]

//add more screens to this section
export const pathFromGyosebunsyoList = [
  ...pathFromGyosebunsyokose,
  '/adm/gyosebunsyolist',
  //from 601-->screen
  '/adm/gyosebunsyo-ido', //010604
  '/adm/shikirishiinsatsu', //010510
  '/adm/gyosebunsyofile-create', //010512
  '/adm/gyosebunsyofile-update', //010503
  '/adm/gyosebunsyofile-delete', //010504
  '/adm/gyosebunsyofiletogo-togofilesentaku', //010519
  '/adm/gyosebunsyofilebunkatsu-katsusaki', //010517
  '/adm/gyosebunsyofilekangae', //010505
  '/adm/bosatsuedit', //010521
  '/adm/bosatsukanido', //010522
  '/adm/gyoseifilehaiki', //021001
  '/adm/gyoseifilehaikiiraicancel', //021002
  '/adm/gyoseifileikan', //021003
  '/adm/gyoseifileikancancel', //021004
  '/adm/gyoseifilehozonkikanencho', //021005
  '/adm/gyoseifilehozonkikanenchocancel', //021006
  '/adm/gyosebunsyofilehikitsugi', //021506
  '/adm/gyoseifilekashidashiyoyaku', //010615
  '/adm/gyoseifilereturn', //030503
  '/adm/gyosebunsyo-create', //050101,
  '/adm/gyoseibunshofileviewfinished', //030501
  '/adm/gyoseifilekashidashi', //030502
  '/adm/gyouseifilekashidashiyoyakucancel', //030401
  '/adm/gyosebunsyokose', //010610
  //from 010601 screen to others
  '/adm/gyosebunsyofilebunkatsusakisetting', //010518
  '/adm/gyosebunsyofilebunkatsu-katsumoto', //010516
  '/adm/gyosebunsyofiletogo-togosakifilesentaku', // 010520
];

export enum ApprovalClassificationTitle {
  JUDGE = '審査者',
}

export enum PageInfoSessionKeys {
  PARSED_QUERIES = 'parsedQueries',
  LOCATION_STATE = 'locationState',
}

export enum HaikifilelistMessageConfirm {
  //ADMCI017
  REQUEST_TO_ARCHIVES = '公文書館へ依頼をします。\nよろしいですか？',
  //ADMCI019
  REMAND_TO_ARCHIVES = '公文書館へ差戻しをします。\nよろしいですか？',
  //ADMCI028
  SETTING_UNDER_REVIEW = '審査中に変更します。\nよろしいですか？',
  //ADMCI028
  UNDER_REVIEW = '審査中に変更します。\nよろしいですか？',
  //ADMCI033
  UNEXAMINED = '未審査に戻します。\nよろしいですか？',
  //ADMCI033
  RETURN_TO_UNEXAMINED = '未審査に戻します。\nよろしいですか？',
  //ADMCI036
  REMAND_TO_SOBUNKAN = '総文管へ差戻しします。\nよろしいですか？',
  //ADMCI018
  CANCELLATION_OF_REQUEST_TO_ARCHIVES = '公文書館へ依頼取消をします。\nよろしいですか？',
  COMPLETION_OF_DISPOSAL_EXAMINATION = '廃棄審査を完了します。\nよろしいですか？',
}

export const BATCHHAIKI_RSWARNING = 0
export const BATCHHAIKI_UNDER_ONE_YEAR = '未設定'

export const PARENT_DEPARTMENT_STORAGE_KEY = 'parent_department'
export const DEPARTMENT_TREE_STORAGE_KEY = 'department_tree'

export const MSG_WHEN_UPDATED_BY_ANOTHER_PERSON = '他の担当者により更新されています。'

export const ListItemCompareRs = [
  'bosHznKiManCd',
  'rsVal01',
  'rsVal02',
  'rsVal04',
  'rsVal03',
  'rsVal22',
  'rsVal23',
  'rsVal05',
  'rsVal17',
  'rsVal18',
  'rsVal19',
  'rsVal12',
  'rsVal20',
  'rsVal21',
  'rsVal06',
  'rsVal07',
  'rsVal08',
  'rsVal09',
  'rsVal11',
  'rsVal13',
  'rsVal10',
]

export enum M92CAT915SEQ {
  SAVING = 10, // 保存中
  TRANSFERRED = 51, // 移管済
  TAKEN_OVER = 50, // 引継済
  SPLIT = 52, // 分割済
  INTEGRATED = 53, // 統合済
}

export enum M92CAT918SEQ {
  REQUESTING_CABINET_OFFICE = 55, // 内閣府依頼中
  CABINET_OFFICE_REVIEWED = 56, // 内閣府審査済
}

export enum M92CAT919SEQ {
  REQUESTING_ARCHIVES = 57, // 公文書館依頼中
  ARCHIVES_REVIEW = 27 // 公文書館審査済
}

export const SHINSEIYUKOUFLG = '1'

export const RemandCheckbox = [
  '理由あり',
  '理由なし',
  '差戻し以外',
]

export const WHITE_SPACE_REGEX = /[ ,　]/
