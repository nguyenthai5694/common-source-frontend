import React, { ReactNode, useEffect, useState } from 'react'
import Popover, { AvailablePlacement } from 'soumu/parts/popover/popover.component';

let tooltipId = 1;

export interface TooltipProps {
  label?: string;
  content: string | ReactNode;
  children: ReactNode;
  placement?: AvailablePlacement;
  className?: string
  tabIndex?: number;
  isFocusTrigger?: boolean
}

export default function Tooltip(props: TooltipProps) {
  const [tooltipContentId, setTooltipContentId] = useState(null);

  useEffect(() => {
    setTooltipContentId(`p-popover__tooltip-content-${tooltipId}`)
    tooltipId++;
  }, []);

  const toggleButton = (
    <span
      tabIndex={props?.tabIndex || 0}
      aria-label={props.label}
      aria-describedby={tooltipContentId}
    >
      {props.children}
    </span>
  );

  return (
    <Popover
      toggleButton={toggleButton}
      placement={props.placement}
      hoverTrigger={true}
      focusTrigger={props.isFocusTrigger ?? true}
      className={props.className}
    >
      {(popoverHelper) => (
        <div
          id={tooltipContentId}
          className='p-help__text'
          role='tooltip' aria-hidden={!popoverHelper.isOpen}
        >
          {props.content}
        </div>
      )}
    </Popover>
  );
}
