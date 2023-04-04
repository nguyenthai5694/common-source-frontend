import { AvailablePlacement } from './popover.type'

type PlacementPosition = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

type PlacementCalculator = (popoverRect: DOMRect, popoverContentRect?: DOMRect) => PlacementPosition;

export const placementCalculators: { [placement in AvailablePlacement]: PlacementCalculator } = {
  'top-right': popoverRect => ({
    bottom: `${window.innerHeight - popoverRect.top + 4}px`,
    right: `${window.innerWidth - popoverRect.left - popoverRect.width}px`,
  }),

  /**
   * top-center is not support now
   */
  'top-center': () => null,

  'top-left': popoverRect => ({
    bottom: `${window.innerHeight - popoverRect.top + 4}px`,
    left: `${popoverRect.left}px`,
  }),

  'middle-right': popoverRect => ({
    top: `${popoverRect.top}px`,
    left: `${popoverRect.left + popoverRect.width + 8}px`,
  }),

  'middle-left': popoverRect => ({
    top: `${popoverRect.top}px`,
    right: `${window.innerWidth - popoverRect.left - 8}px`,
  }),

  'bottom-right': popoverRect => ({
    top: `${popoverRect.top + popoverRect.height + 4}px`,
    right: `${window.innerWidth - popoverRect.left - popoverRect.width}px`,
  }),

  /**
   * bottom-center is not support now
   */
  'bottom-center': () => null,

  'bottom-left': popoverRect => ({
    top: `${popoverRect.top + popoverRect.height + 4}px`,
    left: `${popoverRect.left}px`,
  }),
}