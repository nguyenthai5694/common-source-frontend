import React, { useEffect, useMemo, useState, useRef } from 'react'
import { styled } from '@mui/material/styles';
// import { useLocation } from 'react-router-dom';
import { Subscription } from 'rxjs';
// import queryString from 'query-string'
// import Nav from 'soumu/blocks/nav/nav.component'
// import SideNav from 'soumu/blocks/nav/side-nav';
// import TopNav from 'soumu/blocks/nav/top-nav';
import SideNav from 'soumu/blocks/nav/side-nav';
import TopNav from 'soumu/blocks/nav/top-nav';
import PageError, { PageErrorType } from 'soumu/blocks/page-error/page-error.component';
import Loading from 'soumu/parts/loading/loading.component'
// import { MenuListItem } from 'app/api/common/get-menu.api'
import { handleLogout } from 'app/services/auth';
import { getListMasterData } from 'app/services/master-data'
import { isIE } from 'app/services/navigator'
import { handleTabShiftTabIntoView } from './handle-tab-view'

export default function NormalLayout(props) {
  // TODO: fetching required master data should be moved to better place.
  const [isInitialzing, setIsInitializing] = useState('running');
  // const [isViewOnlyMode, setViewOnlyMode] = useState(false);
  // const [menuList, setMenuList] = useState([] as MenuListItem[]);
  const [openNav, setOpenNav] = useState(true);

  const hasListenerHandleShiftTab = useRef<boolean>(false);

  // const location = useLocation();
  const subscription = useMemo(() => new Subscription(), []);

  const handleUnlockData = () => {
  }

  useEffect(() => {
    // Call action unlock data
    handleUnlockData();

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // End handle unlock data when refresh browser

  useEffect(() => {
    // Force logout to reset cache / clear storage
    if (sessionStorage.getItem('force-logout')) {
      sessionStorage.removeItem('force-logout');
      handleLogout(null, null, true);
    }
  }, [])

  useEffect(() => {
    if (isIE) {
      const body = document?.body;

      body && body.classList.add('-IE');
    }
  }, [])

  useEffect(() => {
    getListMasterData(
      //   [
      //   'listGengo',
      //   'userInfor',
      //   'patternInfo',
      //   'pageSizeOptions',
      //   'kankyoSetList',
      //   'menuList',
      //   'displayItem',
      // ]
      [] as any,
    )
      .subscribe(
        (res: any) => {
          setIsInitializing('ok');
        },
        () => setIsInitializing('fail'),
      );
    setIsInitializing('ok');
  }, []);

  useEffect(() => {
    // let query = location.search;
    // const values = queryString.parse(query);

    // if (values['viewMode'] && values['viewMode'] === 'true') setViewOnlyMode(true);
  }, []);

  useEffect(() => {
    const appMainEl = document.querySelector('.app__main');

    if (appMainEl && !hasListenerHandleShiftTab.current) {
      appMainEl.addEventListener('keyup', handleTabShiftTabIntoView);
      hasListenerHandleShiftTab.current = true;
    }

    return () => {
      appMainEl && appMainEl.removeEventListener('keyup', handleTabShiftTabIntoView);
      hasListenerHandleShiftTab.current = false;
    }
  }, [isInitialzing])

  if (isInitialzing === 'running') {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Loading />;
  }

  if (isInitialzing === 'fail') {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <PageError error={PageErrorType.APP_LOADFAILED} />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const handlePathnameChange = useCallback(
  //   () => {
  //     if (openNav) {
  //       setOpenNav(false);
  //     }
  //   },
  //   [openNav],
  // );
  const SIDE_NAV_WIDTH = 280;
  const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: SIDE_NAV_WIDTH,
    },
  }));

  const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  });

  return (
    <div className='app'>
      <TopNav />

      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />

      <LayoutRoot>
        <LayoutContainer>
          {props?.children}
        </LayoutContainer>
      </LayoutRoot>
    </div>
  )
};
