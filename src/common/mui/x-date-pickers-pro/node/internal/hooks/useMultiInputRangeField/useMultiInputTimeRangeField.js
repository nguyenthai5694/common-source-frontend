"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiInputTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _TimeField = require("@mui/x-date-pickers/TimeField");
var _internals = require("@mui/x-date-pickers/internals");
var _useControlled = _interopRequireDefault(require("@mui/utils/useControlled"));
var _useTimeRangeValidation = require("../validation/useTimeRangeValidation");
var _valueManagers = require("../../utils/valueManagers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useDefaultizedTimeRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat
  });
};
exports.useDefaultizedTimeRangeFieldProps = useDefaultizedTimeRangeFieldProps;
const useMultiInputTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedTimeRangeFieldProps(inSharedProps);
  const adapter = (0, _internals.useLocalizationContext)();
  const {
    value: valueProp,
    defaultValue,
    format,
    onChange,
    disabled,
    readOnly
  } = sharedProps;
  const firstDefaultValue = React.useRef(defaultValue);
  const [value, setValue] = (0, _useControlled.default)({
    name: 'useMultiInputTimeRangeField',
    state: 'value',
    controlled: valueProp,
    default: firstDefaultValue.current ?? _valueManagers.rangeValueManager.emptyValue
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      setValue(newDateRange);
      const context = (0, _extends2.default)({}, rawContext, {
        validationError: (0, _useTimeRangeValidation.validateTimeRange)({
          adapter,
          value: newDateRange,
          props: sharedProps
        })
      });
      onChange?.(newDateRange, context);
    };
  };
  const handleStartDateChange = (0, _useEventCallback.default)(buildChangeHandler(0));
  const handleEndDateChange = (0, _useEventCallback.default)(buildChangeHandler(1));
  const validationError = (0, _internals.useValidation)((0, _extends2.default)({}, sharedProps, {
    value
  }), _useTimeRangeValidation.validateTimeRange, _valueManagers.rangeValueManager.isSameError, _valueManagers.rangeValueManager.defaultErrorState);
  const startFieldProps = (0, _extends2.default)({
    error: !!validationError[0]
  }, startTextFieldProps, {
    format,
    disabled,
    readOnly,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange
  });
  const endFieldProps = (0, _extends2.default)({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format,
    disabled,
    readOnly,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange
  });
  const startDateResponse = (0, _TimeField.unstable_useTimeField)({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = (0, _TimeField.unstable_useTimeField)({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};
exports.useMultiInputTimeRangeField = useMultiInputTimeRangeField;