import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridAggregationLookupSelector } from './gridAggregationSelectors';
import { GridFooterCell } from '../../../components/GridFooterCell';
import { GridAggregationHeader } from '../../../components/GridAggregationHeader';
import { jsx as _jsx } from "react/jsx-runtime";
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
          return /*#__PURE__*/_jsx(GridFooterCell, _extends({}, params));
        }
        return params.formattedValue;
      }
      const aggregationMeta = {
        hasCellUnit: aggregationRule.aggregationFunction.hasCellUnit ?? true,
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
const getWrappedFilterOperators = ({
  value: filterOperators,
  getCellAggregationResult
}) => filterOperators.map(operator => {
  return _extends({}, operator, {
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
export const wrapColumnWithAggregationValue = ({
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
    const aggregationResult = gridAggregationLookupSelector(apiRef)?.[groupId]?.[field];
    if (!aggregationResult || aggregationResult.position !== cellAggregationPosition) {
      return null;
    }
    return aggregationResult;
  };
  const aggregationWrappedProperties = {};
  const wrappedColumn = _extends({}, column, {
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
export const unwrapColumnFromAggregation = ({
  column
}) => {
  if (!column.aggregationWrappedProperties) {
    return column;
  }
  const originalProperties = Object.entries(column.aggregationWrappedProperties);
  if (originalProperties.length === 0) {
    return column;
  }
  const unwrappedColumn = _extends({}, column);
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