/* eslint-disable complexity */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BehaviorSubject } from 'rxjs';
// import { MenuListItem } from 'app/api/common/get-menu.api';

export interface Page {
  label: string;
  url: string;
  search?: string;
  state?: Object;
}

interface BreadcrumbProps {
  pages: Page[];
  isCustomBreadcrumb?: boolean;
}

export const breadcrumbSubject = new BehaviorSubject<string>(null);

export default function Breadcrumb({ pages, isCustomBreadcrumb }: BreadcrumbProps) {
  const [currentPath, setCurrentPath] = useState<string>();
  const [newsPages, setNewsPages] = useState<Page[]>([...pages]);
  const newPagesRef = useRef<Page[]>();

  useEffect(() => {
    breadcrumbSubject.subscribe((path) => {
      setCurrentPath(path);
    });
  }, []);

  useEffect(() => {
    newPagesRef.current = pages;
    handleBreadcrumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  const handleBreadcrumb = useCallback(() => {
    if (!currentPath || isCustomBreadcrumb) return;

    let level1: any = null;
    let level2: any = null;
    let level3: any = null;
    const menuItems = [];

    let breakCheck = false;

    for (const item of menuItems) {
      if (breakCheck) break;

      level1 = item;
      level2 = null;
      level3 = null;

      if (item.url === currentPath) {
        level2 = null;
        breakCheck = true;
        break;
      }

      if (item.childNodes && item.childNodes.length) {
        for (const subItem of item.childNodes) {
          if (breakCheck) break;

          level2 = subItem;
          level3 = null;

          if (subItem.url === currentPath) {
            breakCheck = true;
            break;
          }

          if (subItem.childNodes && subItem.childNodes.length) {
            for (const childSubItem of subItem.childNodes) {
              level3 = null;

              if (childSubItem.url === currentPath) {
                level3 = childSubItem;
                breakCheck = true;
                break;
              }
            }
          }
        }
      }
    }

    // No item exist
    if (!breakCheck) return;

    const pagesUpdate = newPagesRef.current.length ? newPagesRef.current : [...newsPages];

    if (pagesUpdate[3]?.label && level3) {
      pagesUpdate[3].label = level3.funcName
    }

    if (pagesUpdate[2]?.label && level2) {
      pagesUpdate[2].label = level2.funcName
    }

    if (pagesUpdate[1]?.label && level1) {
      pagesUpdate[1].label = level1.funcName
    }

    setNewsPages([...pagesUpdate]);
  }, [currentPath, isCustomBreadcrumb, newsPages])

  useEffect(() => {
    handleBreadcrumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <nav role='navigation' className='b-breadcrumb' aria-label='現在位置'>
      <ol className='b-breadcrumb__list'>
        {newsPages.map((page, index) => (
          <li key={index} className='b-breadcrumb__item'>
            {index !== 0 && (
              <img
                className='b-breadcrumb__arrow'
                width='16'
                height='16'
                src='/public/assets/images/icons/arrow-right-primary-36.svg'
                alt=''
              />
            )}

            {page.url === '' ? (
              <span className='b-breadcrumb__link'>{page.label}</span>
            ) : (
              <Link
                to={(page.state || page.search) ? {
                  pathname: page.url,
                  search: page.search,
                  state: { ...page.state },
                } : page.url}
                className='b-breadcrumb__link'
                aria-current={
                  index === pages.length - 1 ? 'location' : undefined
                }
              >
                {page.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
