"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeValueManager = exports.rangeFieldValueManager = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _dateFieldsUtils = require("./date-fields-utils");
const rangeValueManager = {
  emptyValue: [null, null],
  getTodayValue: utils => [utils.date(), utils.date()],
  cleanValue: (utils, value) => value.map(date => (0, _internals.replaceInvalidDateByNull)(utils, date)),
  areValuesEqual: (utils, a, b) => (0, _internals.areDatesEqual)(utils, a[0], b[0]) && (0, _internals.areDatesEqual)(utils, a[1], b[1]),
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
  defaultErrorState: [null, null]
};
exports.rangeValueManager = rangeValueManager;
const rangeFieldValueManager = {
  updateReferenceValue: (utils, value, prevReferenceValue) => {
    const shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);
    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }
    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }
    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }
    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: (utils, [start, end], fallbackSections, isRTL, getSectionsFromDate) => {
    const separatedFallbackSections = fallbackSections == null ? {
      startDate: null,
      endDate: null
    } : (0, _dateFieldsUtils.splitDateRangeSections)(fallbackSections);
    const getSections = (newDate, fallbackDateSections, position) => {
      const shouldReUsePrevDateSections = !utils.isValid(newDate) && !!fallbackDateSections;
      if (shouldReUsePrevDateSections) {
        return fallbackDateSections;
      }
      const sections = getSectionsFromDate(newDate);
      return sections.map((section, sectionIndex) => {
        if (sectionIndex === sections.length - 1 && position === 'start') {
          return (0, _extends2.default)({}, section, {
            dateName: position,
            endSeparator: `${section.endSeparator}\u2069 – \u2066`
          });
        }
        return (0, _extends2.default)({}, section, {
          dateName: position
        });
      });
    };
    return (0, _internals.addPositionPropertiesToSections)([...getSections(start, separatedFallbackSections.startDate, 'start'), ...getSections(end, separatedFallbackSections.endDate, 'end')], isRTL);
  },
  getValueStrFromSections: (sections, isRTL) => {
    const dateRangeSections = (0, _dateFieldsUtils.splitDateRangeSections)(sections);
    return (0, _internals.createDateStrForInputFromSections)([...dateRangeSections.startDate, ...dateRangeSections.endDate], isRTL);
  },
  parseValueStr: (valueStr, referenceValue, parseDate) => {
    // TODO: Improve because it would not work if the date format has `–` as a separator.
    const [startStr, endStr] = valueStr.split('–');
    return [startStr, endStr].map((dateStr, index) => {
      if (dateStr == null) {
        return null;
      }
      return parseDate(dateStr.trim(), referenceValue[index]);
    });
  },
  getActiveDateManager: (utils, state, activeSection) => {
    const index = activeSection.dateName === 'start' ? 0 : 1;
    const updateDateInRange = (newDate, prevDateRange) => index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate];
    return {
      date: state.value[index],
      referenceDate: state.referenceValue[index],
      getSections: sections => {
        const dateRangeSections = (0, _dateFieldsUtils.splitDateRangeSections)(sections);
        if (index === 0) {
          return (0, _dateFieldsUtils.removeLastSeparator)(dateRangeSections.startDate);
        }
        return dateRangeSections.endDate;
      },
      getNewValuesFromNewActiveDate: newActiveDate => ({
        value: updateDateInRange(newActiveDate, state.value),
        referenceValue: newActiveDate == null || !utils.isValid(newActiveDate) ? state.referenceValue : updateDateInRange(newActiveDate, state.referenceValue)
      })
    };
  },
  hasError: error => error[0] != null || error[1] != null
};
exports.rangeFieldValueManager = rangeFieldValueManager;