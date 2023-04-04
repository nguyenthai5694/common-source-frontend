import React from 'react';

interface StyleCalendarTooltip {
  classScreen?: string,
}

export default function StyleCalendarTooltip(props: StyleCalendarTooltip) {
  const css = `
  ${props.classScreen || ''} .p-calendar .p-input__message.-inValid {
       position: absolute;
       top: 100%;
       left: 0;
       z-index: 1;
       max-width: 260px;
       margin-right: -260px;
       padding: 0.5em 0.6666666667em 0.3333333333em;
       color: #fff;
       font-size: 0.75rem;
       line-height: 1.3;
       white-space: normal;
       background: #1f334d;
       border-radius: 3px;
  }
  ${props.classScreen || ''} .p-calendar .p-input__message.-inValid::before {
       position: absolute;
       top: -5px;
       left: 8px;
       width: 0;
       height: 0;
       background: transparent;
       border-color: transparent transparent #1f334d transparent;
       border-style: solid;
       border-width: 0 4px 5px;
       content: '';
     }
     ${props.classScreen || ''} .p-calendar .p-calendar__period {
        background-image: url(/public/assets/images/icons/calendar-blue.svg);
        background-size: 15px;
     }
  `

  return (
    <>
      <style>
        {css}
      </style>
    </>
  )
}
