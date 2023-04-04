export enum SelectionProcessStatus {
  /**
   * 処理待ち ~ Waiting for processing
   */
  WAITING = '0',

  /**
   * 処理済み ~ Processed.
   */
  PROCESSED = '1',
}

export enum FileAttachmentStatus {
  /**
   * No attachments.
   */
  NONE = 0,

  /**
   * There are attachments
   */
  YES = 1,

}

/**
 * 受信区分 ~ Reception category.
 */
export enum ReceptionCategory {
  /**
   * すべて ~ All.
   */
  ALL = '0',

  /**
   * 庁内施行 ~ Enforcement within agency = 2
   */
  ENFORCEMENT_WITHIN_AGENCY = '庁内施行',

  /**
   * 電子メール ~ Email = 3???
   */
  ELECTRONIC_MAIL = '電子メール',

  /**
   * 他システム ~ Other system = 9???
   */
  OTHER_SYSTEM = '他システム',

  /**
   * 文書受付 ~ Document reception = 10???
   */
  DOCUMENT_RECEPTION = '文書受付',

}

export const MappingShujuFileAttachmentStatusText: { [key: string]: string } = {
  [FileAttachmentStatus.NONE]: '無',
  [FileAttachmentStatus.YES]: '有',
}

/**
 * 状態 ~ bunJoCd ~ document status.
 * TODO: this enum may be duplicated => research more.
 */
export enum DocumentStatus {
  WAITING_RECEPTION = 10,

  ACCEPTED = 20,

  /**
   * Temporary saved.
   */
  TEMP_SAVED = 30,

  /**
  * 決裁一時凍結 ~ Settlement/Approval temporary freeze.
  */
  TEMP_FREEZE = 44,

  /**
   * 決裁終了／供覧終了 ~ End off approval/announcing.
   */
  END_APPROVAL = 45,

  /**
   * Remanded
   */
  REMANDED = 100,

  /**
  * 他シス差戻し ~ Remanded other system.
  */
  RETURN_TO_ANOTHER_SYSTEM = 42,
}

/**
 * ~ jushinKbnCd
 */
export enum ReceivedCategory {
  /**
   * すべて ~ All = 0
   */
  ALL = 0,

  /**
   * LGWAN
   */
  LGWAN = 1,

  /**
   * 庁内施行 ~ Enforcement within agency.
   */
  ENFORCEMENT_WITHIN_AGENCY = 2,

  /**
   * 電子メール ~ Email.
   */
  EMAIL = 3,

  /**
   * 他システム ~ Other system.
   */
  OTHER_SYSTEM = 7,

  /**
   * DOCUMENT_RECEPTION
   */
  DOCUMENT_RECEPTION = 10,
}

/**
 * Flag invalid mukoFLG
 */
export enum ProcessingStatus {
  /**
   * NONE
   */
  NONE = 0,

  /**
   * In trash
   */
  IN_TRASH = 1,

  /**
   * Distributed / transferred.
   */
  DISTRIBUTED = 2,

  REFUNDED = 3,

  DRAFTED = 4,

  DELETED = 5,
}

/**
 * ukeKbnCd ~ Document type.
 *
 * Note: This enum may be duplicated with SettlementMethodValues(kian.const.ts)
 */
export enum DocumentKind {
  /**
   * 電子 ~ Electric.
   */
  ELECTRIC = 0,

  /**
   * 紙 ~ Paper.
   */
  PAPER = 1,
}

export const MukoTextMap = {
  0: '',
  1: 'ゴミ箱済み',
  2: '配布・転送',
  3: '返付',
  4: '起案済',
  5: '削除済',
  7: '差戻し中',
};

export enum PermReceptionDocument {
  /**
   * 文書取扱主任（総括） ~ Document handling chief (general manager)
   */
  GENERAL_MANAGER = '20',

  /**
   * 文書取扱主任（局） ~ Document handling chief (bureau)
   */
  BUREAU = '21',

  /**
   * 文書取扱主任（部） ~ Document handling chief (department)
   */
  DEPARTMENT = '22',

  /**
   * 文書取扱主任（課） ~ Document handling chief (section)
   */
  SECTION = '23',
}
