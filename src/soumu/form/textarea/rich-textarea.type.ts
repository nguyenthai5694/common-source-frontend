import { FormControlChildProps } from 'soumu/form'

export interface RichTextareaProps extends FormControlChildProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  defaultStatus?: any;
  defaultMessage?: string;
  maxLength?: number;
  require?: boolean;
  className?: string;
  hasAddLink?: boolean;
  readOnly?: boolean;
  hasResetSize?: boolean;
  width?: string;
  isViewMode?: boolean;
  breakLine?: boolean;
  autoTrim?: boolean,
}
