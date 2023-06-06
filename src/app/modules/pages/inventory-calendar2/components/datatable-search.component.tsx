import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { HeaderMiddleProps } from 'common/blocks/datatable/datatable.type';
import { CommonSelect, FormControl } from 'common/form';
import { PeriodCalendar } from 'common/form/calendar/period-calendar.component';

const demoSelect = [
  {
    label: '全て',
    value: 0,
  },
  {
    label: 'Type 1',
    value: 1,
  },
  {
    label: 'Type 2',
    value: 2,
  },
]

export default function DatatableSearch(props: HeaderMiddleProps) {
  const formRef = useRef(null);
  const initialValues = {
    type: 0,
  };

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
                <div className='u-table-filter__option d-flex gap-50'>
                  <FormControl name='type' label='ステータス' key='type'>
                    <CommonSelect options={demoSelect} />
                  </FormControl>

                  <FormControl name='date' label='棚卸日' key='date'>
                    <PeriodCalendar />
                  </FormControl>
                </div>

              </div>

              <div className='u-table-filter__btn'>
                <Button type='submit' variant='outlined'>
                  検索
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}