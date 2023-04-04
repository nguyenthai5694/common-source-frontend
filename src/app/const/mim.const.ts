export enum MimConst {
  /*
    Define label status
   */
  MIM_STATUS_TRUE = '○',
  MIM_STATUS_FALSE = '×',

  MIM_STATUS_TRUE_RS = '○',
  MIM_STATUS_FALSE_RS = '－',

  MIM_RS01_TRUE = '1',
  MIM_RS01_FALSE = '2',

  BEFORE_EXECUTION = '1', //施行後=H23.4.1〜
  AFTER_EXECUTION = '0', //施行前=〜H23.3.31

  SHOKANGAEOUTNO_STATUS_1 = '1',
  SHOKANGAEOUTNO_STATUS_2 = '2',
  SHOKANGAEOUTNO_STATUS_3 = '3',

  MIM_MESSAGE_UPDATE_INVALID = '電子メール受信設定を選択してください',
  MIM_MESSAGE_FORM_INVALID = 'Form must be filled',
  MIM_MESSAGE_SELECT_DEFAULT_INVALID = '無効な場合は初期値に設定できません。',

  MIM_MANYUARUS_MAX_FILE_SIZE = '10485760',

  INFINITY_VALUE = '999',
  FAKE_UPLOAD_MILS = '500',
}

export const MIM_MESSAGE = Object.freeze({
  DESCRIPTION: {
    KEYWORD: '※文字数は最大100文字、ワードは10個までスペース区切りで入力可能',
  },
  CONFIRM: {
    UPLOAD_CSV: 'CSVファイルを登録します。',
    CHECK_START: 'レコードスケジュール一括登録データのチェックを開始します。',
    RUN: '実行します。',
    CANCEL: (screenName: string) => {
      return `${screenName}データを削除します。`;
    },
    DOWNLOAD: 'ダウンロードします。',
    DELETE_ITEM: '削除します。',
    DELETE_IN_USE: '既に紐づけされている保存期間表があります。',
    SWITCH_ADMIN_TYPE: '入力状態が破棄されます。',
    SWITCH_BUNGRI_GROUP_CODE: 'アクセス範囲を変更すると\n画面内容が破棄されます。',
    UPDATE: '更新します。',
    UPDATE_OVERRIDE: '初期値を置き換えて登録します。',
    OVERRIDE_WARNING_THRESHOLD: (warningThreshold: string) => {
      return `選択されている件数が${warningThreshold}件を超えています。`;
    },
  },
  QUESTION: {
    IS_IT_OK: 'よろしいですか？',
    SURE_DELETE: '本当に削除しますか？',
    OVERRIDE_WARNING_THRESHOLD: '処理に時間がかかりますがよろしいでしょうか？',
  },
  SUCCESS: {
    UPLOAD_CSV: 'CSV読込が完了しました。',
    CHECK_START: 'チェックが完了しました。',
    RUN: '実行が完了しました。',
    CANCEL: '取消しが完了しました。',
  },
  ERROR: {
    FILE_EXCEED: (fileSize: number = 10) => {
      return `ファイルの添付可能なサイズ合計値は、${fileSize}MB以下となります。`;
    },

    FILE_FORMAT: 'ファイル選択は正しくありません。',
    /** START: Used in SC021401, SC013902 **/
    CHECK_STATUS: (screenName: string) => {
      return `データチェック結果が、 ${screenName}括登録実行可能ではありません。`;
    },
    CHECK_REGIST: (screenName: string) => {
      return `${screenName}実行中です。`;
    },
    /** END **/
    EMPTY_DOWNLOAD: 'データがありません。',
  },
});
