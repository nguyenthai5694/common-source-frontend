import React from 'react'
// import { Table } from 'common/blocks/datatable/table';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import { columnGroupingModel, columnsConfig, tableConfig } from './data-table.config';
import SettingUsers from './setting-users.component';

interface SettingUsersTemplate {
  self: SettingUsers,
}

export default function SettingMenuTemplate({ self }: SettingUsersTemplate) {
  const { state } = self

  // Element Right Title
  const RightPageTitleBlock = (
    <>
      <Button variant='contained' endIcon={<AddIcon />} onClick={self.handAddUser}>
        Add
      </Button>
    </>
  )

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-setting-menu'
      rightPageTitleBlock={RightPageTitleBlock}
    >
      {state.isRunning && <Loading />}

      < DataTable
        columnsConfig={columnsConfig}
        dataItems={state.data}
        tableConfig={tableConfig}
        columnGroupingModel={columnGroupingModel}
        onSearch={self.onSearch}
        onItemSelect={self.onSelectItem}
        onActionClick={self.onActionClick}
        queries={state.queries}
        totalItem={state.totalItem}
      />

    </PageWrapper >
  )
}
