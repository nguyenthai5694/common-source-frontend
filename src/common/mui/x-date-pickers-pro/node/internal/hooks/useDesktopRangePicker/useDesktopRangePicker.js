/* eslint-disable max-len */
/* eslint-disable import/order */

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useDesktopRangePicker = void 0;
var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));
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
const useDesktopRangePicker = ({
  props,
  valueManager,
  validator,
}) => {
  (0, _xLicensePro.useLicenseVerifier)('x-date-pickers-pro', releaseInfo);
  const {
    slots,
    slotProps,
    className,
    sx,
    format,
    label,
    inputRef,
    readOnly,
    disabled,
    autoFocus,
    disableOpenPicker,
    localeText,
  } = props;
  const fieldContainerRef = React.useRef(null);
  const popperRef = React.useRef(null);
  const {
    rangePosition,
    onRangePositionChange,
    singleInputFieldRef,
  } = (0, _useRangePosition.useRangePosition)(props);
  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    shouldRestoreFocus,
    fieldProps: pickerFieldProps,
  } = (0, _internals.usePicker)({
    props,
    valueManager,
    wrapperVariant: 'desktop',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
  });
  const handleBlur = () => {
    (0, _internals.executeInTheNextEventLoopTick)(() => {
      if (fieldContainerRef.current?.contains((0, _internals.getActiveElement)(document)) || popperRef.current?.contains((0, _internals.getActiveElement)(document))) {
        return;
      }

      actions.onDismiss();
    });
  };
  const Field = slots.field;
  const fieldType = Field.fieldType ?? 'multi-input';
  const fieldProps = (0, _utils.useSlotProps)({
    elementType: Field,
    externalSlotProps: slotProps?.field,
    additionalProps: (0, _extends2.default)({}, pickerFieldProps, {
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
  const enrichedFieldProps = (0, _useEnrichedRangePickerFieldProps.useEnrichedRangePickerFieldProps)({
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
  const slotPropsForLayout = (0, _extends2.default)({}, slotProps, {
    toolbar: (0, _extends2.default)({}, slotProps?.toolbar, {
      rangePosition,
      onRangePositionChange,
    }),
  });
  const Layout = slots?.layout ?? _PickersLayout.PickersLayout;
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LocalizationProvider.LocalizationProvider, {
    localeText,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Field, (0, _extends2.default)({}, enrichedFieldProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersPopper, (0, _extends2.default)({
      role: 'tooltip',
      containerRef: popperRef,
      anchorEl: fieldContainerRef.current,
      onBlur: handleBlur,
    }, actions, {
      open,
      slots,
      slotProps,
      shouldRestoreFocus,
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

exports.useDesktopRangePicker = useDesktopRangePicker;