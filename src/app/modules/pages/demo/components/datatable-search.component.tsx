import React, { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { HeaderMiddleProps } from 'common/blocks/datatable/datatable.type';
import { FormControl, Input, CommonSelect } from 'common/form';
import { PeriodCalendar } from 'common/form/calendar/period-calendar.component';
import { SingleCalendar } from 'common/form/calendar/single-calendar.component';

export default function DatatableSearch(props: HeaderMiddleProps) {
  const formRef = useRef(null);
  const initialValues = {};

  // props.setFilter(initialValues);

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={(values) => {
        props.onSearch(values);
      }}
    >
      {() => (
        <Form>
          <div className='u-table-filter h-mt-16 h-mb-16'>
            <div className='u-table-filter__group'>
              <div className='u-table-filter__basic '>
                <div className='u-table-filter__option d-flex gap-15'>
                  <FormControl name='keyword'>
                    <Input label='Name' isSearch />
                  </FormControl>

                  <FormControl name='choose'>
                    <CommonSelect options={[]} />
                  </FormControl>

                  <FormControl name='date'>
                    <SingleCalendar />
                  </FormControl>

                  <FormControl name='p-date'>
                    <PeriodCalendar />
                  </FormControl>

                </div>

              </div>

              <div className='u-table-filter__btn'>
                <Button type='submit' variant='contained' endIcon={<SearchIcon />}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}