import React, { ReactElement } from 'react';
import { Box, FormLabel } from '@mui/material';
import { useField, useFormikContext, FieldHookConfig, FormikContextType } from 'formik';
import { formItemsOrder } from '../helper/form-item-order.service'
import { ControlStaticType } from './form-control.type'

let timerTimeOut;

export let formikFormControlErrors = 0;

export interface FormControlProps {
  id?: string;
  name: string;
  children?: React.ReactNode;
  fromDatatable?: boolean;
  onBlur?: (e?: any) => void;
  onChange?: (e?: any) => void;
  /**
   * Lable item
   */
  label?: string;
}

export interface FormControlChildProps {
  id?: string;

  name?: string;

  /**
   * on-screen field name
   */
  fieldName?: string;

  value?: any;

  /**
   * Formik on change
   */
  fmOnChange?: (e?: any) => void;

  /**
   * Formik on blur
   */
  fmOnBlur?: (e?: any) => void;

  /**
   * World has many colors, so do `e` variable :V
   */
  onChange?: (e?: any) => void;

  onBlur?: (e?: any) => void;

  /**
   * Default: undefined.
   */
  status?: undefined | 'inValid' | 'valid' | 'warn';

  /**
   * Default: undefined.
   */
  checked?: boolean;

  /**
   * Default: false.
   */
  disabled?: boolean;

  formik?: FormikContextType<any>;

  shouldValidate?: boolean;
}

export function FormControl(props: FormControlProps) {
  const formik = useFormikContext();

  formikFormControlErrors = 0;

  timerTimeOut && clearTimeout(timerTimeOut);

  timerTimeOut = setTimeout(() => {
    requestAnimationFrame(() => {
      if (!formik.isValid) formikFormControlErrors = Object.keys(formik.errors).length;
    })
  })

  const orders = formItemsOrder.get(formik) || [];

  if (!orders.includes(props.name)) {
    orders.push(props.name);
    formItemsOrder.set(formik, orders);
  }

  const child = React.Children.toArray(props.children)[0] as ReactElement;
  const fieldType = (child.type as any).staticType;
  const fieldOptions = {
    name: props.name,
    type: (child.type as any).staticType,
  } as FieldHookConfig<any>;

  const meta = useField(fieldOptions)[1];

  const hasError = meta.error ? 'inValid' : 'valid'

  const status = formik.getFieldMeta(props.name).error
    ? props.fromDatatable
      ? formik.dirty
        ? hasError
        : undefined
      : meta.touched
        ? hasError
        : undefined
    : undefined;

  const handleOnChange = (e) => {
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const fieldProps = formik.getFieldProps(props.name);
  // TODO: refactor
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      let checked = false;
      let fmOnChange = formik.handleChange;

      if (fieldType === ControlStaticType.CHECKBOX) {
        checked = fieldProps.value
          && fieldProps.value.push
          && fieldProps.value.indexOf(child.props.value) !== -1;

        fmOnChange = e => {
          const fieldProps = formik.getFieldProps(props.name);
          let newValues = [...fieldProps.value] as any[];

          if (e.target.checked) {
            newValues.push(e.target.value)
          } else {
            const deleteIndex = newValues.indexOf(e.target.value);

            newValues.splice(deleteIndex, 1);
          }

          formik.setFieldValue(props.name, newValues);
        }
      } else if (fieldType === ControlStaticType.RADIO) {
        // see: https://github.com/formium/formik/issues/1191
        checked = `${child.props.value}` === `${fieldProps.value}`;
      }

      const childProps: FormControlChildProps = {
        id: props.id,
        name: props.name,
        fmOnChange,
        fmOnBlur: formik.handleBlur,
        onChange: handleOnChange,
        onBlur: props.onBlur,
        status,
        checked,
        formik,
        value: meta.value,
        shouldValidate: !!meta.error,
        ...child.props,
      }

      return React.cloneElement(child, childProps);
    }

    return child;
  });

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      {props.label && <FormLabel sx={{ whiteSpace: 'nowrap' }}>{props.label}</FormLabel>}

      {childrenWithProps}
    </Box>
  );
}
