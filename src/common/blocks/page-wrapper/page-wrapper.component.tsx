import React, { useEffect, ReactNode } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Breadcrumb, { Page } from 'common/blocks/breadcrumb/breadcrumb.component'
import PageError, { PageErrorType } from 'common/blocks/page-error/page-error.component';
import { titleSubject } from 'common/blocks/prompt'
import Loading from 'common/parts/loading/loading.component'
import PageTitle from 'common/parts/page-title/page-title.component'

export enum InitPageStatus {
  RUNNING,
  OK,
  FAIL,
  CUSTOM_ERROR
}

export interface PageWrapperProps {
  idTitle?: string;
  pages: Page[];
  rightBreadcrumbBlock?: ReactNode;
  title: string;
  rightPageTitleBlock?: ReactNode;
  className?: string;
  children: ReactNode;
  besidePageTitleBlock?: ReactNode;
  isDisplayTitle?: boolean;
  initPageStatus?: InitPageStatus;
  documentTitle?: string;

  /**
   * Default: false.
   */
  hideTop?: boolean;
  underTitleBlock?: ReactNode;

  /**
   * Default: false.
   */
  hasDepartmentSelector?: boolean;
  customPageErrorType?: PageErrorType;

  /**
   * Default: false.
   * Use true to control 100% breadcrumb in parent screen, not get label from menu list
   */
  isCustomBreadcrumb?: boolean;
}

export default function PageWrapper({
  idTitle = '',
  isDisplayTitle = true,
  title,
  pages,
  rightBreadcrumbBlock,
  rightPageTitleBlock,
  besidePageTitleBlock,
  className,
  children,
  initPageStatus = InitPageStatus.OK,
  documentTitle = '',
  hideTop = false,
  underTitleBlock,
  hasDepartmentSelector = false,
  customPageErrorType,
  isCustomBreadcrumb = false,
}: PageWrapperProps) {
  useEffect(() => {
    document.title = `${documentTitle || title}`;

    // notify title changed
    titleSubject.next(document.title);
  }, [title, documentTitle]);

  if (initPageStatus === InitPageStatus.RUNNING) {
    return <Loading />
  }

  if (initPageStatus === InitPageStatus.FAIL) {
    return <PageError error={PageErrorType.PAGE_LOADFAILED} />
  }

  if (initPageStatus === InitPageStatus.CUSTOM_ERROR) {
    return <PageError error={customPageErrorType} />
  }

  return (
    <div className={`main-page ${className}`}>
      {!hideTop && (
        <>
          <div className='b-page-wraper_top'>
            <Link to={'/'}>
              <HomeIcon />
            </Link>

            <Breadcrumb pages={pages} isCustomBreadcrumb={isCustomBreadcrumb} />

            {rightBreadcrumbBlock}
          </div>

          <div className={clsx('b-page-wraper_bottom', { 'h-d_flex -align-start': hasDepartmentSelector })}>
            {isDisplayTitle &&
              <PageTitle
                id={idTitle}
                label={title}
                className={hasDepartmentSelector ? 'h-text-white-space -nowrap' : ''}
              >
                {besidePageTitleBlock}
              </PageTitle>
            }

            {rightPageTitleBlock}
          </div>

          {underTitleBlock}
        </>
      )}

      {children}
    </div>
  )
}
