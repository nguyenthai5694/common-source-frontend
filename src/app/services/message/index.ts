import { messages } from 'app/const/message.const'

type Codes = keyof typeof messages;

/**
 * @deprecated use `text` function instead(`msg` will be renamed to `text`)
 */
export function msg(code: Codes, ...args: (string | number)[]): string {
  const rawMsg = messages[code] as string;

  if (!rawMsg) {
    return 'エラー';
  }

  return rawMsg.replace(/{(\d+)}/g, function (match, number) {
    return args[`${number}`] ? args[`${number}`] : match;
  });
}

/**
 * Note: This function is declared as global function, so there is no need to import.
 */
export function text(code: Codes, ...args: (string | number)[]): string {
  return msg(code, ...args);
}
