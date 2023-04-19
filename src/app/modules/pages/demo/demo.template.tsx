import React from 'react'
// import { Table } from 'common/blocks/datatable/table';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import DataTable from 'common/blocks/table-ui/table';
import Loading from 'common/parts/loading/loading.component'
import { columnsConfig, tableConfig } from './data-table.config';
import Demo from './demo.component';

interface DemoTemplate {
  self: Demo,
}

export default function DemoTemplate({ self }: DemoTemplate) {
  const { state } = self;

  const createData = (name, calories, fat, carbs, protein) => {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-demo'
    >
      {state.isRunning && <Loading />}

      <DataTable
        columnsConfig={columnsConfig}
        dataItems={rows}
        tableConfig={tableConfig}
        onSearch={self.onSearch}
        dataTableQueries={state.queries}
        totalItem={0}
      />

    </PageWrapper >
  )
}
