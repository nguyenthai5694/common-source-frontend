import React from 'react'
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import { columnsConfig, tableConfig } from './data-table.config';
import InventoryCalendar from './inventory-calendar.component';

interface InventoryCalendarTemplate {
  self: InventoryCalendar,
}

export default function InventoryCalendarTemplate({ self }: InventoryCalendarTemplate) {
  const { state } = self

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-inventory-calendar'
    >
      {state.isRunning && <Loading />}

      < DataTable
        columnsConfig={columnsConfig}
        dataItems={state.data}
        tableConfig={tableConfig}
        onSearch={self.onSearch}
        onItemSelect={self.onSelectItem}
        onActionClick={self.onActionClick}
        queries={state.queries}
        totalItem={state.totalItem}
      />

    </PageWrapper >
  )
}
