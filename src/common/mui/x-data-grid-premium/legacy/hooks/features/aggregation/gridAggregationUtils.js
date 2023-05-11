import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import { unstable_capitalize as capitalize } from '@mui/utils';
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid-pro';
import { addPinnedRow, isDeepEqual, insertNodeInTree, removeNodeFromTree } from '@mui/x-data-grid-pro/internals';
export var GRID_AGGREGATION_ROOT_FOOTER_ROW_ID = 'auto-generated-group-footer-root';
export var getAggregationFooterRowIdFromGroupId = function getAggregationFooterRowIdFromGroupId(groupId) {
  if (groupId == null) {
    return GRID_AGGREGATION_ROOT_FOOTER_ROW_ID;
  }
  return "auto-generated-group-footer-".concat(groupId);
};
export var canColumnHaveAggregationFunction = function canColumnHaveAggregationFunction(_ref) {
  var colDef = _ref.colDef,
    aggregationFunctionName = _ref.aggregationFunctionName,
    aggregationFunction = _ref.aggregationFunction;
  if (!colDef || !colDef.aggregable) {
    return false;
  }
  if (!aggregationFunction) {
    return false;
  }
  if (colDef.availableAggregationFunctions != null) {
    return colDef.availableAggregationFunctions.includes(aggregationFunctionName);
  }
  if (!aggregationFunction.columnTypes) {
    return true;
  }
  return aggregationFunction.columnTypes.includes(colDef.type);
};
export var getAvailableAggregationFunctions = function getAvailableAggregationFunctions(_ref2) {
  var aggregationFunctions = _ref2.aggregationFunctions,
    colDef = _ref2.colDef;
  return Object.keys(aggregationFunctions).filter(function (aggregationFunctionName) {
    return canColumnHaveAggregationFunction({
      colDef: colDef,
      aggregationFunctionName: aggregationFunctionName,
      aggregationFunction: aggregationFunctions[aggregationFunctionName]
    });
  });
};
export var mergeStateWithAggregationModel = function mergeStateWithAggregationModel(aggregationModel) {
  return function (state) {
    return _extends({}, state, {
      aggregation: _extends({}, state.aggregation, {
        model: aggregationModel
      })
    });
  };
};
export var getAggregationRules = function getAggregationRules(_ref3) {
  var columnsLookup = _ref3.columnsLookup,
    aggregationModel = _ref3.aggregationModel,
    aggregationFunctions = _ref3.aggregationFunctions;
  var aggregationRules = {};
  Object.entries(aggregationModel).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      field = _ref5[0],
      columnItem = _ref5[1];
    if (columnsLookup[field] && canColumnHaveAggregationFunction({
      colDef: columnsLookup[field],
      aggregationFunctionName: columnItem,
      aggregationFunction: aggregationFunctions[columnItem]
    })) {
      aggregationRules[field] = {
        aggregationFunctionName: columnItem,
        aggregationFunction: aggregationFunctions[columnItem]
      };
    }
  });
  return aggregationRules;
};
/**
 * Add a footer for each group that has at least one column with an aggregated value.
 */
export var addFooterRows = function addFooterRows(_ref6) {
  var groupingParams = _ref6.groupingParams,
    apiRef = _ref6.apiRef,
    getAggregationPosition = _ref6.getAggregationPosition,
    hasAggregationRule = _ref6.hasAggregationRule;
  var newGroupingParams = _extends({}, groupingParams, {
    tree: _extends({}, groupingParams.tree),
    treeDepths: _extends({}, groupingParams.treeDepths)
  });
  var updateChildGroupFooter = function updateChildGroupFooter(groupNode) {
    var shouldHaveFooter = hasAggregationRule && getAggregationPosition(groupNode) === 'footer';
    if (shouldHaveFooter) {
      var footerId = getAggregationFooterRowIdFromGroupId(groupNode.id);
      if (groupNode.footerId !== footerId) {
        if (groupNode.footerId != null) {
          removeNodeFromTree({
            node: newGroupingParams.tree[groupNode.footerId],
            tree: newGroupingParams.tree,
            treeDepths: newGroupingParams.treeDepths
          });
        }
        var footerNode = {
          id: footerId,
          parent: groupNode.id,
          depth: groupNode ? groupNode.depth + 1 : 0,
          type: 'footer'
        };
        insertNodeInTree({
          node: footerNode,
          tree: newGroupingParams.tree,
          treeDepths: newGroupingParams.treeDepths
        });
      }
    } else if (groupNode.footerId != null) {
      removeNodeFromTree({
        node: newGroupingParams.tree[groupNode.footerId],
        tree: newGroupingParams.tree,
        treeDepths: newGroupingParams.treeDepths
      });
      newGroupingParams.tree[groupNode.id] = _extends({}, newGroupingParams.tree[groupNode.id], {
        footerId: null
      });
    }
  };
  var updateRootGroupFooter = function updateRootGroupFooter(groupNode) {
    var shouldHaveFooter = hasAggregationRule && getAggregationPosition(groupNode) === 'footer';
    if (shouldHaveFooter) {
      newGroupingParams = addPinnedRow({
        groupingParams: newGroupingParams,
        rowModel: undefined,
        rowId: getAggregationFooterRowIdFromGroupId(null),
        position: 'bottom',
        apiRef: apiRef,
        isAutoGenerated: true
      });
    }
  };
  var updateGroupFooter = function updateGroupFooter(groupNode) {
    if (groupNode.id === GRID_ROOT_GROUP_ID) {
      updateRootGroupFooter(groupNode);
    } else {
      updateChildGroupFooter(groupNode);
    }
    groupNode.children.forEach(function (childId) {
      var childNode = newGroupingParams.tree[childId];
      if (childNode.type === 'group') {
        updateGroupFooter(childNode);
      }
    });
  };
  updateGroupFooter(newGroupingParams.tree[GRID_ROOT_GROUP_ID]);
  return newGroupingParams;
};

/**
 * Compares two sets of aggregation rules to determine if they are equal or not.
 */
export var areAggregationRulesEqual = function areAggregationRulesEqual(previousValue, newValue) {
  var previousFields = Object.keys(previousValue != null ? previousValue : {});
  var newFields = Object.keys(newValue);
  if (!isDeepEqual(previousFields, newFields)) {
    return false;
  }
  return newFields.every(function (field) {
    var previousRule = previousValue == null ? void 0 : previousValue[field];
    var newRule = newValue[field];
    if ((previousRule == null ? void 0 : previousRule.aggregationFunction) !== (newRule == null ? void 0 : newRule.aggregationFunction)) {
      return false;
    }
    if ((previousRule == null ? void 0 : previousRule.aggregationFunctionName) !== (newRule == null ? void 0 : newRule.aggregationFunctionName)) {
      return false;
    }
    return true;
  });
};
export var getAggregationFunctionLabel = function getAggregationFunctionLabel(_ref7) {
  var apiRef = _ref7.apiRef,
    aggregationRule = _ref7.aggregationRule;
  if (aggregationRule.aggregationFunction.label != null) {
    return aggregationRule.aggregationFunction.label;
  }
  try {
    return apiRef.current.getLocaleText("aggregationFunctionLabel".concat(capitalize(aggregationRule.aggregationFunctionName)));
  } catch (e) {
    return aggregationRule.aggregationFunctionName;
  }
};