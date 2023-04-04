export interface DocumentNumber {
  bunId?: number;
  /** ~ Document no */
  bunsyoNo?: number;
  /** ??? */
  ctrCd?: number;
  /** ??? */
  ctrKigo?: string;
  /** ??? */
  ctrMoji?: string;
  /** ??? */
  ctrMoji2?: any;
  /** ??? */
  ctrVal: number;

  /**
   * Document number, that will be used to display to user.
   */
  dbString: string;
  /** ??? */
  edaKigo?: any;
  /** ??? */
  edaVal?: number;
  /** ??? */
  fukusuuSaiban?: any;
  /** ??? */
  fullBunId: any;
  /** ??? */
  mmddUmu?: number;
  /** ??? */
  nendo?: number;
  /** ??? */
  useDay?: any;
}