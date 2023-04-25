import React from 'react'
// import { Table } from 'common/blocks/datatable/table';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import { columnsConfig, tableConfig } from './data-table.config';
import SettingMenu from './setting-menu.component';

interface SettingMenuTemplate {
  self: SettingMenu,
}

export default function SettingMenuTemplate({ self }: SettingMenuTemplate) {
  const { state } = self

  // Element Right Title
  const RightPageTitleBlock = (
    <>
      <Button variant='contained' endIcon={<AddIcon />} onClick={self.handAddMenu}>
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
        onSearch={self.onSearch}
        onItemSelect={self.onSelectItem}
        // onActionClick={self.onActionClick}
        // dataTableQueries={state.queries}
        totalItem={state.totalItem}
        selectItemType='checkbox'
      />

    </PageWrapper >
  )
}
