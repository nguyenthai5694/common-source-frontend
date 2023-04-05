import React from 'react'
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import Dashboard from './dashboard.component';

interface DashboardTemplate {
  self: Dashboard,
}

// eslint-disable-next-line complexity
export default function DashboardTemplate({ self }: DashboardTemplate) {
  const { state } = self;

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-detail'
    >
      {state.isRunning && <Loading />}

      <div className='u-footer-fixed-menu -center'>
        1111
      </div>
    </PageWrapper>
  )
}
