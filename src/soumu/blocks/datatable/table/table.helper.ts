import { ColumnsConfig } from '../datatable.type';

export function hasLeftTableOnly(fixedNum: number, columnsConfig: ColumnsConfig) {
  // The reason to support 2 types is a long sad story.
  return fixedNum === -1 || fixedNum === columnsConfig.filter(c => c.disabled || c.isVisible).length;
}