import React, { useEffect, useRef, useState } from 'react'
import * as _ from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { getCustomDataKey } from 'app/services/page-data'
import { routerNav, setPathNavigation } from 'app/services/store-root-path'
import { breadcrumbSubject } from '../breadcrumb/breadcrumb.component'

const checkRootPath = (currentRootPathList, locationPathName, rootPath, setActiveNav, values) => {
  if (locationPathName.includes('/adm')) {
    sessionStorage.setItem('screen_has_tree', 'false')
  }

  if (currentRootPathList && _.includes(currentRootPathList, locationPathName)) {
    setPathNavigation({ rootPath })
    setActiveNav(rootPath)
    breadcrumbSubject.next(rootPath);

    return
  }

  for (const rootPath in routerNav) {
    if (_.includes(routerNav[rootPath], locationPathName) && routerNav[rootPath].length && !values?.fromTo) {
      // Case path is children path and is root path then url has query params
      if (_.includes(Object.keys(routerNav), locationPathName) && (!values || !Object.keys(values).length)) break;

      setPathNavigation({ rootPath })
      setActiveNav(rootPath)
      breadcrumbSubject.next(rootPath);

      return
    }
  }

  if (!values?.fromTo || _.includes(Object.keys(routerNav), locationPathName)) {
    setPathNavigation({ rootPath: locationPathName })
    setActiveNav(locationPathName)
    breadcrumbSubject.next(locationPathName);

    return
  }

  setPathNavigation({ rootPath: '' })
  setActiveNav('')
  breadcrumbSubject.next(locationPathName);
}

const updateCurrentPath = (history, setActiveNav) => {
  let locationPathArray = history.location.pathname.split('/').filter(Boolean);
  let locationPathName: string;
  const query = history.location.search;
  const dataKey = getCustomDataKey('',
    history.location.pathname.split('/').slice(-1)[0])
  const sessionQueries = JSON.parse(sessionStorage.getItem(dataKey))
  const values = (!_.isEmpty(queryString.parse(query)) ? queryString.parse(query) : sessionQueries) || {};
  const rootPaths = Object.keys(routerNav)
  let currentRootPathList
  let rootPath

  rootPaths.forEach((path) => {
    if (values?.fromTo && _.includes(path, values.fromTo)) {
      currentRootPathList = routerNav?.[path]
      rootPath = path

      return
    }
  })

  if (!locationPathArray.length) {
    locationPathName = '/'
  } else {
    locationPathName = history.location.pathname

    if (parseInt(locationPathName.slice(locationPathName.lastIndexOf('/') + 1))) {
      locationPathName = locationPathName.slice(0, locationPathName.lastIndexOf('/'))
    }
  }

  checkRootPath(currentRootPathList, locationPathName, rootPath, setActiveNav, values)
}

export default function Nav({ isViewOnlyMode = false }) {
  const ref = useRef(null)
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState(null);

  /**
   * nav.itemsが変更された場合はサイドナビを再描画する必要がある
   */
  useEffect(() => {
    // 初期化
    const opens = ref.current.querySelectorAll('[aria-expanded="true"]')

    for (let i = 0; i < opens.length; i++) {
      opens[i].setAttribute('aria-expanded', 'false')
    }

    // カレントを表示
    const current = ref.current.querySelector('.-current')

    if (!current) return

    // 親階層
    current.parentNode.parentNode.parentNode.setAttribute(
      'aria-expanded',
      'true',
    )
    // 祖親階層([data-first-nav-item]の場合のみ)
    const target =
      current.parentNode.parentNode.parentNode.parentNode.parentNode

    if (target.dataset.firstNavItem)
      target.setAttribute('aria-expanded', 'true')
  }, [ref, history])

  useEffect(() => {
    history.listen(location => {
      updateCurrentPath(history, setCurrentPath)
    });
    updateCurrentPath(history, setCurrentPath)
  }, [history])

  /**
   * nav.currentが変更された場合にルートメニューのカレント表示を変更
   */
  useEffect(() => {
    const prevCurrent = ref.current.querySelector('.-current[data-first-nav-item]')

    if (prevCurrent) prevCurrent.classList.remove('-current')

    const current = ref.current.querySelector('.-current')

    if (!current) return

    // 親階層
    current.parentNode.parentNode.parentNode.classList.add('-current')
    // 祖親階層([data-first-nav-item]の場合のみ)
    const target =
      current.parentNode.parentNode.parentNode.parentNode.parentNode

    if (target.dataset.firstNavItem) target.classList.add('-current')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath])

  // const findReferralRouteId = useCallback((routes: Array<{ [key: string]: any }> = appRoutes) => {
  //   let currentRoute = routes.find(r => r.fullPath === currentPath)

  //   if (!!currentRoute) return currentRoute.data?.ref

  //   const childRoutes = routes.reduce((acc: Array<{ [key: string]: any }>, cur) => {
  //     if (!cur?.children?.length) return acc

  //     return [...acc, ...cur.children]
  //   }, [])

  //   return findReferralRouteId(childRoutes)
  // }, [currentPath])

  return (
    <nav

      aria-label='メイン'
      data-header-view-mode={isViewOnlyMode}
    >
      <div className='b-nav__header'>
        <h1 className='b-nav__title'>
          <Link className='b-nav__title-link' to='/'>
            <img src='/assets/images/logo.png' alt='EASY 電子決裁システム' width='153' height='18' />
          </Link>
        </h1>

      </div>

    </nav>
  )
}
