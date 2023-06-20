import React, { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { HeaderMiddleProps } from 'common/blocks/datatable-ui/datatable.type';
import { FormControl, Input } from 'common/form';

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
                    <Input label='Name' />
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