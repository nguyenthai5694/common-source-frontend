const lodash = await import('lodash');
const message = await import('app/const/message.const');

/**
 * Lodash helper.
 */
declare var _: lodash;

type Codes = keyof typeof message.messages;

/**
 * Format text.
 */
declare var text: (code: Codes, ...args: (string | number)[]) => string;

declare global {
  interface Window {
    __active_cookie__: string;
  }
}

declare interface Window {
  __active_cookie__: string;
}

/**
 * Sanitizes HTML and prevents XSS attacks
 */
declare var sanitize: (dirty: string) => string;

/**
 * Get enforcement law
 */
interface ItemEnforcementLaw {
  label: string;
  value: number;
  order: number;
  default: number;
}
declare var getEnforcementLaw: (type: 'pulldown' | 'checkbox' | 'list') => ItemEnforcementLaw[];
