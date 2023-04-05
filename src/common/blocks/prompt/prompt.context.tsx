/**
 * TODO: rename this file to something like history manager.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import { Location, Action } from 'history';
import { ModalService } from 'app/services/modal';
import { replaceUrl, routeChangeSubject } from 'app/services/route';
import { rootHistory } from 'app/services/route';
import { runBeforeLeaveMiddlewares, resetBeforeLeaveMiddlewares } from './before-leave.helper';
import { promptSbj, IPromptSbj } from './prompt.subject';

const methodMap = {
  POP: 'push', // Want to know why mapping pop as push? Read #154977.
  PUSH: 'push',
  REPLACE: 'replace',
}

export const PromptContext = React.createContext(null)

export const titleSubject = new BehaviorSubject(window.document.title)
export const protectedStatusSubject = new BehaviorSubject<boolean>(false);

export const PromptProvider = ({ children }) => {
  // `isBrowserBackBtnClicked` support prevent navigating when user click browser's back button.
  const isBrowserBackBtnClicked = React.useRef(true);
  const startNavigate = useRef(false);
  const prevUrl = useRef(window.location.pathname + window.location.search);
  const history = useHistory();
  const location = useLocation();
  const prevTitle = useRef<string>();
  /** TODO: need remove unused location from list */
  const locationList = useRef([history.location]);
  const dialogMsg = useRef(text('DAESE543'));

  useEffect(() => {
    // boolean support current obs next native (deprecated)p
    promptSbj.subscribe((data: IPromptSbj | boolean) => {
      if (typeof data === 'boolean') {
        dialogMsg.current = text('DAESE543');
        protectedStatusSubject.next(data);

        return;
      }

      if (!!data.msg) {
        dialogMsg.current = data.msg;
      } else {
        dialogMsg.current = text('DAESE543');
      }

      protectedStatusSubject.next(data.status);
    });

    titleSubject.subscribe((title) => {
      prevTitle.current = title;
    })

    /**
     * Prevent changing url and page title when clicking browser's back
     * button too fast.
     *
     * The reason to use `window.onpopstate` instead of `promptCb` is
     * that react router CAN NOT listen to every route change event.
     */
    window.onpopstate = function () {
      window.document.title = prevTitle.current;
      document.querySelector('title').innerHTML = prevTitle.current;

      replaceUrl(prevUrl.current)
    };
  }, []);

  /**
   * Money-patching history's goBack method for backward compatible
   * with old code and support disable browser's back button.
   */
  useEffect(() => {
    rootHistory.goBack = () => {
      isBrowserBackBtnClicked.current = false;
      const canUsePushForGoingBack = locationList.current.length > 1;

      if (!canUsePushForGoingBack) {
        return rootHistory.go(-1);
      }

      const prevLocation = locationList.current[locationList.current.length - 2];

      rootHistory.push(prevLocation);
    }
  }, [])

  /**  NOTE: API is not consistent, custom params is not public now. */
  const dialogParams = React.useMemo(() => ({
    cancelLabel: text('BTN_CANCEL'),
    submitLabel: text('BTN_DISCARD_INPUT'),
  }), [])

  const navigateWithUserConfirmed = React.useCallback(async (nextLocation: Location, action: Action) => {
    if (!await runBeforeLeaveMiddlewares()) {
      return;
    }

    resetBeforeLeaveMiddlewares();
    startNavigate.current = true;

    const method = methodMap[action || 'PUSH']

    rootHistory[method](nextLocation);

    routeChangeSubject.next();
  }, [])

  const navigateWithoutConfirm = useCallback(async (nextLocation: Location, action: Action) => {
    if (!await runBeforeLeaveMiddlewares()) {
      return;
    }

    resetBeforeLeaveMiddlewares();
    startNavigate.current = true;
    const method = methodMap[action || 'PUSH'];

    if (rootHistory[method]) {
      rootHistory[method](nextLocation)
    }

    routeChangeSubject.next();
  }, [])

  function navigateDone(nextLocation: Location) {
    const isGoBackAction = !isBrowserBackBtnClicked.current;

    // Info: POP event only run if initial screen invoke goBack
    if (isGoBackAction && locationList.current.length !== 1) {
      locationList.current.pop();
    }

    if (!isGoBackAction || (isGoBackAction && locationList.current.length === 1)) {
      locationList.current.push(nextLocation);
    }

    startNavigate.current = false;
    isBrowserBackBtnClicked.current = true;
    prevUrl.current = nextLocation.pathname + nextLocation.search;
    protectedStatusSubject.next(false);
  }

  const promptCb = React.useCallback((nextLocation: Location, action: Action) => {
    if (startNavigate.current) {
      navigateDone(nextLocation);

      return true;
    }

    const isInvalidPopAction = action === 'POP' && isBrowserBackBtnClicked.current;

    if (isInvalidPopAction) {
      replaceUrl(prevUrl.current)
      startNavigate.current = false;

      return false;
    }

    // allow to compatible with old code(dev use react router `Link` as a button :v).
    if (
      location.pathname === nextLocation.pathname &&
      location.search === nextLocation.search
    ) {
      return true;
    }

    // check navigate condition here instead of using `Prompt.when`,
    // this is because protected status is stored with `useRef` instead of `useState`.
    if (!protectedStatusSubject.getValue()) {
      navigateWithoutConfirm(nextLocation, action);

      return false;
    }

    const modal = new ModalService();

    modal.openDialog({
      ...dialogParams,
      submitTheme: 'dangerSolid',
      size: 's',
      children: dialogMsg.current,
      onCancel: () => {
        modal.close();
        isBrowserBackBtnClicked.current = true;
      },
      onSubmit: () => {
        modal.close();
        navigateWithUserConfirmed(nextLocation, action);
      },
    })

    return false
  }, [location, navigateWithUserConfirmed, dialogParams, navigateWithoutConfirm])

  /**
   * Listen for 'beforeunload' to show confirm dialog before user leaving.
   * NOTE: SINGLE RESPONSIBILITY.
   */
  React.useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!protectedStatusSubject.getValue()) return;

      const msg = dialogMsg.current
      e.returnValue = msg // eslint-disable-line

      return msg
    }

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [])

  return (
    <>
      <Prompt message={promptCb} />

      {children}
    </>
  )
}
