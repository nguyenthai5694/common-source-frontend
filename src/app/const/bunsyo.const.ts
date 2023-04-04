/**
 * This file contain const for bunsyo(~ document).
 */

/**
 * Bunjocd ~ Bunjo code ~ Bunsyo status ~ Document status.
 * Note: `BunsyoStatus` is status code, not status name(a status that used to display to user).
 */
export enum BunsyoStatus {
  /**
   * すべて ~ All.
   * TODO: need verify
   */
  ALL = 0,

  /**
   * 差戻し済 ~ Remanded.
   */
  REMANDED = 4,

  /**
   * 配布・転送済 ~ Distributed / transferred.
   */
  DISTRIBUTED = 8,

  /**
   * 受付待 ~ Waiting for reception.
   */
  WAITING_RECEPTION = 10,

  /**
   * 受付済 ~ Accepted.
   */
  ACCEPTED = 20,

  /**
   * 一時保存 ~ Temporarily saved.
   */
  TEMPORARILY_SAVED = 30,

  /**
   * 差戻し ~ Remand.
   */
  REMAND = 31,

  /**
   * 決裁中 ~ Under approval.
   */
  UNDER_APPROVAL = 40,

  /**
   * 供覧中 ~ Kyōran-chū ~ Being announced.
   */
  BEING_ANNOUNCED = 41,

  /**
   * 他シス差戻し ~ Return to another system.
   */
  RETURN_TO_ANOTHER_SYSTEM = 42,

  /**
   * 紙決裁中 ~ Paper is being approved.
   */
  PAPER_IS_BEING_APPROVED = 43,

  /**
   * 決裁一時凍結 ~ Settlement temporary freeze.
   */
  TEMPORARY_FREEZE_APPROVAL = 44,

  /**
   * 供覧終了/決裁終了 ~ Waiting for completion processing ???
   */
  WAITING_FOR_COMPLETION_PROCESSING = 45,

  /**
  *供覧終了
  */
  WAITING_FOR_COMPLETION = 46,

  /**
   * 審査差戻し ~ Examination remand.
   */
  EXAMINATION_REMAND = 47,

  /**
   * 審査中 ~ Under review.
   */
  UNDER_REVIEW = 48,

  /**
   * 施行待ち ~ Waiting for enforcement.
   */
  WAITING_FOR_ENFORCEMENT = 50,

  /**
   * 官報申請差戻し ~ Remand the official bulletin application.
   */
  REMAND_THE_OFFICIAL_BULLETIN_APPLICATION = 52,

  /**
   * 公印申請差戻し ~ Official seal application remand.
   */
  OFFICIAL_SEAL_APPLICATION_REMAND = 53,

  /**
   * 施行申請差戻し ~ Enforcement application remand.
   */
  ENFORCEMENT_APPLICATION_REMAND = 54,

  /**
   * 施行申請中 ~ Under application for enforcement.
   */
  UNDER_APPLICATION_FOR_ENFORCEMENT = 55,

  /**
   * 官報申請中 ~ Applying for official bulletin.
   */
  APPLYING_FOR_OFFICIAL_BULLETIN = 56,

  /**
   * 公印申請中 ~ Applying for official seal.
   */
  APPLYING_FOR_OFFICIAL_SEAL = 57,

  /**
   * 施行(送信中) ~ Enforcement(sending).
   */
  ENFORCEMENT_SENDING = 58,

  /**
   * 施行完了 ~ Enforcement completed.
   */
  ENFORCEMENT_COMPLETED = 59,

  /**
   * 保存待ち ~ Waiting to save.
   */
  WAITING_TO_SAVE = 60,

  /**
   * 保存 ~ Save.
   */
  SAVE = 70,

  /**
   * 廃案 ~ Abandoned.
   */
  ABANDONED = 90,

  /**
   * 完全廃案 ~ Completely abolished.
   */
  COMPLETELY_ABOLISHED = 99,

  /**
   * 返付済 ~ Returned.
   */
  RETURNED = 100,
};

/**
 * Bunsyo person in charge role is the role that is only relevant with specific person **AND** document.
 */
export enum BunsyoPicRole {
  /**
   * 起案者 ~ Drafter.
   */
  DRATER = '起案者',

  /**
   * 文書管理者 ~ Document manager.
   */
  DOCUMENT_MANAGER = '文書管理者',

  /**
   * 文書取扱主任 ~ TANTOSHA_IN_CHARGE_OF_DOCUMENT_PROCESSING ~ Document handling chief.
   */
  DOCUMENT_HANDLING_CHIEF = '文書取扱主任',

  /**
   * 公印審査者 ~ TANTOSHA_NOTARIZED_VERIFIER ~ Official seal examiner.
   */
  OFFICIAL_SEAL_EXAMINER = '公印審査者',

  /**
   * 官報審査者 ~ TANTOSHA_EXAMINE_ANNOUCEMENT ~ Official bulletin examiner.
   */
  OFFICIAL_BULLETIN_EXAMINER = '官報審査者',

  /**
   * 共同起案依頼先者 ~ Joint draft requestee.
   */
  PROPOSER_OF_JOIN_DRAFTING_DESTINATION = '共同起案依頼先者',

  /**
   * 決裁者 ~ Approver ~ Authorizer???.
   */
  APPROVER = '決裁者',

  /**
   * 最終決裁者 ~ Final decision-maker.
   * TODO: verify later.
   */
  // FINAL_DECISION_MAKER

  /**
   * 供覧者 ~ Exhibitor ~ Announcer.
   */
  ANNOUNCER = '供覧者',

  /**
   * 同報者 ~ Broadcaster.
   * Note: this may not be a role
   */
  BROADCASTER = '同報者',

  /**
   * 後閲者 ~ Reviewer
   */
  REVIEWER = '後閲者',

  /**
   * 代行者 ~ Substitute.
   */
  SUBSTITUTE = '代行者',

  /**
   * 政務 ~ Political.
   */
  POLITICAL = '政務',

  /**
   * 決裁者（他府省） ~ Approver (other ministries).
   */
  APPROVER_OTHER_MINISTRIES = '決裁者（他府省）'
}

export const BunsyoPicRoleAsNumber = {
  [BunsyoPicRole.DRATER]: '1',
  [BunsyoPicRole.DOCUMENT_MANAGER]: '2',
  [BunsyoPicRole.DOCUMENT_HANDLING_CHIEF]: '3',
  [BunsyoPicRole.OFFICIAL_SEAL_EXAMINER]: '4',
  [BunsyoPicRole.OFFICIAL_BULLETIN_EXAMINER]: '5',
  [BunsyoPicRole.PROPOSER_OF_JOIN_DRAFTING_DESTINATION]: '6',
  [BunsyoPicRole.APPROVER]: '7',
  [BunsyoPicRole.ANNOUNCER]: '8',
  [BunsyoPicRole.BROADCASTER]: '9',
  [BunsyoPicRole.REVIEWER]: '10',
  [BunsyoPicRole.SUBSTITUTE]: '11',
}

export const NumberAsRole: any = {};
Object.keys(BunsyoPicRoleAsNumber).forEach(key => {
  NumberAsRole[BunsyoPicRoleAsNumber[key]] = key;
});

/**
* Note: Bunsyo states name
*/
export enum BunsyoStatusName {
  ABANDONED = '廃案',
  ALREADY_DECIDED = '既決',
  BROWSED = '閲覧済',
  REVIEWED = '後閲済',
  TEMPORARY_FREEZE_APPROVAL = '決裁一時凍結',
  RETURN_TO_ANOTHER_SYSTEM = '他シス差戻し',
  RETURN_EXAMINATION_NOT_COMPLETED = '文書取扱主任審査未了(差戻し)',
  SENTENCE_REMAND = '文取差戻し',
  DRAFTING = '起案中',
  APPROVING = '決裁中',
  ANNOUNCING = '供覧中',
  PAPER_APPROVING = '紙決裁中',
  APPROVED = '決裁終了',
  WAITING_LITERARY_EXAMINATION = '文取審査待',
  ENFORCEMENT_PROCESSING_NOT_COMPLETED = '施行処理未了',
  UNDER_ENFORCEMENT = '施行中',
  ENFORCEMENT_COMPLETED = '施行完了',
  PRESERVATION_PROCESS_NOT_COMPLETED = '保存処理未了',
  PROCESSING_COMPLETED = '処理完了',
  PRE_VIEWABLE = '事前閲覧可',
  APPROVAL_RESERVATION = '承認予約',
  PENDING = '未決',
  WAITING_FOR_REVIEW = '後閲待',
  WAITING_FOR_VIEWING = '閲覧待',
  PAPER_EXHIBITION = '紙供覧中',
  END_OF_EXHIBITION = '供覧終了',
  EXAMINATION_NOT_COMPLETED = '文書取扱主任審査未了',
  REMAND = '差戻し'
}

/**
 * get tag stateInfo from stateName
 * @param stateName
 * @returns
 */
export function getStatusInfo(stateName,
  flgReturnedDestination: boolean) {
  switch (stateName) {
    case BunsyoStatusName.ABANDONED:
      return { label: '廃案', color: 'primary-60' }
    case BunsyoStatusName.ALREADY_DECIDED:
      return { label: '既決', color: 'primary-60' }
    case BunsyoStatusName.BROWSED:
      return { label: '閲覧済', color: 'primary-60' }
    case BunsyoStatusName.REVIEWED:
      return { label: '後閲済', color: 'primary-60' }
    case BunsyoStatusName.TEMPORARY_FREEZE_APPROVAL:
      return { label: '決裁一時凍結', color: 'red' }
    case BunsyoStatusName.RETURN_TO_ANOTHER_SYSTEM:
      return { label: '他シス差戻し', color: 'red' }
    case BunsyoStatusName.RETURN_EXAMINATION_NOT_COMPLETED:
      return { label: '文書取扱主任審査未了(差戻し)', color: 'red' }
    case BunsyoStatusName.SENTENCE_REMAND:
      return { label: '文取差戻し', color: 'red' }
    case BunsyoStatusName.DRAFTING:
      if (flgReturnedDestination) {
        return { label: '差戻し', color: 'red' }
      }

      return { label: '起案中', color: 'primary' }
    case BunsyoStatusName.APPROVING:
      return { label: '決裁中', color: 'primary' }
    case BunsyoStatusName.ANNOUNCING:
      return { label: '供覧中', color: 'primary' }
    case BunsyoStatusName.PAPER_APPROVING:
      return { label: '紙決裁中', color: 'primary' }
    case BunsyoStatusName.PENDING:
      if (flgReturnedDestination) {
        return { label: '差戻し', color: 'red' }
      }

      return { label: '未決', color: 'primary' }
    default:
      return getStatusInfo1(stateName);
  }
}

function getStatusInfo1(stateName) {
  switch (stateName) {
    case BunsyoStatusName.APPROVED:
      return { label: '決裁終了', color: 'primary' }
    case BunsyoStatusName.WAITING_LITERARY_EXAMINATION:
      return { label: '文取審査待', color: 'primary' }
    case BunsyoStatusName.ENFORCEMENT_PROCESSING_NOT_COMPLETED:
      return { label: '施行処理未了', color: 'primary' }
    case BunsyoStatusName.UNDER_ENFORCEMENT:
      return { label: '施行中', color: 'primary' }
    case BunsyoStatusName.ENFORCEMENT_COMPLETED:
      return { label: '施行完了', color: 'primary' }
    case BunsyoStatusName.PRESERVATION_PROCESS_NOT_COMPLETED:
      return { label: '保存処理未了', color: 'primary' }
    case BunsyoStatusName.PROCESSING_COMPLETED:
      return { label: '処理完了', color: 'primary' }
    case BunsyoStatusName.PRE_VIEWABLE:
      return { label: '事前閲覧可', color: 'primary' }
    case BunsyoStatusName.APPROVAL_RESERVATION:
      return { label: '承認予約', color: 'primary' }
    case BunsyoStatusName.WAITING_FOR_REVIEW:
      return { label: '後閲待', color: 'primary' }
    case BunsyoStatusName.WAITING_FOR_VIEWING:
      return { label: '閲覧待', color: 'primary' }
    case BunsyoStatusName.PAPER_EXHIBITION:
      return { label: '紙供覧中', color: 'primary' }
    case BunsyoStatusName.END_OF_EXHIBITION:
      return { label: '供覧終了', color: 'primary' }
    case BunsyoStatusName.EXAMINATION_NOT_COMPLETED:
      return { label: '文書取扱主任審査未了', color: 'primary' }
    default:
      return null;
  }
}

/**
 * Note: Bunsyo state name is NOT map 1-1 with bunjocd(~ Bunjo code ~ bunsyo status ~ document status).
 */
export type BunsyoStateName =
  '事前閲覧可' | '承認予約' | '紙決裁中' |
  '起案中' | '決裁中' | '供覧中' |
  '決裁終了' | '保存処理未了' | '廃案' |
  '処理完了' | '他シス差戻し' | '文取審査待' |
  '文取差戻し' | '決裁一時凍結' | '未決' |
  '既決' | '文書取扱主任審査未了' |
  // it is where 'world has many colors' come from.
  '文書取扱主任審査未了' | '公印審査未了' | '官報審査未了' |
  '文書取扱主任審査完了' | '公印審査完了' | '官報審査完了' |
  '後閲待' | '紙供覧中' | '供覧終了' |
  '後閲済' | '閲覧待' | '閲覧済' | '施行処理未了' |
  '施行中' | '施行完了' | '審査未了' | '修正確認依頼中';

export enum UrgencyTypeValue {
  LOW = '1',
  MEDIUM = '2',
  HIGH = '3',
}

export const UrgencyTypeText = {
  [UrgencyTypeValue.LOW]: '低',
  [UrgencyTypeValue.MEDIUM]: '中',
  [UrgencyTypeValue.HIGH]: '高',
}

export function getStatusReason(status) {
  switch (status) {
    case BunsyoStatus.ABANDONED:
      return '廃案'
    case BunsyoStatus.TEMPORARILY_SAVED:
    case BunsyoStatus.UNDER_APPROVAL:
    case BunsyoStatus.BEING_ANNOUNCED:
      return '差戻し'
    case BunsyoStatus.EXAMINATION_REMAND:
      return '文取差戻し'
    default:
      return null;
  }
}

/**
 * 決裁一時凍結 ~ Settlement temporary freeze.
 */
export const TEMPORARY_FREEZE_APPROVAL_TEXT = '一時凍結';

/**
 * 他システムフラグ(収受連携)
 */
export const SYSTEM_SHUJU = 10;

/**
 * 他システムフラグ(起案連携)
 */
export const SYSTEM_KIAN = 20;

/**
 * 他システムフラグ
 */
export const TASYSTEM_KETTAI_FLAG = 2;
