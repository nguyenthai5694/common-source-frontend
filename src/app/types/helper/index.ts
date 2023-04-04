import { ComponentType } from 'react';

/**
 * @see https://itnext.io/extracting-decorated-properties-from-classes-in-typescript-caf24aabcb59
 */
export type MapValuesToKeys<T> = { [K in keyof T]: K };

export type ExtractPropsFromComponent<C> =
  C extends ComponentType<infer P> ? P : any;