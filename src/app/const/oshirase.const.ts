/**
 * This file contain const for oshirase(~ document).
 */

const IMPORTANT = '〇';
const FIXED = '〇';
const HAS_MESSAGE = 'あり';

export enum NoticeType {
  SYSTEM = 0,
  ADMIN = 1,
}

export function getImportant(isImportant) {
  if (isImportant === 1) {
    return IMPORTANT;
  } else {
    return '';
  }
}

export function getFixed(isFixed) {
  if (isFixed === 1) {
    return FIXED;
  } else {
    return '';
  }
}

export function hasMessage(messsage) {
  if (messsage) {
    return HAS_MESSAGE;
  } else {
    return '';
  }
}

export enum UspConst {
  KEYWORD_DESCRIPTION = '※文字数は最大100文字、ワードは10個までスペース区切りで入力可能',
}
