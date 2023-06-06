import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import { columnsConfig, tableConfig } from './data-table.config';
import InventoryCalendar3 from './inventory-calendar3.component';

interface InventoryCalendar3Template {
  self: InventoryCalendar3,
}

export default function InventoryCalendar3Template({ self }: InventoryCalendar3Template) {
  const { state } = self

  // Element Right Title
  const RightPageTitleBlock = (
    <>
      <Button variant='outlined' startIcon={<AddCircleOutlineIcon sx={{ color: '#0F0F0F' }} />}>
        作成
      </Button>
    </>
  )

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-inventory-calendar2'
      rightPageTitleBlock={RightPageTitleBlock}
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
