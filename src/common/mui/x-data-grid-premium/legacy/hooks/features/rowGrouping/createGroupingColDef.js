import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["leafField", "mainGroupingCriteria", "hideDescendantCount"],
  _excluded2 = ["leafField", "mainGroupingCriteria", "hideDescendantCount"];
import * as React from 'react';
import { GRID_STRING_COL_DEF } from '@mui/x-data-grid-pro';
import { isSingleSelectColDef } from '@mui/x-data-grid-pro/internals';
import { GridGroupingColumnFooterCell } from '../../../components/GridGroupingColumnFooterCell';
import { GridGroupingCriteriaCell } from '../../../components/GridGroupingCriteriaCell';
import { GridGroupingColumnLeafCell } from '../../../components/GridGroupingColumnLeafCell';
import { getRowGroupingFieldFromGroupingCriteria, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD } from './gridRowGroupingUtils';
import { gridRowGroupingSanitizedModelSelector } from './gridRowGroupingSelector';
import { jsx as _jsx } from "react/jsx-runtime";
var GROUPING_COL_DEF_DEFAULT_PROPERTIES = _extends({}, GRID_STRING_COL_DEF, {
  disableReorder: true
});
var GROUPING_COL_DEF_FORCED_PROPERTIES = {
  type: 'rowGroupByColumnsGroup',
  editable: false,
  groupable: false
};

/**
 * When sorting two cells with different grouping criteria, we consider that the cell with the grouping criteria coming first in the model should be displayed below.
 * This can occur when some rows don't have all the fields. In which case we want the rows with the missing field to be displayed above.
 * TODO: Make this index comparator depth invariant, the logic should not be inverted when sorting in the "desc" direction (but the current return format of `sortComparator` does not support this behavior).
 */
var groupingFieldIndexComparator = function groupingFieldIndexComparator(v1, v2, cellParams1, cellParams2) {
  var _groupingField, _groupingField2;
  var model = gridRowGroupingSanitizedModelSelector(cellParams1.api.state, cellParams1.api.instanceId);
  var groupingField1 = (_groupingField = cellParams1.rowNode.groupingField) != null ? _groupingField : null;
  var groupingField2 = (_groupingField2 = cellParams2.rowNode.groupingField) != null ? _groupingField2 : null;
  if (groupingField1 === groupingField2) {
    return 0;
  }
  if (groupingField1 == null) {
    return -1;
  }
  if (groupingField2 == null) {
    return 1;
  }
  if (model.indexOf(groupingField1) < model.indexOf(groupingField2)) {
    return -1;
  }
  return 1;
};
var getLeafProperties = function getLeafProperties(leafColDef) {
  var _leafColDef$headerNam, _leafColDef$filterOpe;
  return {
    headerName: (_leafColDef$headerNam = leafColDef.headerName) != null ? _leafColDef$headerNam : leafColDef.field,
    sortable: leafColDef.sortable,
    filterable: leafColDef.filterable,
    valueOptions: isSingleSelectColDef(leafColDef) ? leafColDef.valueOptions : undefined,
    filterOperators: (_leafColDef$filterOpe = leafColDef.filterOperators) == null ? void 0 : _leafColDef$filterOpe.map(function (operator) {
      return _extends({}, operator, {
        getApplyFilterFn: function getApplyFilterFn(filterItem, column) {
          var originalFn = operator.getApplyFilterFn(filterItem, column);
          if (!originalFn) {
            return null;
          }
          return function (params) {
            return originalFn(params);
          };
        }
      });
    }),
    sortComparator: function sortComparator(v1, v2, cellParams1, cellParams2) {
      // We only want to sort the leaves
      if (cellParams1.rowNode.type === 'leaf' && cellParams2.rowNode.type === 'leaf') {
        return leafColDef.sortComparator(v1, v2, cellParams1, cellParams2);
      }
      return groupingFieldIndexComparator(v1, v2, cellParams1, cellParams2);
    }
  };
};
var getGroupingCriteriaProperties = function getGroupingCriteriaProperties(groupedByColDef, applyHeaderName) {
  var _groupedByColDef$filt;
  var properties = {
    sortable: groupedByColDef.sortable,
    filterable: groupedByColDef.filterable,
    valueOptions: isSingleSelectColDef(groupedByColDef) ? groupedByColDef.valueOptions : undefined,
    sortComparator: function sortComparator(v1, v2, cellParams1, cellParams2) {
      // We only want to sort the groups of the current grouping criteria
      if (cellParams1.rowNode.type === 'group' && cellParams1.rowNode.groupingField === groupedByColDef.field && cellParams2.rowNode.type === 'group' && cellParams2.rowNode.groupingField === groupedByColDef.field) {
        return groupedByColDef.sortComparator(v1, v2, cellParams1, cellParams2);
      }
      return groupingFieldIndexComparator(v1, v2, cellParams1, cellParams2);
    },
    filterOperators: (_groupedByColDef$filt = groupedByColDef.filterOperators) == null ? void 0 : _groupedByColDef$filt.map(function (operator) {
      return _extends({}, operator, {
        getApplyFilterFn: function getApplyFilterFn(filterItem, column) {
          var originalFn = operator.getApplyFilterFn(filterItem, column);
          if (!originalFn) {
            return null;
          }
          return function (params) {
            return originalFn(params);
          };
        }
      });
    })
  };
  if (applyHeaderName) {
    var _groupedByColDef$head;
    properties.headerName = (_groupedByColDef$head = groupedByColDef.headerName) != null ? _groupedByColDef$head : groupedByColDef.field;
  }
  return properties;
};
/**
 * Creates the `GridColDef` for a grouping column that only takes care of a single grouping criteria
 */
export var createGroupingColDefForOneGroupingCriteria = function createGroupingColDefForOneGroupingCriteria(_ref) {
  var _groupedByColDef$widt, _leafColDef$width;
  var columnsLookup = _ref.columnsLookup,
    groupedByColDef = _ref.groupedByColDef,
    groupingCriteria = _ref.groupingCriteria,
    colDefOverride = _ref.colDefOverride;
  var _ref2 = colDefOverride != null ? colDefOverride : {},
    leafField = _ref2.leafField,
    mainGroupingCriteria = _ref2.mainGroupingCriteria,
    hideDescendantCount = _ref2.hideDescendantCount,
    colDefOverrideProperties = _objectWithoutProperties(_ref2, _excluded);
  var leafColDef = leafField ? columnsLookup[leafField] : null;

  // The properties that do not depend on the presence of a `leafColDef` and that can be overridden by `colDefOverride`
  var commonProperties = {
    width: Math.max(((_groupedByColDef$widt = groupedByColDef.width) != null ? _groupedByColDef$widt : GRID_STRING_COL_DEF.width) + 40, (_leafColDef$width = leafColDef == null ? void 0 : leafColDef.width) != null ? _leafColDef$width : 0),
    renderCell: function renderCell(params) {
      // Render footer
      if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
        return /*#__PURE__*/_jsx(GridGroupingColumnFooterCell, _extends({}, params));
      }

      // Render leaves
      if (params.rowNode.type === 'leaf') {
        if (leafColDef) {
          var leafParams = _extends({}, params.api.getCellParams(params.id, leafField), {
            api: params.api,
            hasFocus: params.hasFocus
          });
          if (leafColDef.renderCell) {
            return leafColDef.renderCell(leafParams);
          }
          return /*#__PURE__*/_jsx(GridGroupingColumnLeafCell, _extends({}, leafParams));
        }
        return '';
      }

      // Render current grouping criteria groups
      if (params.rowNode.groupingField === groupingCriteria) {
        return /*#__PURE__*/_jsx(GridGroupingCriteriaCell, _extends({}, params, {
          hideDescendantCount: hideDescendantCount
        }));
      }
      return '';
    },
    valueGetter: function valueGetter(params) {
      if (!params.rowNode || params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
        return undefined;
      }
      if (params.rowNode.type === 'leaf') {
        if (leafColDef) {
          return params.api.getCellValue(params.id, leafField);
        }
        return undefined;
      }
      if (params.rowNode.groupingField === groupingCriteria) {
        return params.rowNode.groupingKey;
      }
      return undefined;
    }
  };

  // If we have a `mainGroupingCriteria` defined and matching the `groupingCriteria`
  // Then we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `groupedByColDef`.
  // It can be useful to define a `leafField` for leaves rendering but still use the grouping criteria for the sorting / filtering
  //
  // If we have a `leafField` defined and matching an existing column
  // Then we apply the sorting / filtering on the leaves based on the properties of `leavesColDef`
  //
  // By default, we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `groupedColDef`.
  var sourceProperties;
  if (mainGroupingCriteria && mainGroupingCriteria === groupingCriteria) {
    sourceProperties = getGroupingCriteriaProperties(groupedByColDef, true);
  } else if (leafColDef) {
    sourceProperties = getLeafProperties(leafColDef);
  } else {
    sourceProperties = getGroupingCriteriaProperties(groupedByColDef, true);
  }

  // The properties that can't be overridden with `colDefOverride`
  var forcedProperties = _extends({
    field: getRowGroupingFieldFromGroupingCriteria(groupingCriteria)
  }, GROUPING_COL_DEF_FORCED_PROPERTIES);
  return _extends({}, GROUPING_COL_DEF_DEFAULT_PROPERTIES, commonProperties, sourceProperties, colDefOverrideProperties, forcedProperties);
};
/**
 * Creates the `GridColDef` for a grouping column that takes care of all the grouping criteria
 */
export var createGroupingColDefForAllGroupingCriteria = function createGroupingColDefForAllGroupingCriteria(_ref3) {
  var _leafColDef$width2;
  var apiRef = _ref3.apiRef,
    columnsLookup = _ref3.columnsLookup,
    rowGroupingModel = _ref3.rowGroupingModel,
    colDefOverride = _ref3.colDefOverride;
  var _ref4 = colDefOverride != null ? colDefOverride : {},
    leafField = _ref4.leafField,
    mainGroupingCriteria = _ref4.mainGroupingCriteria,
    hideDescendantCount = _ref4.hideDescendantCount,
    colDefOverrideProperties = _objectWithoutProperties(_ref4, _excluded2);
  var leafColDef = leafField ? columnsLookup[leafField] : null;

  // The properties that do not depend on the presence of a `leafColDef` and that can be overridden by `colDefOverride`
  var commonProperties = {
    headerName: apiRef.current.getLocaleText('groupingColumnHeaderName'),
    width: Math.max.apply(Math, _toConsumableArray(rowGroupingModel.map(function (field) {
      var _columnsLookup$field$;
      return ((_columnsLookup$field$ = columnsLookup[field].width) != null ? _columnsLookup$field$ : GRID_STRING_COL_DEF.width) + 40;
    })).concat([(_leafColDef$width2 = leafColDef == null ? void 0 : leafColDef.width) != null ? _leafColDef$width2 : 0])),
    renderCell: function renderCell(params) {
      // Render footer
      if (params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
        return /*#__PURE__*/_jsx(GridGroupingColumnFooterCell, _extends({}, params));
      }

      // Render the leaves
      if (params.rowNode.type === 'leaf') {
        if (leafColDef) {
          var leafParams = _extends({}, params.api.getCellParams(params.id, leafField), {
            api: params.api,
            hasFocus: params.hasFocus
          });
          if (leafColDef.renderCell) {
            return leafColDef.renderCell(leafParams);
          }
          return /*#__PURE__*/_jsx(GridGroupingColumnLeafCell, _extends({}, leafParams));
        }
        return '';
      }

      // Render the groups
      return /*#__PURE__*/_jsx(GridGroupingCriteriaCell, _extends({}, params, {
        hideDescendantCount: hideDescendantCount
      }));
    },
    valueGetter: function valueGetter(params) {
      if (!params.rowNode || params.rowNode.type === 'footer' || params.rowNode.type === 'pinnedRow') {
        return undefined;
      }
      if (params.rowNode.type === 'leaf') {
        if (leafColDef) {
          return params.api.getCellValue(params.id, leafField);
        }
        return undefined;
      }
      return params.rowNode.groupingKey;
    }
  };

  // If we have a `mainGroupingCriteria` defined and matching one of the `orderedGroupedByFields`
  // Then we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `columnsLookup[mainGroupingCriteria]`.
  // It can be useful to use another grouping criteria than the top level one for the sorting / filtering
  //
  // If we have a `leafField` defined and matching an existing column
  // Then we apply the sorting / filtering on the leaves based on the properties of `leavesColDef`
  //
  // By default, we apply the sorting / filtering on the groups of the top level grouping criteria based on the properties of `columnsLookup[orderedGroupedByFields[0]]`.
  var sourceProperties;
  if (mainGroupingCriteria && rowGroupingModel.includes(mainGroupingCriteria)) {
    sourceProperties = getGroupingCriteriaProperties(columnsLookup[mainGroupingCriteria], true);
  } else if (leafColDef) {
    sourceProperties = getLeafProperties(leafColDef);
  } else {
    sourceProperties = getGroupingCriteriaProperties(columnsLookup[rowGroupingModel[0]], rowGroupingModel.length === 1);
  }

  // The properties that can't be overridden with `colDefOverride`
  var forcedProperties = _extends({
    field: GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD
  }, GROUPING_COL_DEF_FORCED_PROPERTIES);
  return _extends({}, GROUPING_COL_DEF_DEFAULT_PROPERTIES, commonProperties, sourceProperties, colDefOverrideProperties, forcedProperties);
};