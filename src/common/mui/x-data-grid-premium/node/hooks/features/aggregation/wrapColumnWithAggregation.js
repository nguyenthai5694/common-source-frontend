"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapColumnWithAggregationValue = exports.unwrapColumnFromAggregation = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _gridAggregationSelectors = require("./gridAggregationSelectors");
var _GridFooterCell = require("../../../components/GridFooterCell");
var _GridAggregationHeader = require("../../../components/GridAggregationHeader");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const AGGREGATION_WRAPPABLE_PROPERTIES = ['valueGetter', 'valueFormatter', 'renderCell', 'renderHeader', 'filterOperators'];
const getAggregationValueWrappedValueGetter = ({
  value: valueGetter,
  getCellAggregationResult
}) => {
  const wrappedValueGetter = params => {
    const cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      return cellAggregationResult?.value ?? null;
    }
    if (valueGetter) {
      return valueGetter(params);
    }
    return params.row[params.field];
  };
  return wrappedValueGetter;
};
const getAggregationValueWrappedValueFormatter = ({
  value: valueFormatter,
  aggregationRule,
  getCellAggregationResult
}) => {
  // If neither the inline aggregation function nor the footer aggregation function have a custom value formatter,
  // Then we don't wrap the column value formatter
  if (!aggregationRule.aggregationFunction.valueFormatter) {
    return valueFormatter;
  }
  const wrappedValueFormatter = params => {
    if (params.id != null) {
      const cellAggregationResult = getCellAggregationResult(params.id, params.field);
      if (cellAggregationResult != null) {
        return aggregationRule.aggregationFunction.valueFormatter(params);
      }
    }
    if (valueFormatter) {
      return valueFormatter(params);
    }
    return params.value;
  };
  return wrappedValueFormatter;
};
const getAggregationValueWrappedRenderCell = ({
  value: renderCell,
  aggregationRule,
  getCellAggregationResult
}) => {
  const wrappedRenderCell = params => {
    const cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      if (!renderCell) {
        if (cellAggregationResult.position === 'footer') {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridFooterCell.GridFooterCell, (0, _extends2.default)({}, params));
        }
        return params.formattedValue;
      }
      const aggregationMeta = {
        hasCellUnit: aggregationRule.aggregationFunction.hasCellUnit ?? true,
        aggregationFunctionName: aggregationRule.aggregationFunctionName
      };
      return renderCell((0, _extends2.default)({}, params, {
        aggregation: aggregationMeta
      }));
    }
    if (!renderCell) {
      return params.formattedValue;
    }
    return renderCell(params);
  };
  return wrappedRenderCell;
};

/**
 * Skips the filtering for aggregated rows
 */
const getWrappedFilterOperators = ({
  value: filterOperators,
  getCellAggregationResult
}) => filterOperators.map(operator => {
  return (0, _extends2.default)({}, operator, {
    getApplyFilterFn: (filterItem, column) => {
      const originalFn = operator.getApplyFilterFn(filterItem, column);
      if (!originalFn) {
        return null;
      }
      return params => {
        if (getCellAggregationResult(params.id, params.field) != null) {
          return true;
        }
        return originalFn(params);
      };
    }
  });
});

/**
 * Add the aggregation method around the header name
 */
const getWrappedRenderHeader = ({
  value: renderHeader,
  aggregationRule
}) => {
  const wrappedRenderCell = params => {
    const aggregationMeta = {
      aggregationRule
    };
    if (!renderHeader) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridAggregationHeader.GridAggregationHeader, (0, _extends2.default)({}, params, {
        aggregation: aggregationMeta
      }));
    }
    return renderHeader((0, _extends2.default)({}, params, {
      aggregation: aggregationMeta
    }));
  };
  return wrappedRenderCell;
};

/**
 * Add a wrapper around each wrappable property of the column to customize the behavior of the aggregation cells.
 */
const wrapColumnWithAggregationValue = ({
  column,
  apiRef,
  aggregationRule
}) => {
  const getCellAggregationResult = (id, field) => {
    let cellAggregationPosition = null;
    const rowNode = apiRef.current.getRowNode(id);
    if (rowNode.type === 'group') {
      cellAggregationPosition = 'inline';
    } else if (id.toString().startsWith('auto-generated-group-footer-')) {
      cellAggregationPosition = 'footer';
    }
    if (cellAggregationPosition == null) {
      return null;
    }

    // TODO: Add custom root id
    const groupId = cellAggregationPosition === 'inline' ? id : rowNode.parent ?? '';
    const aggregationResult = (0, _gridAggregationSelectors.gridAggregationLookupSelector)(apiRef)?.[groupId]?.[field];
    if (!aggregationResult || aggregationResult.position !== cellAggregationPosition) {
      return null;
    }
    return aggregationResult;
  };
  const aggregationWrappedProperties = {};
  const wrappedColumn = (0, _extends2.default)({}, column, {
    aggregationWrappedProperties
  });
  const wrapColumnProperty = (property, wrapper) => {
    const originalValue = column[property];
    const wrappedProperty = wrapper({
      apiRef,
      value: originalValue,
      colDef: column,
      aggregationRule,
      getCellAggregationResult
    });
    if (wrappedProperty !== originalValue) {
      aggregationWrappedProperties[property] = {
        original: originalValue,
        wrapped: wrappedProperty
      };
      wrappedColumn[property] = wrappedProperty;
    }
  };
  wrapColumnProperty('valueGetter', getAggregationValueWrappedValueGetter);
  wrapColumnProperty('valueFormatter', getAggregationValueWrappedValueFormatter);
  wrapColumnProperty('renderCell', getAggregationValueWrappedRenderCell);
  wrapColumnProperty('renderHeader', getWrappedRenderHeader);
  wrapColumnProperty('filterOperators', getWrappedFilterOperators);
  if (Object.keys(aggregationWrappedProperties).length === 0) {
    return column;
  }
  return wrappedColumn;
};

/**
 * Remove the aggregation wrappers around the wrappable properties of the column.
 */
exports.wrapColumnWithAggregationValue = wrapColumnWithAggregationValue;
const unwrapColumnFromAggregation = ({
  column
}) => {
  if (!column.aggregationWrappedProperties) {
    return column;
  }
  const originalProperties = Object.entries(column.aggregationWrappedProperties);
  if (originalProperties.length === 0) {
    return column;
  }
  const unwrappedColumn = (0, _extends2.default)({}, column);
  originalProperties.forEach(([propertyName, {
    original,
    wrapped
  }]) => {
    // The value changed since we wrapped it
    if (wrapped !== column[propertyName]) {
      return;
    }
    unwrappedColumn[propertyName] = original;
  });
  return unwrappedColumn;
};
exports.unwrapColumnFromAggregation = unwrapColumnFromAggregation;