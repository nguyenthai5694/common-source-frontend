/**
 * Note: There are many role and i don't know how to group
 * @deprecated Use `BunsyoPicRole` in `app/const/bunsyo.const.ts` instead.
 */
export enum Role {
  /**
   * 起案者 ~ Drafter.
   */
  DRAFT = '起案者',

  /**
   * 文書管理者 ~ Document manager.
   */
  DOCUMENT_MANAGER = '文書管理者',

  /**
   * 決裁者 ~ Approver.
   */
  AUTHORIZER = '決裁者',

  /**
   * 供覧者 ~ Announcer.
   */
  EXHIBITOR = '供覧者',

  /**
   * 代行者 ~ Substitute.
   */
  SUBSTITUTE = '代行者',

  /**
   * 文書取扱主任 ~ Document handling chief.
   */
  DOCUMENT_HANDLING_CHIEF = '文書取扱主任',

  /**
   * 公印審査者 ~ Official seal examiner.
   */
  OFFICIAL_SEAL_EXAMINER = '公印審査者',

  /**
   * 官報審査者 ~ Official bulletin examiner.
   */
  OFFICIAL_BULLETIN_EXAMINER = '官報審査者',
}