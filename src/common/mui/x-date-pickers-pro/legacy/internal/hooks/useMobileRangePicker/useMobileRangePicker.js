/* eslint-disable max-len */
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

var releaseInfo = getReleaseInfo();

export var useMobileRangePicker = function useMobileRangePicker(_ref) {
  var _fieldType, _innerSlotProps$toolb, _innerSlotProps$toolb2, _slots$layout;
  var props = _ref.props,
    valueManager = _ref.valueManager,
    validator = _ref.validator;

  useLicenseVerifier('x-date-pickers-pro', releaseInfo);
  var slots = props.slots,
    innerSlotProps = props.slotProps,
    className = props.className,
    sx = props.sx,
    format = props.format,
    label = props.label,
    inputRef = props.inputRef,
    readOnly = props.readOnly,
    disabled = props.disabled,
    disableOpenPicker = props.disableOpenPicker,
    localeText = props.localeText;
  var _useRangePosition = useRangePosition(props),
    rangePosition = _useRangePosition.rangePosition,
    onRangePositionChange = _useRangePosition.onRangePositionChange,
    singleInputFieldRef = _useRangePosition.singleInputFieldRef;
  var labelId = useId();
  var contextLocaleText = useLocaleText();
  var _usePicker = usePicker({
    props,
    valueManager,
    wrapperVariant: 'mobile',
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
    pickerFieldProps = _usePicker.fieldProps;
  var Field = slots.field;
  var fieldType = (_fieldType = Field.fieldType) != null ? _fieldType : 'multi-input';
  var fieldProps = useSlotProps({
    elementType: Field,
    externalSlotProps: innerSlotProps == null ? void 0 : innerSlotProps.field,
    additionalProps: _extends({}, pickerFieldProps, {
      readOnly: readOnly != null ? readOnly : true,
      disabled,
      className,
      sx,
      format,
    }, fieldType === 'single-input' && {
      inputRef,
    }),
    ownerState: props,
  });
  var isToolbarHidden = (_innerSlotProps$toolb = innerSlotProps == null ? void 0 : (_innerSlotProps$toolb2 = innerSlotProps.toolbar) == null ? void 0 : _innerSlotProps$toolb2.hidden) != null ? _innerSlotProps$toolb : false;
  var enrichedFieldProps = useEnrichedRangePickerFieldProps({
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
  var slotPropsForLayout = _extends({}, innerSlotProps, {
    toolbar: _extends({}, innerSlotProps == null ? void 0 : innerSlotProps.toolbar, {
      titleId: labelId,
      rangePosition,
      onRangePositionChange,
    }),
  });
  var Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickersLayout;
  var finalLocaleText = _extends({}, contextLocaleText, localeText);
  var labelledById = labelId;

  if (isToolbarHidden) {
    var labels = [];

    if (fieldType === 'multi-input') {
      if (finalLocaleText.start) {
        labels.push(''.concat(labelId, '-start-label'));
      }

      if (finalLocaleText.end) {
        labels.push(''.concat(labelId, '-end-label'));
      }
    } else if (label != null) {
      labels.push(''.concat(labelId, '-label'));
    }

    labelledById = labels.length > 0 ? labels.join(' ') : undefined;
  }

  var slotProps = _extends({}, innerSlotProps, {
    mobilePaper: _extends({
      'aria-labelledby': labelledById,
    }, innerSlotProps == null ? void 0 : innerSlotProps.mobilePaper),
  });
  var renderPicker = function renderPicker() {
    return /*#__PURE__*/_jsxs(LocalizationProvider, {
      localeText,
      children: [/*#__PURE__*/_jsx(Field, _extends({}, enrichedFieldProps)), /*#__PURE__*/_jsx(PickersModalDialog, _extends({}, actions, {
        open,
        slots,
        slotProps,
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