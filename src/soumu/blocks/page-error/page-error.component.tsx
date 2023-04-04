import React from 'react';

export class PageErrorType {
  public static readonly PAGE_NOTFOUND = new PageErrorType(
    '404 Not Found',
    '');

  public static readonly FORBIDDEN = new PageErrorType(
    '403 Forbidden',
    '');

  public static readonly PAGE_LOADFAILED = new PageErrorType(
    'PAGE LOADFAILED',
    '');

  public static readonly APP_LOADFAILED = new PageErrorType(
    'APP LOADFAILED',
    '');

  public static readonly PAGE_CRASHED = new PageErrorType(
    'PAGE CRASHED',
    '');

  private constructor(public readonly title: string, public readonly content: string) { }
}

export enum PageErrorName {
  ChunkLoadError = 'ChunkLoadError'
}

interface PageErrorProps {
  error: PageErrorType,
  isOffline?: boolean
}

export default function PageError({ error, isOffline = false }: PageErrorProps) {
  return (
    <div className='b-page-error'>

      <div className='b-page-error__content '>
        <p className='content-title'>{error.title}</p>

        <p style={{ whiteSpace: 'pre-line' }}>{error.content}</p>
      </div>
    </div>
  )
}
