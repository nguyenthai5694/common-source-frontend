"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMultiInputDateRangeField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _DateField = require("@mui/x-date-pickers/DateField");
var _internals = require("@mui/x-date-pickers/internals");
var _useControlled = _interopRequireDefault(require("@mui/utils/useControlled"));
var _useSingleInputDateRangeField = require("../../../SingleInputDateRangeField/useSingleInputDateRangeField");
var _useDateRangeValidation = require("../validation/useDateRangeValidation");
var _valueManagers = require("../../utils/valueManagers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useMultiInputDateRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = (0, _useSingleInputDateRangeField.useDefaultizedDateRangeFieldProps)(inSharedProps);
  const adapter = (0, _internals.useLocalizationContext)();
  const {
    value: valueProp,
    defaultValue,
    format,
    onChange,
    disabled,
    readOnly,
    selectedSections,
    onSelectedSectionsChange
  } = sharedProps;
  const firstDefaultValue = React.useRef(defaultValue);
  const [value, setValue] = (0, _useControlled.default)({
    name: 'useMultiInputDateRangeField',
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
        validationError: (0, _useDateRangeValidation.validateDateRange)({
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
  }), _useDateRangeValidation.validateDateRange, _valueManagers.rangeValueManager.isSameError, _valueManagers.rangeValueManager.defaultErrorState);
  const startFieldProps = (0, _extends2.default)({
    error: !!validationError[0]
  }, startTextFieldProps, {
    disabled,
    readOnly,
    format,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange,
    selectedSections,
    onSelectedSectionsChange
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
    onChange: handleEndDateChange,
    selectedSections,
    onSelectedSectionsChange
  });
  const startDateResponse = (0, _DateField.unstable_useDateField)({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = (0, _DateField.unstable_useDateField)({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};
exports.useMultiInputDateRangeField = useMultiInputDateRangeField;