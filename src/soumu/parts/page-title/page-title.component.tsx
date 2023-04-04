import React, { ReactNode } from 'react';

interface PageTitleProps {
  id?: string;
  label: string | ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function PageTitle({ id = undefined, label, children, className }: PageTitleProps) {
  return (
    <h1
      id={id}
      className={`p-page-title ${className}`}
    >
      {label}
      &nbsp;

      {children}
    </h1>
  )
}
