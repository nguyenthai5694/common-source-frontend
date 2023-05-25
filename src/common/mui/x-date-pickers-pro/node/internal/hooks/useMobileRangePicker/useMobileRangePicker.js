/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMobileRangePicker = void 0;
var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));
var _useId = _interopRequireDefault(require('@mui/utils/useId'));
var React = _interopRequireWildcard(require('react'));
var _utils = require('@mui/base/utils');
var _xLicensePro = require('common/mui/x-license-pro');
var _LocalizationProvider = require('@mui/x-date-pickers/LocalizationProvider');
var _PickersLayout = require('@mui/x-date-pickers/PickersLayout');
var _internals = require('@mui/x-date-pickers/internals');
var _releaseInfo = require('../../utils/releaseInfo');
var _useEnrichedRangePickerFieldProps = require('../useEnrichedRangePickerFieldProps');
var _useRangePosition = require('../useRangePosition');
var _jsxRuntime = require('react/jsx-runtime');

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;

  var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap();

  return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) { return obj; }

  if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') { return { default: obj }; }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) { return cache.get(obj); }

  var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; }
    }
  } newObj.default = obj;

  if (cache) { cache.set(obj, newObj); }

  return newObj;
}
const releaseInfo = (0, _releaseInfo.getReleaseInfo)();
const useMobileRangePicker = ({
  props,
  valueManager,
  validator,
}) => {
  (0, _xLicensePro.useLicenseVerifier)('x-date-pickers-pro', releaseInfo);
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
  } = (0, _useRangePosition.useRangePosition)(props);
  const labelId = (0, _useId.default)();
  const contextLocaleText = (0, _internals.useLocaleText)();
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps,
  } = (0, _internals.usePicker)({
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
  const fieldProps = (0, _utils.useSlotProps)({
    elementType: Field,
    externalSlotProps: innerSlotProps?.field,
    additionalProps: (0, _extends2.default)({}, pickerFieldProps, {
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
  const enrichedFieldProps = (0, _useEnrichedRangePickerFieldProps.useEnrichedRangePickerFieldProps)({
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
  const slotPropsForLayout = (0, _extends2.default)({}, innerSlotProps, {
    toolbar: (0, _extends2.default)({}, innerSlotProps?.toolbar, {
      titleId: labelId,
      rangePosition,
      onRangePositionChange,
    }),
  });
  const Layout = slots?.layout ?? _PickersLayout.PickersLayout;
  const finalLocaleText = (0, _extends2.default)({}, contextLocaleText, localeText);
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

  const slotProps = (0, _extends2.default)({}, innerSlotProps, {
    mobilePaper: (0, _extends2.default)({
      'aria-labelledby': labelledById,
    }, innerSlotProps?.mobilePaper),
  });
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LocalizationProvider.LocalizationProvider, {
    localeText,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Field, (0, _extends2.default)({}, enrichedFieldProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersModalDialog, (0, _extends2.default)({}, actions, {
      open,
      slots,
      slotProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Layout, (0, _extends2.default)({}, layoutProps, slotProps?.layout, {
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

exports.useMobileRangePicker = useMobileRangePicker;