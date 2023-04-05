export interface DisplayItemsData {
  items: any[];
  isLazy: boolean;

  /** Is drag&drop */
  isD2D?: boolean;
}

export interface DatatablePosition {
  top: number;
  tableLeftScroll: number;
  tableRightScroll?: number;
}
