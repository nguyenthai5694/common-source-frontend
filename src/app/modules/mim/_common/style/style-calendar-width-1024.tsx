import React from 'react';

export default function StyleWidth1024Calendar() {
  const css = `

  .p-calendar__wrap .react-calendar__navigation__label__labelText {
    font-size: 13px;
  }
  
  @media screen and (max-width: 1024px) {

    .p-calendar__wrap .react-calendar__navigation__label__labelText {
      font-size: 12px;
    }

    .p-calendar__wrap  .react-calendar__month-view__weekdays__weekday abbr {
      font-size: 11px;
    }

    .p-calendar__wrap  .react-calendar__month-view__days__day abbr {
      font-size: 11px;
    }

    .p-calendar__wrap  .p-calendar__footer {
      font-size: 11px;
    }

    .p-calendar__wrap  .p-calendar__wrap-label {
      padding: 10px 0 0 16px;
    }

    .p-calendar .p-calendar__wrap-from .react-calendar__month-view,
    .p-calendar .p-calendar__wrap-to .react-calendar__month-view {
      height: 210px;
    }

    .p-calendar .react-calendar__navigation__prev-button:hover::before,

    .p-calendar .react-calendar__navigation__prev2-button:hover::before,

    .p-calendar .react-calendar__navigation__next-button:hover::before,

    .p-calendar .react-calendar__navigation__next2-button:hover::before {
      font-size: 10px;
    }
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

