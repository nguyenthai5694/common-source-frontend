import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import Sticky from 'react-sticky-el'

export default function Tab({ tabs }) {
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
            className={clsx('b-tab__item', {
              '-active': tab.isActive,
              '-deciding': tab.isDeciding,
            })}
            key={index}
          >
            {/* TODO: {tab.link || ''} => {tab.link} */}
            <Link to={tab.link || ''} className='b-tab__link'>
              <span className='b-tab__icon'>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sticky>
  )
}
