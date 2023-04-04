import React from 'react'

interface Section {
  id: string;
  hash: string;
  label: string;
}

interface InPageAnchorProps {
  sections: Section[];
  isUsedInModal?: boolean;
}

export default function InPageAnchor({ sections, isUsedInModal = false }: InPageAnchorProps) {
  return (
    <ul className='b-in-page-anchor'>
      {sections.map((section, index) => (
        <li id={section.id} key={index} className='b-in-page-anchor__item'>
          <a
            href={section.hash}
            className='b-in-page-anchor__link'
            data-smooth-scroll
            data-scroll-in-modal={isUsedInModal ? isUsedInModal : undefined}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
