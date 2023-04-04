/* eslint-disable no-useless-escape */
/*
 * Fill pages detail, create, edit...
 * pages don't show link in nav, to active parent nav when access this page
 */
export const navChildCurrent = {
  rec: [
    '/rec/shujutoroku',
    '/rec/shuju-detail',
    '/rec/denshitoroku',
    '/rec/haifutenso-list',
    '/rec/shori-status-confirm',
  ],
  dae: [],
}

/*
 * Get page title using for update breadcrumb
 * Pages with the same sub page
 */
export const navPagesTitle = {
  rec: [
    {
      path: '/rec/shuju-list',
      title: '受付文書一覧',
    },
    {
      path: '/rec/gomi',
      title: 'ごみ箱',
    },
    {
      path: '/rec/shujukanryo-list',
      title: '帳票出力',
    },
  ],
  dae: [],
}

export const regexInvalidFileName = new RegExp('^[^\"/\?\:|<>\\\\*]+$');
export const maxLengthFileName = 64;
export const MAX_LENGTH_FILE_SIZE = '読込できるファイルは1点で、2MB以下になります。'

/*
 * Max words
 */
export const KEYWORD_MAX_CHARACTERS = 100
export const KEYWORD_MAX_WORDS = 10
export const MAX_WORD_NOTES = '※文字数は最大100文字、ワードは10個までスペース区切りで入力可能'
export const MAX_WORD_SETTING = '指定可能数の上限値'
export const MULTIPLE_SEARCH_NOTES = 'スペース区切りで複数指定可能'
export const MAX_LENGTH_BOS_NM_NO = 110000

/*
 * Timer re call api lock record 9'30 minutes
 */
export const TIMER_RE_LOCK_ITEM_PAGE = (9 * 60 + 30) * 1000; // 9'30s
export const TOTAL_TIMER_INTERVAL_CHECK_USER_ACTIVE_TAB = 20000; // 9'30s to 9'50s interval check user active tab
/*
 * Request Header key Fusho-Code
 */
export const TAFUSHO_CD_HEADER_KEY = 'Fusho-Code';
/*
 * Request Header key Origin-User-Id
 */
export const ORIGIN_USER_ID_HEADER_KEY = 'Origin-User-Id';

/*
 * 決裁者最大設定数既定
 */
export const MAXIMUM_OF_KESSAI_DEFAULT = 20;

/**
 * Max size
 */
export const MAXIMUM_OF_FILE_SIZE = '添付ファイル容量設定';

/**
 * Max length file name upload
 */
export const MAX_LENGTH_OF_FILE_NAME = 'ファイル名文字数制限';

/**
 * Organization class code
 */
export const ORGANIZATION_CLASS_CODE = '組織クラスコード';

/**
 * Special page modal window can open with another tab browser
 */
export const MODAL_WINDOW_CAN_OPEN_OTHER_TAB = [
  {
    pathWith: '/mim/hozonkikanhyolist?viewMode=true',
    uniqueStorage: 'SP_mim_hozonkikanhyolist',
  },
];
