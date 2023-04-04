import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { last } from 'lodash'
import { Link } from 'react-router-dom';

export function NavItem({ index, items, currentPath, referralRouteId, handleMenu, isOpenNav, isResizeWindow }) {
  const liRef = useRef<HTMLLIElement>(null)
  const subMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (items.level === 1) {
      liRef && liRef.current.setAttribute('data-first-nav-item', 'true')
    }
  }, [items.level])

  useEffect(() => {
    if (isOpenNav) return;

    const ul = subMenuRef.current;

    // Reset for resize window
    if (ul) ul.style.top = '0px';

    if (ul && ul.style.height) ul.style.height = '';

    if (ul && ul.style.overflow) ul.style.overflow = '';

    const handlePosMenu = () => {
      if (!ul) return; // No sub menu

      const clientHeight = window.innerHeight;
      const rect = ul.getBoundingClientRect();

      if (rect.bottom <= clientHeight) return;

      // Menu bottom > bottom height and Menu height < clientHeight
      if (rect.bottom > clientHeight && rect.height < clientHeight) {
        ul.style.top = `${clientHeight - rect.bottom - 1}px`;
      } else if (rect.bottom > clientHeight && rect.height > clientHeight) {
        // Menu bottom > bottom height and Menu height > clientHeight
        ul.style.height = `${clientHeight}px`;
        ul.style.overflow = 'auto';
        ul.style.top = `-${rect.top}px`;
      }
    }

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        if (items.level >= 2) {
          setTimeout(() => handlePosMenu(), 100);

          return;
        }

        handlePosMenu();
      });
    }, 50)
  }, [isOpenNav, items, isResizeWindow])

  const parseClassByLevel = (level) => {
    switch (level) {
      case 1:
        return 'first'
      case 2:
        return 'second'
      case 3:
        return 'third'
      default:
        break;
    }
  }

  return (
    <li
      className={`b-nav__${parseClassByLevel(items.level)}-item`}
      aria-expanded='false'
      key={index}
      ref={liRef}
    >
      {items.childNodes?.length === 0 ?
        (((items.url?.indexOf('eAccess') > -1) || ((items.url?.indexOf('/cbt') > -1))) ?
          <a href={items.url} className={`b-nav__${parseClassByLevel(items.level)}-button`}>
            <span className={`b-nav__${parseClassByLevel(items.level)}-text`}> {items.funcName}</span>
          </a>
          :
          (((items.url?.indexOf('/cbt') > -1))) ? null :
            <Link
              className={clsx(`b-nav__${parseClassByLevel(items.level)}-button`, {
                '-home': items.icon === 'home',
                '-calendar': items.icon === 'calendar',
                '-trash-fill': items.icon === 'trash-fill',
                '-setting': items.icon === 'setting',
                '-current': items.url === currentPath
                  || (!!referralRouteId && last(items?.url?.split('/') || []) === referralRouteId),
              })}
              to={items.url}
            >
              <span className={`b-nav__${parseClassByLevel(items.level)}-text`}> {items.funcName}</span>
            </Link>
        ) : (
          <>
            <button
              className={clsx(`b-nav__${parseClassByLevel(items.level)}-button`, {
                '-pin': items.icon === 'pin',
                '-draft': items.icon === 'draft',
                '-inbox': items.icon === 'inbox',
                '-file-search': items.icon === 'file-search',
                '-setting': items.icon === 'setting',
                '-sitemap': items.icon === 'sitemap',
              })}
              type='button'
              onClick={handleMenu}
            >
              <span className={`b-nav__${parseClassByLevel(items.level)}-text`}>{items.funcName}</span>

              <span className={`b-nav__${parseClassByLevel(items.level)}-arrow`} >
                <img
                  src='/public/assets/images/icons/arrow-white.svg'
                  alt='開く'
                />
              </span>
            </button>

            <ul className={`b-nav__${parseClassByLevel(items.level + 1)}-list`} ref={subMenuRef}>
              {
                items.childNodes && items.childNodes.map((child: any, i: React.Key) => (
                  <NavItem
                    items={child}
                    currentPath={currentPath}
                    referralRouteId={referralRouteId}
                    handleMenu={handleMenu}
                    index={i}
                    key={i}
                    isOpenNav={isOpenNav}
                    isResizeWindow={isResizeWindow}
                  />
                ),

                )
              }
            </ul>
          </>
        )
      }
    </li >
  )
}
