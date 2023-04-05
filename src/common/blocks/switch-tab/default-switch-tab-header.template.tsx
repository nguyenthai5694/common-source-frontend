import React from 'react'
import clsx from 'clsx'
import Sticky from 'react-sticky-el'
import { SwitchTabHeaderProps } from './switch-tab.component'

export default function DefaultSwitchTabHeader(props: SwitchTabHeaderProps) {
  const { activeTabId, tabs, handleChangeTab } = props;

  return (
    <Sticky
      stickyClassName='b-tab__sticky'
      topOffset={-64}
      stickyStyle={{ top: '64px' }}
    >
      <ul className='b-tab' data-tab>
        {tabs.map((tab, index) => (
          <li
            id={tab.id}
            tabIndex={tab?.tabIndex}
            className={clsx('b-tab__item', {
              '-active': activeTabId === tab.id,
              '-deciding': tab.checked,
              '-disabled': tab.disabled,
            })}
            key={index}
            onClick={handleChangeTab(tab.id)}
          >
            <span className='b-tab__link'>
              {tab.label}
            </span>
          </li>
        ))}
      </ul>
    </Sticky>
  )
}
