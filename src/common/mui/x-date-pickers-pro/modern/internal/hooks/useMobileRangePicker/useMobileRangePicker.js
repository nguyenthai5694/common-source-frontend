/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import * as React from 'react';
import { usePicker, PickersModalDialog, useLocaleText } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import { useLicenseVerifier } from 'common/mui/x-license-pro';
import _extends from '@babel/runtime/helpers/esm/extends';
import { useSlotProps } from '@mui/base/utils';
import useId from '@mui/utils/useId';
import { getReleaseInfo } from '../../utils/releaseInfo';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';

const releaseInfo = getReleaseInfo();

export const useMobileRangePicker = ({
  props,
  valueManager,
  validator,
}) => {
  useLicenseVerifier('x-date-pickers-pro', releaseInfo);
  const {
    slots,
    slotProps: innerSlotProps,
    className,
    sx,
    format,
    label,
    inputRef,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
  } = props;
  const {
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
  } = useRangePosition(props);
  const labelId = useId();
  const contextLocaleText = useLocaleText();
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps,
  } = usePicker({
    props,
    valueManager,
    wrapperVariant: 'mobile',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
  });
  const Field = slots.field;
  const fieldType = Field.fieldType ?? 'multi-input';
  const fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: innerSlotProps?.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly: readOnly ?? true,
      disabled,
      className,
      sx,
      format,
    }, fieldType === 'single-input' && {
      inputRef,
    }),
    ownerState: props,
  });
  const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
  const enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'mobile',
    fieldType,
    open,
    actions,
    readOnly,
    labelId,
    disableOpenPicker,
    label,
    localeText,
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
    pickerSlots: slots,
    pickerSlotProps: innerSlotProps,
    fieldProps,
  });
  const slotPropsForLayout = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps?.toolbar, {
      titleId: labelId,
      rangePosition,
      onRangePositionChange,
    }),
  });
  const Layout = slots?.layout ?? PickersLayout;
  const finalLocaleText = _extends({}, contextLocaleText, localeText);
  let labelledById = labelId;

  if (isToolbarHidden) {
    const labels = [];

    if (fieldType === 'multi-input') {
      if (finalLocaleText.start) {
        labels.push(`${labelId}-start-label`);
      }

      if (finalLocaleText.end) {
        labels.push(`${labelId}-end-label`);
      }
    } else if (label != null) {
      labels.push(`${labelId}-label`);
    }

    labelledById = labels.length > 0 ? labels.join(' ') : undefined;
  }

  const slotProps = _extends({}, innerSlotProps, {
    mobilePaper: _extends({
      'aria-labelledby': labelledById,
    }, innerSlotProps?.mobilePaper),
  });
  const renderPicker = () => /*#__PURE__*/_jsxs(LocalizationProvider, {
    localeText,
    children: [/*#__PURE__*/_jsx(Field, _extends({}, enrichedFieldProps)), /*#__PURE__*/_jsx(PickersModalDialog, _extends({}, actions, {
      open,
      slots,
      slotProps,
      children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps?.layout, {
        slots,
        slotProps: slotPropsForLayout,
        children: renderCurrentView(),
      })),
    }))],
  });

  return {
    renderPicker,
  };
};