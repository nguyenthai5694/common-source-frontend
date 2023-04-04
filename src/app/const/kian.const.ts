/* eslint-disable max-lines */
/**
 * DAE-SC011006(起案 ~ Drafting) is grouped from many screens. Screen mode is used to identify screen type.
 */
export enum KianScreenMode {
  /**
   * 起案 ~ Kian screen, drafting mode.
   */
  DRAFT = '1',

  /**
   * 修正 ~ Kian screen, edit mode.
   */
  EDIT = '2',

  /**
   * 決裁 ~ Kian screen, approval mode.
   */
  APPROVAL = '3',

  /**
   * 供覧 ~ Kian screen, exhibition mode.
   */
  EXHIBITION = '4',

  /**
   * 確認 ~ Kian screen, verification mode.
   */
  VERIFICATION = '5',

  /**
   * 完了 ~ Kian screen, done mode.
   */
  DONE = '6',

  /**
   * 審査 ~ Kian screen, examination mode.
   */
  EXAMINATION = '7',

  /**
   * 施行画面 ~ Shiko ... ~ Enforcement screen.
   */
  ENFORCEMENT = '8',

  /**
   * 公印審査画面 ~ Official seal examination screen.
   */
  OFFICIAL_SEAL_EXAMINATION = '9',

  /**
   * 官報審査画面 ~ Official bulletin examination screen.
   */
  OFFICIAL_BULLETIN_EXAMINATION = '10',

  /**
   * 保存 ~ Kian screen, save mode.
   */
  SAVE = '11',
}

export enum DepartmentManagementDeptValues {
  /**
   * すべて
   */
  ALL = '1',

  /**
   * 部署単位
   */
  DEPARTMENT_UNIT = '2',
}

export enum DocumentManagementLawValues {
  /**
   * 施行後（2011/4/1以後）~ After enforcement(2011/4/1). or
   * ３階層（未使用）on 衆議院、参議院、国立国会図書館、最高裁判所の場合
   */
  AFTER_ENFORCEMENT = 0,

  /**
   * 施行前（2011/3/31以前） ~ Before enforcement(2011/3/31). or
   * ５階層（使用）on 衆議院、参議院、国立国会図書館、最高裁判所の場合
   */
  BEFORE_ENFORCEMENT = 1,

  AFTER_AND_BEFORE_ENFORCEMENT = 2,
}

/**@deprecated using function global getEnforcementLaw() */
export const DocumentManagementLawAsText = {
  [DocumentManagementLawValues.AFTER_ENFORCEMENT]: '施行後（2011年4月1日以後）',
  [DocumentManagementLawValues.BEFORE_ENFORCEMENT]: '施行前（2011年3月31日以前）',
}

/**
 * TODO: move to bunsyo.const.ts
 */
export enum DocumentType {
  /**
   * 決裁 ~ Approval.
   */
  APPROVAL = '13',

  /**
   * 供覧 ~ Exhibition ~ Announcing.
   */
  EXHIBITION = '11',
}

export const DocumentTypeText = {
  [DocumentType.APPROVAL]: '決裁',
  [DocumentType.EXHIBITION]: '供覧',
}

/**
 * bunsyosyubetu ~ approval type.
 * Notice: Approval type is sub type of `DocumentType.APPROVAL`.
 * TODO: move to bunsyo.const.ts
 */
export enum ApprovalType {
  /**
   * 決裁(起案文書) ~ Approval(Draft document).
   */
  DRAFT = '1',

  /**
   * 決裁(事務連絡文書) ~ Approval(Office communication document).
   */
  ADMINISTRATIVE = '2',
}

export enum NecessityOfListingInTheOfficialBulletinValues {
  /**
   * 要 ~ Need.
   */
  NEED = '1',

  /**
   * 不要 ~ Don't.
   */
  DO_NOT = '0',
}

export enum IncompleteDocumentValues {
  /**
   * 有り ~ Yes
   */
  YES = '1',

  /**
   * 無し ~ No.
   */
  NO = '0',
}

/**
 * 決裁方法 ~ Settlement method ~ Approval method(not approval type).
 */
export enum SettlementMethodValues {
  /**
   * 電子
   */
  ELECTRONIC = '1',

  /**
   * 紙
   */
  PAPER = '2',

  /**
   * 決裁無
   * @deprecated remove later.
   */
  NONE = '3',
}

export const SettlementMethodAsText = {
  [SettlementMethodValues.ELECTRONIC]: '電子',
  [SettlementMethodValues.PAPER]: '紙',
  /**
   * @deprecated remove later.
   */
  [SettlementMethodValues.NONE]: '決裁無',
}

/**
 * Description from old version:
 * ※保存期間コードの更新はできません。
 * ※保存期間コードは0～1000までの数値を入力してください。
 * ※保存期間コードは0：１年未満、999：永年、1000：その他、1001：常用、1002：満了日指定として使用します。
 */
export enum RetentionPeriodValues {
  /**
   * 空白
   * TODO: this value must be verified again.
   */
  BLANK = -1,

  /**
   * 1年未満
   */
  LESS_THAN_A_YEAR = 0,

  /**
  * 1年
  */
  A_YEAR = 1,

  /**
  * 99年
  */
  NINETY_NINE_YEAR = 99,

  /**
   * 永年 ~ for many years(~ perpetual).
   * @deprecated this value may be deprecated in the future.
   */
  FOR_MANY_YEARS = 999,

  /**
   * その他 ~ other.
   */
  OTHER = 1000,

  /**
   * 常用 ~ regular use.
   */
  REGULAR_USE = 1001,

  /**
   * 満了日指定 ~ specify expiration date.
   */
  SPECIFY_EXP_DATE = 1002,

  /**
   * It is a special option if retention period code(保存期間コード) >= RetentionPeriod.SPECIAL
   *
   * Example of special options:
   * - 特定日以後5年(許認可等) ~ 5 years after the specified date (license, etc.).
   * - 特定日以後10年(訴訟) ~ 10 years after a specific date (litigation).
   */
  SPECIAL = 2000,
}

export enum StartingDateValues {
  // Date of creation and acquisition
  DATE_OF_CREATION = '1',
  /**
   * 翌年度の始期（４月１日）~ The beginning of the next chronological year(April 1st)???
   */
  BEGINNING_OF_THE_NEXT_CHRONOLOGY = '2',

  /**
   * 翌年の始期（１月１日） ~ The beginning of the following year (January 1).
   */
  BEGINNING_OF_THE_NEXT_YEAR = '3',

  /**
   * 翌事務年度の始期（７月１日）~ The beginning of the next business year (July 1).
   */
  BEGINNING_OF_THE_NEXT_BUSINESS_YEAR = '4',

  /**
   * 翌月の始期 ~ The beginning of the next month.
   */
  BEGINNING_OF_THE_NEXT_MONTH = '5',

  /**
   * 特定の日 ~ Specific day.
   */
  SPECIFIC_DAY = '6',

  /**
   * 作成、取得の日の翌日 ~ After creation date.
   */
  AFTER_CREATION_DATE = '7',

  /**
   * 未定 ~ Undecided.
   */
  UNDECIDED = '9',
}

export enum NecessityOfEnforcementValues {
  /**
   * 要 ~ Need.
   */
  NEED = '1',

  /**
   * 不要 ~ Unnecessary.
   */
  UNNECESSARY = '0',
}

/**
 * 文書保存 ~ Document storage.
 * This constant/enum specify how document must be saved after enforcement.
 */
export enum DocumentStorageValues {
  /**
   * 施行完了後に手運用で保存 ~ Saved manually after enforcement.
   */
  SAVED_MANUALLY_AFTER_ENFORCEMENT = 0,

  /**
   * 施行完了で自動保存 ~ Automatically saved when enforcement is completed.
   */
  AUTOMATICALLY_SAVED_AFTER_ENFORCEMENT = 1,
}

export enum InformationDisclosureClassificationValues {
  /**
   * 公開 ~ Public.
   */
  PUBLIC = 1,

  /**
   * 一部非公開 ~ Partitally private.
   */
  PARTIALLY_PRIVATE = 2,

  /**
   * 全部非公開 ~ Private.
   */
  PRIVATE = 3,
}

/**
 * For now, this enum has only some special values of sharing classification.
 */
export enum SharingClassification {
  /**
   * 決裁ルート上の人 ~ Person on the approval route.
   */
  PERSON_ON_THE_APPROVAL_ROUTE = '11',

  /**
   * 特定の部署 ~ Specific department.
   */
  SPECIFIC_DEPARTMENT = '12',

  /**
   * 特定の人 ~ Specific person.
   */
  SPECIFIC_PERSON = '13',

  /**
   * 特定の役職 ~ Specific job title.
   */
  SPECIFIC_JOB_TITLE = '14',
}
export enum ApprovalClassificationValue {
  /**
   * 審査者: Judge
   */
  JUDGE = '11331'
}

export const SharingClassificationTitle = {
  [SharingClassification.SPECIFIC_DEPARTMENT]: '特定の部署',
  [SharingClassification.SPECIFIC_PERSON]: '特定の人',
  [SharingClassification.SPECIFIC_JOB_TITLE]: '特定の役職',

}

export const ApprovalClassificationTitle = {
  [ApprovalClassificationValue.JUDGE]: '審査者',
}

export enum EnforcementMethod {
  /**
   * 紙施行 ~ Paper enforcement.
   */
  PAPER = 0,

  /**
   * 庁内施行 ~ 庁内施行.
   */
  ENFORCEMENT_WITHIN_AGENCY = 1,

  /**
   * 警察文書伝送 ~ Police document transmission???.
   */
  OTHER_SYSTEMS = 2,

  LGWAN = 7,

  /**
   * 電子署名 ~ Electronic signature(Email, ...).
   */
  ELECTRONIC_SIGNATURE = 8,
}

export enum EnforcementMethodButton {
  /**
   * 庁内施行 ~ 庁内施行.
   */
  ENFORCEMENT_WITHIN_AGENCY = 1,

  /**
   * 紙(公印要) ~ Paper (public seal required).
   */
  PAPER_REQUIRED = 2,

  /**
   * 紙(公印不要) ~ Paper (not required for public seal).
   */
  PAPER_NOT_REQUIRED = 3,

  /**
   * 他システム ~ Other systems.
   */
  OTHER_SYSTEMS = 4,

  /**
   * 電子メール等 ~ Electronic signature(Email, ...).
   */
  ELECTRONIC = 5,
}

/**
 * 公印有無 ~ With or without official seal ~ ...
 *
 * - 0: 無.
 * - 1: 有.
 */
export enum OfficialSealRequire {
  NO = 0,
  YES = 1,
}

/**
 * TODO: add note.
 */
export const TEMP_JIAN_MEI_NO = 999;

/**
 * @deprecated remove later, it is used nowhere
 */
export enum DocTypeStatus {
  /**
   * 処理完了 ~ Processing completed.
   * TODO: this value may be duplicated => investigate more.
   */
  COMPLETED = '処理完了',
}
/**
 * 決裁個別は決裁
 */
export const KESSAISHOBETSU = 'kessai';

export enum DocumentNumberTiming {
  /**
   * Upon drafting
   */
  DRAFTING = 1,

  /**
   * Upon completion of approval.
   * ~ kyoran ...
   */
  COMPLETED_APPROVAL = 2,

  /**
   * Upon enforcement
   */
  ENFORCEMENT = 3,
}

export enum KnriKbnNum {
  INDIVIDUAL = '1',
  DEPARTMENT = '2',
}

export enum ShowOtherSystemButton {
  YES = 1,
  NO = 0,
}

export enum ScreenName {
  DRAFT_DOCUMENT = '起案文書',
  OFFICE_COMMUNICATION_DRAFT = '事務連絡起案',
  DOCUMENT_REGISTRATION = '文書登録',
  EXHIBITION_DOCUMENT = '供覧文書'
}

export enum ItemName {
  NECESSITY_OF_ENFORCEMENT = '施行の要否',

  DOCUMENT_STORAGE = '文書保存',

  ENFORCEMENT_PROCESSING_DEADLINE = '施行処理期限日',

  ENFORCEMENT_DATE = '施行日',

  ENFORCEMENT_DESTINATION = '施行先',

  ENFORCER = '施行者',

  NECESSITY_LISTING_IN_THE_OFFICIAL_BULLETIN = '官報登載の要否',

  INFORMATION_DISCLOSURE_CLASSIFICATION = '情報公開の区分',

  SECRET_CLASSIFICATION = '秘密区分',

  SECRET_PERIOD_END_DATE = '秘密期間終了日',

  HANDLING_RESTRICTIONS = '取扱制限',

  HANDLING_PRECAUTIONS = '取扱上の注意',

  NOTE = '付箋',

  EXTENDED_ATTRIBUTES = '拡張属性'
}

export enum EditAbleDefault {
  /**
   * Editable
   */
  EDITABLE = 1,

  /**
   * Not editable
   */
  NOT_EDITABLE = 2,
}

export enum SettingAllowDragAndDrop {
  /**
   * 有 Allow drag and drop
   */
  YES = 1,

  /**
   * 無 Dont allow drag and drop
   */
  NO = 2,
}

export enum NumberingisOtherSys {
  /**
   * 受付番号 Receipt number
   */
  RECEIPT_NUMBER = 1,

  /**
   * 文書番号 Document number
   */
  DOCUMENT_NUMBER = 2,
}

export enum DocumentNumberOfTheExhibition {
  /**
   * 任意取得 Show numbering
   */
  YES = 1,

  /**
   * 取得無 Hidden numbering
   */
  NO = 2,
}

export enum DocumentManagementDivisionDivision {
  /**
   * 使用有 Show Document management division
   */
  SHOW = 1,

  /**
   * 使用無 Hidden Document management division
   */
  HIDDEN = 2,
}

export enum AcquisitionDocumentNumber {
  /**
   * 有
   */
  YES = 1,

  /**
   * 無
   */
  NO = 2,
}

export enum KyodokianStatus {
  /**
   * 文書番号取得依頼 ~ Document number request
   */
  DOCUMENT_NUMBER_REQUEST = '1',
  /**
   * 文書番号取得済 ~ Document number acquired
   */
  DOCUMENT_NUMBER_ACQUIRED = '2',
  /**
   * 未依頼 ~ Unrequested
   */
  UNREQUESTED = '0',
}

export const OFFICIAL_DOC_LAW_CATEGORY = '公文書管理法'

export const ROUTE_ID_INIT = 0;

export const HAIAN_SAVE_DOCUMENT_FILE_VALIDATE_ITEMS = [
  'cmbStartingDate',
  'calStartingDate',
  'cmbAdministrativeDocumentRetentionPeriod',
  'calExpirationTimeOfStoragePeriod',
  'calDraftingDate',
]