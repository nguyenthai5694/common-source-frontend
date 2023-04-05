import { Observable } from 'rxjs'

export interface PortalDialogRef {
  close: (data?: any) => void;
  afterClosed: () => Observable<any>;
}

export interface PortalDialogAll {
  portalDialogRef: PortalDialogRef;
  content: any; // TODO: remove any
  portaldata?: any;
}

export interface ModalProps {
  children?: any;

  title?: string;

  /**
   * Default: false
   */
  isOpen?: boolean;

  submitLabel?: string;

  onSubmit?: () => void;

  cancelLabel?: string;

  onCancel?: () => void;

  onDelete?: () => void;

  onChangePassClick?: () => void;

  deleteLabel?: string;

  deleteDisabled?: boolean;

  deleteTheme?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerSolid' | 'dark' | 'none';
  submitTheme?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerSolid' | 'dark' | 'none';

  /**
   * Default: 'l'
   */
  size?: 'xs' | 's' | 'm' | 'ml' | 'l' | 'f' | 'auto'

  submitId?: string;

  deleteId?: string;

  cancelId?: string;

  /**
   * Default: false
   */
  disabledSubmitButton?: boolean;

  downloadBtnId?: string;

  downloadBtnLabel?: string;

  handleDownload?: any;

  footerText?: string;

  modalInnerClassName?: string;

  modalBodyClassName?: string;

  submitSecondLabel?: string,

  submitSecondId?: string,

  onSubmitSecond?: () => void;

  disableSubmitSecond?: boolean;

  submitSecondTheme?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerSolid' | 'dark' | 'none',

  isFlexFooter?: string;

  isDisplayCancelBtnOnLeft?: boolean;
  /**
   * Default: false
   */
  displayBackToTopButton?: boolean;

  /**
   * Get ID of scroll DOM Element
   * Ex: #element
   */
  modalScrollElement?: string;

  /**
   * Default: false
   */
  disabledDownloadButton?: boolean;

  /**
   * Add option submit button in modal when use formik
   * Default: button
   */
  typeButtonSubmit?: 'button' | 'submit'
  isDisplaySubmitBtn?: boolean;

  /**
   * Add theme for title modal
   * Default: ''
   */
  headerTheme?: 'primary'
  isShowCloseHidden?: boolean;

  /**
   * Support event tab/shift tab end of modal
   */
  hasRoundButton?: boolean;
  roundButtonClass?: string;
}

export interface ModalDialogProps {
  children?: any;

  /**
   * Default: false
   */
  isOpen?: boolean;

  submitLabel?: string;

  onSubmit?: () => void;

  /**
   * Default: 'primary'
   */
  submitTheme?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dark' | 'dangerSolid';

  cancelLabel?: string;

  onCancel?: () => void;

  /**
   * Default: 'l'
   */
  size?: 's' | 'm' | 'l'
}
