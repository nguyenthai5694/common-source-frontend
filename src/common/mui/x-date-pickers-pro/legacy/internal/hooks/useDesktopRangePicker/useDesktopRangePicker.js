/* eslint-disable max-len */
import * as React from 'react';
import { executeInTheNextEventLoopTick, getActiveElement, usePicker, PickersPopper } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import { useLicenseVerifier } from 'common/mui/x-license-pro';
import _extends from '@babel/runtime/helpers/esm/extends';
import { useSlotProps } from '@mui/base/utils';
import { getReleaseInfo } from '../../utils/releaseInfo';
import { useEnrichedRangePickerFieldProps } from '../useEnrichedRangePickerFieldProps';
import { useRangePosition } from '../useRangePosition';

var releaseInfo = getReleaseInfo();

export var useDesktopRangePicker = function useDesktopRangePicker(_ref) {
  var _fieldType, _slots$layout;
  var props = _ref.props,
    valueManager = _ref.valueManager,
    validator = _ref.validator;

  useLicenseVerifier('x-date-pickers-pro', releaseInfo);
  var slots = props.slots,
    slotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    format = props.format,
    label = props.label,
    inputRef = props.inputRef,
    readOnly = props.readOnly,
    disabled = props.disabled,
    autoFocus = props.autoFocus,
    disableOpenPicker = props.disableOpenPicker,
    localeText = props.localeText;
  var fieldContainerRef = React.useRef(null);
  var popperRef = React.useRef(null);
  var _useRangePosition = useRangePosition(props),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange,
    singleInputFieldRef = _useRangePosition.singleInputFieldRef;
  var _usePicker = usePicker({
    props,
    valueManager,
    wrapperVariant: 'desktop',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
  }),
    open = _usePicker.open,
    actions = _usePicker.actions,
    layoutProps = _usePicker.layoutProps,
    renderCurrentView = _usePicker.renderCurrentView,
    shouldRestoreFocus = _usePicker.shouldRestoreFocus,
    pickerFieldProps = _usePicker.fieldProps;
  var handleBlur = function handleBlur() {
    executeInTheNextEventLoopTick(function () {
      var _fieldContainerRef$cu, _popperRef$current;

      if ((_fieldContainerRef$cu = fieldContainerRef.current) != null && _fieldContainerRef$cu.contains(getActiveElement(document)) || (_popperRef$current = popperRef.current) != null && _popperRef$current.contains(getActiveElement(document))) {
        return;
      }

      actions.onDismiss();
    });
  };
  var Field = slots.field;
  var fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  var fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: slotProps == null ? void 0 : slotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly,
      disabled,
      className,
      sx,
      format,
      autoFocus: autoFocus && !props.open,
      ref: fieldContainerRef,
    }, fieldType === 'single-input' && {
      inputRef,
    }),
    ownerState: props,
  });
  var enrichedFieldProps = useEnrichedRangePickerFieldProps({
    wrapperVariant: 'desktop',
    fieldType,
    open,
    actions,
    readOnly,
    disableOpenPicker,
    label,
    localeText,
    onBlur: handleBlur,
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
    pickerSlotProps: slotProps,
    pickerSlots: slots,
    fieldProps,
  });
  var slotPropsForLayout = _extends({}, slotProps, {
    toolbar: _extends({}, slotProps == null ? void 0 : slotProps.toolbar, {
      rangePosition,
      onRangePositionChange,
    }),
  });
  var Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  var renderPicker = function renderPicker() {
    return /*#__PURE__*/_jsxs(LocalizationProvider, {
      localeText,
      children: [/*#__PURE__*/_jsx(Field, _extends({}, enrichedFieldProps)), /*#__PURE__*/_jsx(PickersPopper, _extends({
        role: 'tooltip',
        containerRef: popperRef,
        anchorEl: fieldContainerRef.current,
        onBlur: handleBlur,
      }, actions, {
        open,
        slots,
        slotProps,
        shouldRestoreFocus,
        children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps == null ? void 0 : slotProps.layout, {
          slots,
          slotProps: slotPropsForLayout,
          children: renderCurrentView(),
        })),
      }))],
    });
  };

  return {
    renderPicker,
  };
};