import React, { ReactNode } from 'react'

interface PageTitleProps {
  id?: string;
  label: string;
  children?: ReactNode;
}

export default function PageTitle2({ id = undefined, label, children }: PageTitleProps) {
  return (
    <h2 id={id} className='p-page-title -level2'>
      {label}
      &nbsp;

      {children}
    </h2>
  )
}
