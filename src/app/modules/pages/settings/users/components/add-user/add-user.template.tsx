import React from 'react'
import {
  Box, Button, Card, CardActions, CardContent, CardHeader,
  Container, Divider, Grid, Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PageWrapper from 'common/blocks/page-wrapper/page-wrapper.component'
import { CommonCheckbox, CommonRadio, CommonSelect, FormControl, Input, SelectOptions } from 'common/form';
import { PeriodCalendar } from 'common/form/calendar/period-calendar.component';
import { SingleCalendar } from 'common/form/calendar/single-calendar.component';
import Loading from 'common/parts/loading/loading.component'
import SettingUsers from './add-user.component';

interface AddUserTemplate {
  self: SettingUsers,
}

export default function AddUserTemplate({ self }: AddUserTemplate) {
  const { state } = self
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim()
      .required('First Name required')
      .max(100, 'Maxlength 100'),
  })

  const listOptionSex: SelectOptions = [
    {
      label: 'Male',
      value: '0',
    },
    {
      label: 'Female',
      value: '1',
    },
    {
      label: 'Other',
      value: '2',
    },
  ]

  return (
    <PageWrapper
      title={self.pageTitle}
      pages={self.breadcrumb}
      className='t-add-user'
    >
      {state.isRunning && <Loading />}

      <Formik
        enableReinitialize
        innerRef={self.formRef}
        initialValues={{
          firstName: '',
          gender: ['0'],
          gender2: '0',
          rangeDate: ['2023-05-01', '2023-05-30'],
          date: '2023-05-20',
          sex: '0',

        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          // console.log('Submit') 
        }}
        // validateOnMount={true}
        validateOnSubmit={true}
        validateOnChange={true}
      >

        <Form id='my-form'>
          <Container maxWidth='lg'>
            <Stack spacing={3}>

              <div>
                <Grid
                  container
                  spacing={3}
                >

                  <Grid
                    xs={12}
                    md={6}
                    lg={12}
                    item
                  >
                    <Card>
                      <CardHeader
                        subheader='The information can be edited'
                        title='Profile'
                      />

                      <CardContent sx={{ pt: 0 }}>
                        <Box>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='firstName'>
                                <Input label='First name' maxLength={10} />
                              </FormControl>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='lastName'>
                                <Input label='Last name' />
                              </FormControl>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='email'>
                                <Input label='Email Address' />
                              </FormControl>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='phone'>
                                <Input label='Phone Number' type='number' />
                              </FormControl>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='country'>
                                <Input label='Country' />
                              </FormControl>

                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='rangeDate'>
                                <PeriodCalendar
                                  localText={['Start', 'End']}
                                  minDate='2023-05-01'
                                />
                              </FormControl>

                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='sex'>
                                <CommonSelect
                                  options={listOptionSex}
                                  label='Sex'
                                  isBlank
                                />
                              </FormControl>

                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='gender'>
                                <CommonCheckbox
                                  options={listOptionSex}
                                  label='Gender'
                                />
                              </FormControl>

                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='gender2'>
                                <CommonRadio
                                  options={listOptionSex}
                                  label='Gender'
                                />
                              </FormControl>

                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              item
                            >
                              <FormControl name='date'>
                                <SingleCalendar
                                  label='Birth Day'
                                  minDate='2023-05-01'
                                  maxDate='2023-06-30'
                                />
                              </FormControl>

                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>

                      <Divider />

                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant='contained' type='submit' onClick={() => self.handSubmitForm()}>
                          Save details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Form>
      </Formik>
    </PageWrapper >
  )
}
