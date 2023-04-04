import { BehaviorSubject } from 'rxjs';

export interface IPromptSbj {
  status: boolean;
  msg?: string;
}

/**
 * @deprecated Actually, this variable is not deprecated,
 * but it expose API more than need (Eg: unsubscribe, error,...).
 * If you only want to enable/disable prompt, you should
 * use `setPromptStatus` instead.
 * 
 * NOTE: `promptSbj` will be unpublished.
 */
export const promptSbj = new BehaviorSubject<IPromptSbj | boolean>({ status: false });

export function setPromptStatus(status, msg?) {
  promptSbj.next({ status, msg });
}

export const getPromtStatus = (): IPromptSbj | boolean => promptSbj.getValue()
