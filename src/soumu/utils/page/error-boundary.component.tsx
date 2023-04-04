import React from 'react';
import PageError, { PageErrorName, PageErrorType } from 'soumu/blocks/page-error/page-error.component';
import { getActiveCookie } from 'app/services/active-cookie/active-cookie.helper';
// import { handleLogout } from 'app/services/auth';

export class ErrorBoundary extends React.Component<any, { error: null, errorInfo: null }> {
  private isChunkLoadError = false;

  private isOffline = false;

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    if (error?.name === PageErrorName.ChunkLoadError) {
      this.isChunkLoadError = true;

      if (!navigator.onLine) {
        this.isOffline = true;
      } else {
        // Set flag to force logout (reset session, local storage)
        sessionStorage.setItem('force-logout', '1');
        // refresh the page to get chunk file latest
        window.location.reload();
        // this.isOffline = false;
        // handleLogout(null, null, true);
      }

      return
    }

    const urlParams = new URLSearchParams(window.location.search);
    const activeCookie = getActiveCookie();
    const isViewOnlyMode = urlParams.get('viewMode') === 'true';
    const unregisterTabOpen = () => {
      if (!isViewOnlyMode) document.cookie = `active_${activeCookie}=; path=/; expires=Sat Jan 01 00:00:00 2000;`;
    }

    this.setState({
      error,
      errorInfo,
    })

    window.addEventListener('beforeunload', unregisterTabOpen);
  }

  render() {
    if (this.isChunkLoadError && !this.isOffline) {
      return
    }

    if (this.isChunkLoadError && this.isOffline) {
      return <PageError isOffline={this.isOffline} error={PageErrorType.APP_LOADFAILED} />
    }

    if (this.state.errorInfo) {
      return <PageError isOffline={this.isOffline} error={PageErrorType.PAGE_CRASHED} />
    }

    return this.props.children;
  }
}
