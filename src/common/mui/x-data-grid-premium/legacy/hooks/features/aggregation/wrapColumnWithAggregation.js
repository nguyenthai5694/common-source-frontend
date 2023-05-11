import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridAggregationLookupSelector } from './gridAggregationSelectors';
import { GridFooterCell } from '../../../components/GridFooterCell';
import { GridAggregationHeader } from '../../../components/GridAggregationHeader';
import { jsx as _jsx } from "react/jsx-runtime";
var AGGREGATION_WRAPPABLE_PROPERTIES = ['valueGetter', 'valueFormatter', 'renderCell', 'renderHeader', 'filterOperators'];
var getAggregationValueWrappedValueGetter = function getAggregationValueWrappedValueGetter(_ref) {
  var valueGetter = _ref.value,
    getCellAggregationResult = _ref.getCellAggregationResult;
  var wrappedValueGetter = function wrappedValueGetter(params) {
    var cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      var _cellAggregationResul;
      return (_cellAggregationResul = cellAggregationResult == null ? void 0 : cellAggregationResult.value) != null ? _cellAggregationResul : null;
    }
    if (valueGetter) {
      return valueGetter(params);
    }
    return params.row[params.field];
  };
  return wrappedValueGetter;
};
var getAggregationValueWrappedValueFormatter = function getAggregationValueWrappedValueFormatter(_ref2) {
  var valueFormatter = _ref2.value,
    aggregationRule = _ref2.aggregationRule,
    getCellAggregationResult = _ref2.getCellAggregationResult;
  // If neither the inline aggregation function nor the footer aggregation function have a custom value formatter,
  // Then we don't wrap the column value formatter
  if (!aggregationRule.aggregationFunction.valueFormatter) {
    return valueFormatter;
  }
  var wrappedValueFormatter = function wrappedValueFormatter(params) {
    if (params.id != null) {
      var cellAggregationResult = getCellAggregationResult(params.id, params.field);
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
var getAggregationValueWrappedRenderCell = function getAggregationValueWrappedRenderCell(_ref3) {
  var renderCell = _ref3.value,
    aggregationRule = _ref3.aggregationRule,
    getCellAggregationResult = _ref3.getCellAggregationResult;
  var wrappedRenderCell = function wrappedRenderCell(params) {
    var cellAggregationResult = getCellAggregationResult(params.id, params.field);
    if (cellAggregationResult != null) {
      var _aggregationFunction$;
      if (!renderCell) {
        if (cellAggregationResult.position === 'footer') {
          return /*#__PURE__*/_jsx(GridFooterCell, _extends({}, params));
        }
        return params.formattedValue;
      }
      var aggregationMeta = {
        hasCellUnit: (_aggregationFunction$ = aggregationRule.aggregationFunction.hasCellUnit) != null ? _aggregationFunction$ : true,
        aggregationFunctionName: aggregationRule.aggregationFunctionName
      };
      return renderCell(_extends({}, params, {
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
var getWrappedFilterOperators = function getWrappedFilterOperators(_ref4) {
  var filterOperators = _ref4.value,
    getCellAggregationResult = _ref4.getCellAggregationResult;
  return filterOperators.map(function (operator) {
    return _extends({}, operator, {
      getApplyFilterFn: function getApplyFilterFn(filterItem, column) {
        var originalFn = operator.getApplyFilterFn(filterItem, column);
        if (!originalFn) {
          return null;
        }
        return function (params) {
          if (getCellAggregationResult(params.id, params.field) != null) {
            return true;
          }
          return originalFn(params);
        };
      }
    });
  });
};

/**
 * Add the aggregation method around the header name
 */
var getWrappedRenderHeader = function getWrappedRenderHeader(_ref5) {
  var renderHeader = _ref5.value,
    aggregationRule = _ref5.aggregationRule;
  var wrappedRenderCell = function wrappedRenderCell(params) {
    var aggregationMeta = {
      aggregationRule: aggregationRule
    };
    if (!renderHeader) {
      return /*#__PURE__*/_jsx(GridAggregationHeader, _extends({}, params, {
        aggregation: aggregationMeta
      }));
    }
    return renderHeader(_extends({}, params, {
      aggregation: aggregationMeta
    }));
  };
  return wrappedRenderCell;
};

/**
 * Add a wrapper around each wrappable property of the column to customize the behavior of the aggregation cells.
 */
export var wrapColumnWithAggregationValue = function wrapColumnWithAggregationValue(_ref6) {
  var column = _ref6.column,
    apiRef = _ref6.apiRef,
    aggregationRule = _ref6.aggregationRule;
  var getCellAggregationResult = function getCellAggregationResult(id, field) {
    var _rowNode$parent, _gridAggregationLooku, _gridAggregationLooku2;
    var cellAggregationPosition = null;
    var rowNode = apiRef.current.getRowNode(id);
    if (rowNode.type === 'group') {
      cellAggregationPosition = 'inline';
    } else if (id.toString().startsWith('auto-generated-group-footer-')) {
      cellAggregationPosition = 'footer';
    }
    if (cellAggregationPosition == null) {
      return null;
    }

    // TODO: Add custom root id
    var groupId = cellAggregationPosition === 'inline' ? id : (_rowNode$parent = rowNode.parent) != null ? _rowNode$parent : '';
    var aggregationResult = (_gridAggregationLooku = gridAggregationLookupSelector(apiRef)) == null ? void 0 : (_gridAggregationLooku2 = _gridAggregationLooku[groupId]) == null ? void 0 : _gridAggregationLooku2[field];
    if (!aggregationResult || aggregationResult.position !== cellAggregationPosition) {
      return null;
    }
    return aggregationResult;
  };
  var aggregationWrappedProperties = {};
  var wrappedColumn = _extends({}, column, {
    aggregationWrappedProperties: aggregationWrappedProperties
  });
  var wrapColumnProperty = function wrapColumnProperty(property, wrapper) {
    var originalValue = column[property];
    var wrappedProperty = wrapper({
      apiRef: apiRef,
      value: originalValue,
      colDef: column,
      aggregationRule: aggregationRule,
      getCellAggregationResult: getCellAggregationResult
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
export var unwrapColumnFromAggregation = function unwrapColumnFromAggregation(_ref7) {
  var column = _ref7.column;
  if (!column.aggregationWrappedProperties) {
    return column;
  }
  var originalProperties = Object.entries(column.aggregationWrappedProperties);
  if (originalProperties.length === 0) {
    return column;
  }
  var unwrappedColumn = _extends({}, column);
  originalProperties.forEach(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      propertyName = _ref9[0],
      _ref9$ = _ref9[1],
      original = _ref9$.original,
      wrapped = _ref9$.wrapped;
    // The value changed since we wrapped it
    if (wrapped !== column[propertyName]) {
      return;
    }
    unwrappedColumn[propertyName] = original;
  });
  return unwrappedColumn;
};