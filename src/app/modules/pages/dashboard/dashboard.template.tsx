import React from 'react'
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { subDays, subHours } from 'date-fns';
import DataTable from 'common/blocks/datatable-ui/datatable.component';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import Loading from 'common/parts/loading/loading.component'
import { OverviewBudget } from './components/overview-budget';
import { OverviewLatestProducts } from './components/overview-latest-products';
import { OverviewSales } from './components/overview-sales';
import { OverviewTasksProgress } from './components/overview-tasks-progress';
import { OverviewTotalCustomers } from './components/overview-total-customers';
import { OverviewTotalProfit } from './components/overview-total-profit';
import { OverviewTraffic } from './components/overview-traffic';
import Dashboard from './dashboard.component';
import { columnsConfig, tableConfig } from './data-table.config';

interface DashboardTemplate {
  self: Dashboard,
}

export default function DashboardTemplate({ self }: DashboardTemplate) {
  const { state } = self

  const now = new Date();

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-setting-menu'
    >
      {state.isRunning && <Loading />}

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value='$24k'
            />
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value='1.6k'
            />
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value='$15k'
            />
          </Grid>

          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime(),
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime(),
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime(),
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={8}
          >
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
          </Grid>
        </Grid>

      </Box>

    </PageWrapper >
  )
}
