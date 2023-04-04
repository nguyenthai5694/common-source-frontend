import { ReactElement, MutableRefObject } from 'react';

export type AvailablePlacement =
  'top-right' | 'top-center' | 'top-left' |
  'middle-right' | 'middle-left' |
  'bottom-right' | 'bottom-center' | 'bottom-left';

export interface PopoverProps {
  /**
   * Component used as a "button" to toggle popover.
   */
  toggleButton?: ReactElement;

  innerRef?: MutableRefObject<PopoverHelper>;

  className?: string;

  /**
   *
   */
  children: (popoverHelper: PopoverHelper) => ReactElement;

  /**
   * Default: 'bottom-right'
   */
  placement?: AvailablePlacement;

  /**
   * Default: false
   */
  hoverTrigger?: boolean;

  /**
   * Default: false
   */
  focusTrigger?: boolean;

  /**
   * Default: false
   */
  disableClickOutside?: boolean;
}

export interface PopoverHelper {
  toggle: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}