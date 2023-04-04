import React from 'react';
// eslint-disable-next-line import/order
import Login from './login.component'
import './login.style.scss';
// eslint-disable-next-line import/order
import {
  Box, Button, FormHelperText, Grid, Link, Stack,
  Tab, Tabs, TextField, Typography, useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FormControl, Input } from 'soumu/form';

interface LoginTemplateProps {
  self: Login;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ self }: LoginTemplateProps) => {
  const { state } = self
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <>
      <Formik
        initialValues={self.initialValues}
        onSubmit={self.onSubmit}
        innerRef={self.formRef}
      >
        <Form>
          <Box
            component='main'
            sx={{
              display: 'flex',
              flex: '1 1 auto',
            }}
          >
            <Grid
              container
              lg={12}
              xl={12}
              sx={{ flex: '1 1 auto' }}
            >
              <Grid
                xs={12}
                lg={6}
                sx={{
                  backgroundColor: 'background.paper',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <Box
                  component='header'
                  sx={{
                    left: 0,
                    p: 3,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                  }}
                >
                  <Link

                    href='/'
                    sx={{
                      display: 'inline-flex',
                      height: 32,
                      width: 32,
                    }}
                  >
                    <svg
                      fill='none'
                      height='100%'
                      viewBox='0 0 24 24'
                      width='100%'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        opacity={0.16}
                        // eslint-disable-next-line max-len
                        d='M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z'
                        fill={fillColor}
                      />

                      <path
                        // eslint-disable-next-line max-len
                        d='M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z'
                        fill={fillColor}
                      />
                    </svg>
                  </Link>
                </Box>

                <Box
                  sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 550,
                      px: 3,
                      py: '100px',
                      width: '100%',
                    }}
                  >
                    <div>
                      <Stack
                        spacing={1}
                        sx={{ mb: 3 }}
                      >
                        <Typography variant='h4'>
                          Login
                        </Typography>

                        <Typography
                          color='text.secondary'
                          variant='body2'
                        >
                          Don&apos;t have an account?
                          &nbsp;
                          {/* <Link
                  component={NextLink}
                  href='/auth/register'
                  underline='hover'
                  variant='subtitle2'
                > */}
                          Register
                          {/* </Link> */}
                        </Typography>
                      </Stack>

                      <Tabs
                        onChange={() => { }}
                        sx={{ mb: 3 }}
                        value={state.tab}
                      >
                        <Tab
                          label='Email'
                          value='email'
                        />

                        <Tab
                          label='Phone Number'
                          value='phoneNumber'
                        />
                      </Tabs>

                      {state.tab === 'email' && <>
                        <Stack spacing={3}>
                          <FormControl name='email'>
                            <Input
                              label='Email'
                              type='email'
                            />

                          </FormControl>

                          <FormControl name='password'>
                            <TextField
                              fullWidth
                              label='Password'
                              type='password'
                            />
                          </FormControl>
                        </Stack>

                        <FormHelperText sx={{ mt: 1 }}>
                          Optionally you can skip.
                        </FormHelperText>

                        <Button
                          fullWidth
                          size='large'
                          sx={{ mt: 3 }}
                          type='submit'
                          variant='contained'
                        >
                          Continue
                        </Button>

                        <Button
                          fullWidth
                          size='large'
                          sx={{ mt: 3 }}
                        >
                          Skip authentication
                        </Button>

                        {/* <Alert
              color='primary'
              severity='info'
              sx={{ mt: 3 }}
            >
              <div>
                You can use <b>demo@devias.io</b> and password <b>Password123!</b>
              </div>
            </Alert> */}

                        {/* {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant='h6'
                >
                  Not available in the demo
                </Typography>

                <Typography color='text.secondary'>
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )} */}
                      </>}

                      {state.tab === 'phoneNumber' && (
                        <div>
                          <Typography
                            sx={{ mb: 1 }}
                            variant='h6'
                          >
                            Not available in the demo
                          </Typography>

                          <Typography color='text.secondary'>
                            To prevent unnecessary costs we disabled this feature in the demo.
                          </Typography>
                        </div>
                      )}
                    </div>
                  </Box>
                </Box>
              </Grid>

              <Grid
                xs={12}
                lg={6}
                sx={{
                  alignItems: 'center',
                  background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  '& img': {
                    maxWidth: '100%',
                  },
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography
                    align='center'
                    color='inherit'
                    sx={{
                      fontSize: '24px',
                      lineHeight: '32px',
                      mb: 1,
                    }}
                    variant='h1'
                  >
                    Welcome to{' '}

                    <Box
                      component='a'
                      sx={{ color: '#15B79E' }}
                      target='_blank'
                    >
                      THACO-Bluebolt
                    </Box>
                  </Typography>

                  <Typography
                    align='center'
                    sx={{ mb: 3 }}
                    variant='subtitle1'
                  >
                    A professional kit that comes with ready-to-use MUI components.
                  </Typography>

                  <img
                    alt=''
                    src='/assets/images/auth-illustration.svg'
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
    </>
  )
}
