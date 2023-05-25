"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDateRangeViewCalendar = void 0;
var React = _interopRequireWildcard(require("react"));
var _DateRangeCalendar = require("../DateRangeCalendar");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * We don't pass all the props down to `DateRangeCalendar`,
 * because otherwise some unwanted props would be passed to the HTML element.
 */
const renderDateRangeViewCalendar = ({
  value,
  defaultValue,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  reduceAnimations,
  onMonthChange,
  defaultCalendarMonth,
  rangePosition,
  defaultRangePosition,
  onRangePositionChange,
  calendars,
  components,
  componentsProps,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  disableAutoMonthSwitching,
  sx,
  autoFocus,
  fixedWeekNumber,
  disableDragEditing,
  displayWeekNumber
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateRangeCalendar.DateRangeCalendar, {
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
  className: className,
  classes: classes,
  disableFuture: disableFuture,
  disablePast: disablePast,
  minDate: minDate,
  maxDate: maxDate,
  shouldDisableDate: shouldDisableDate,
  reduceAnimations: reduceAnimations,
  onMonthChange: onMonthChange,
  defaultCalendarMonth: defaultCalendarMonth,
  rangePosition: rangePosition,
  defaultRangePosition: defaultRangePosition,
  onRangePositionChange: onRangePositionChange,
  calendars: calendars,
  components: components,
  componentsProps: componentsProps,
  slots: slots,
  slotProps: slotProps,
  loading: loading,
  renderLoading: renderLoading,
  disableHighlightToday: disableHighlightToday,
  readOnly: readOnly,
  disabled: disabled,
  showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
  dayOfWeekFormatter: dayOfWeekFormatter,
  disableAutoMonthSwitching: disableAutoMonthSwitching,
  sx: sx,
  autoFocus: autoFocus,
  fixedWeekNumber: fixedWeekNumber,
  disableDragEditing: disableDragEditing,
  displayWeekNumber: displayWeekNumber
});
exports.renderDateRangeViewCalendar = renderDateRangeViewCalendar;