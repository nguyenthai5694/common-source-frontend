import React from 'react'
import { Grid } from '@mui/material';
import PageWrapper from 'soumu/blocks/page-wrapper/page-wrapper.component'
import { Input } from 'soumu/form';
import Loading from 'soumu/parts/loading/loading.component'
import InputComponent from './input.component';

interface InputTemplate {
  self: InputComponent,
}

export default function InputTemplate({ self }: InputTemplate) {
  const { state } = self;

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-input'
    >
      {state.isRunning && <Loading />}

      <Grid container spacing={1}>
        <Grid item xl={4}>
          <Input label='Outlined' variant='outlined' size='m' width={'100%'} />
        </Grid>

        <Grid item xl={4}>
          <Input label='Filled' variant='filled' size='m' width={'100%'} />
        </Grid>

        <Grid item xl={4}>
          <Input label='Standard' variant='standard' size='m' width={'100%'} />
        </Grid>

      </Grid>

      <textarea className='npm__react-simple-code-editor__textarea' data-gramm='false' readOnly >
        1233
      </textarea>

    </PageWrapper >
  )
}
