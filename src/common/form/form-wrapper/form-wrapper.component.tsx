import React, { MutableRefObject, useEffect, useRef } from 'react'
import { Formik, FormikConfig, FormikHelpers } from 'formik'
import { formItemsOrder } from '../helper/form-item-order.service'

type Overwrite<T1, T2> = {
  [P in Exclude<keyof T1, keyof T2>]?: T1[P];
} & T2;

type FormWrapperProps = Overwrite<FormikConfig<any>, {
  onSubmit?: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
  initialValues?: any;
}>;

export function FormWrapper(props: FormWrapperProps) {
  const formikRef = useRef();
  const newProps = {
    ...props,
    initialValues: props.initialValues || {},
    onSubmit: props.onSubmit || null,
    innerRef: props.innerRef || formikRef,
  };

  useEffect(() => () => {
    // remove unused stuff from memory.
    formItemsOrder.delete((newProps.innerRef as MutableRefObject<any>)?.current);
    // eslint-disable-next-line
  }, [])

  return (
    <Formik {...newProps}>
      {/* <Form>{props.children}</Form> */}
    </Formik>
  )
}
